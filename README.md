---

# 🧠 GeminiAnywhereAPI

A WebSocket-powered automation system that uses Puppeteer to interact with ChatGPT in real-time. This project allows external devices or apps to send prompts to ChatGPT and receive responses via a persistent browser session.

---

## 🚀 Features

- WebSocket server for prompt exchange
- Puppeteer automation with stealth mode
- Multi-tab conversation management using `convoId`
- Persistent login using Chrome user profiles
- Automatic tab switching and response streaming detection
- Headless-compatible with stealth plugin
- Supports `"end conversation"` to close tabs and clean up

---

## 📦 Dependencies

Install the required packages:

```bash
npm install puppeteer
```

---

## 🖥️ Requirements

- Node.js v18+
- A working installation of Chrome or Chromium
- A Chrome user profile **logged into OpenAI ChatGPT**

---

## 🧭 Setup Instructions

### 1. **Download Chrome**

Use the official Chrome installer:

👉 [Download Chrome](https://www.google.com/chrome/)[1](https://www.google.com/chrome/)

---

### 2. **Create a Chrome User Profile**

Launch from a blank chrome profile:
  Windows: `Start-Process "C:\Users\{username}\Documents\chrome\win64-141.0.7390.54\chrome-win64\chrome.exe" -ArgumentList "--user-data-                                                   dir=`"C:\Users\{username}\AppData\Local\Google\Chrome\User Data\Profile 1`""`
  Mac: `open -a "Google Chrome" --args --profile-directory="Profile 1"`
  
  Linux: `google-chrome --profile-directory="Profile 1"`

---

### 3. **Log Into ChatGPT**

Make sure you're logged into [ChatGPT](https://chatgpt.com/auth/login) using the same Chrome profile.

> ⚠️ You must stay logged in for Puppeteer in order for OpenAI to not flag you as a bot. This is handled by launching Chrome with your user profile directory.

---

### 4. **Configure `bot.js`**

Set your Chrome executable path and user profile directory:

```js
const chromeExecutablePath = 'C:\\Path\\To\\Chrome\\chrome.exe';
const userDataDir = 'C:\\Path\\To\\Chrome\\User Data\\Profile 1';
```

---

### 5. **Run the WebSocket Server**

Start the server:

```bash
node ws.js
```

Your client can now send prompts like:

```json
{
  "prompt": "Tell me a joke.",
  "convoId": "convo1"
}
```

And receive:

```json
{
  "convoId": "convo1",
  "prompt": "Tell me a joke.",
  "response": "Why don't scientists trust atoms? Because they make up everything!"
}
```

---

## 🧹 Ending a Conversation

To close a tab and remove its session:

```json
{
  "prompt": "end conversation",
  "convoId": "convo1"
}
```

---

## 🧠 How It Works

- Each `convoId` is mapped to a Chrome tab.
- The first prompt opens a new tab and stores the unique ChatGPT URL.
- Subsequent prompts reuse the tab and switch to it automatically.
- Responses are streamed and captured once complete.
- Tabs are closed when `"end conversation"` is received.

---

---

## 📬 Contact & Contributions

Feel free to open issues or pull requests to improve functionality, add features, or fix bugs.

---
