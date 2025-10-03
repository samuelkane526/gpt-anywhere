import puppeteer from 'puppeteer';

const chromeExecutablePath = "PATH TO CHROME EXECUTABLE"; //Potential Example: 'C:\\Users\\{username}\\Documents\\chrome\\win64-141.0.7390.54\\chrome-win64\\chrome.exe';

const convoTabs = new Map();
const promptQueue = [];
let browser;
let isProcessing = false;

async function initBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      executablePath: chromeExecutablePath,
      headless: false,
      userDataDir: "PATH TO CHROME PROFILE ", //Potential Example: 'C:\\Users\\{username}\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1',
      defaultViewport: null,
    });
  }
}

async function sendPromptToPage(page, promptText) {
  const prevResponse = await page.evaluate(() => {
    const msgs = document.querySelectorAll('.min-h-8');
    return msgs.length > 1 ? msgs[msgs.length - 2].textContent : '';
  });

  await page.evaluate(text => {
    const textarea = document.querySelector('#prompt-textarea');
    textarea.textContent = text;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }, promptText);

  await page.waitForSelector('#composer-submit-button', { visible: true });
  await page.click('#composer-submit-button');

  await page.waitForFunction(prev => {
    const msgs = document.querySelectorAll('.min-h-8');
    const current = msgs.length > 1 ? msgs[msgs.length - 2].textContent : '';
    return current !== prev;
  }, {}, prevResponse);

  await page.waitForFunction(() => {
    return !document.querySelector('#composer-submit-button[aria-label="Stop streaming"]');
  }, { timeout: 60000 });

  const finalResponse = await page.evaluate(() => {
    const msgs = document.querySelectorAll('.min-h-8');
    return msgs.length > 1 ? msgs[msgs.length - 2].textContent : 'No response found.';
  });

  return finalResponse;
}

async function processQueue() {
  if (isProcessing || promptQueue.length === 0) return;
  isProcessing = true;

  const { promptText, convoId, resolve } = promptQueue.shift();
  await initBrowser();

  let page;
  if (!convoTabs.has(convoId)) {
    page = await browser.newPage();
    await page.goto('https://chatgpt.com/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#prompt-textarea');
    convoTabs.set(convoId, { page, url: null });
  }

  const convo = convoTabs.get(convoId);
  page = convo.page;

  if (promptText.toLowerCase() === 'end conversation') {
    await page.close();
    convoTabs.delete(convoId);
    resolve('Conversation ended.');
    isProcessing = false;
    processQueue();
    return;
  }


  await page.bringToFront();

  const currentUrl = page.url();
  if (convo.url && currentUrl !== convo.url) {
    await page.goto(convo.url, { waitUntil: 'networkidle2' });
  }


  const response = await sendPromptToPage(page, promptText);

  resolve(response);
  isProcessing = false;
  processQueue();
}


export function sendPrompt(promptText, convoId) {
  return new Promise(resolve => {
    promptQueue.push({ promptText, convoId, resolve });
    processQueue();
  });
}