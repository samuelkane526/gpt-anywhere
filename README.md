Here’s a **comprehensive GitHub-style README** for your project, including setup instructions, dependencies, and links to resources like Chrome downloads and profile setup guides.

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
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth ws
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

Or get a portable version from TechSpot:

👉 [TechSpot Chrome Portable](https://www.techspot.com/downloads/4718-google-chrome.html)[2](https://www.techspot.com/downloads/4718-google-chrome.html)

---

### 2. **Create a Chrome User Profile**

Follow this guide to create a new Chrome profile:

📺 [YouTube Tutorial – Create and Manage Chrome Profiles](https://www.youtube.com/watch?v=rmP6XQCwi5E)[3](https://www.youtube.com/watch?v=rmP6XQCwi5E)  
📘 Google Help – Manage Chrome Profiles[4](https://support.google.com/chrome/answer/2364824?hl=en&co=GENIE.Platform%3DDesktop)

Steps:
- Open Chrome
- Click your profile icon (top-right)
- Select **Add**
- Name the profile and choose an icon
- Sign in with your Google account

---

### 3. **Log Into ChatGPT**

Make sure you're logged into [ChatGPT](https://chatgpt.com/auth/login) using the same Chrome profile.

📺 [ChatGPT Login Tutorial](https://www.youtube.com/watch?v=WwckAwFVuko)[5](https://www.youtube.com/watch?v=WwckAwFVuko)

> ⚠️ You must stay logged in for Puppeteer to access ChatGPT. This is handled by launching Chrome with your user profile directory.

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

## 🛠️ Troubleshooting

- **Headless mode issues?** Use `headless: 'new'` and stealth plugin.
- **Selector not found?** Ensure you're logged into ChatGPT and using the correct profile.
- **Auto-login problems?** Clear cookies or use incognito mode to reset login behavior.

---

## 📂 File Structure

```
geminianywhereapi/
├── bot.js          # Puppeteer logic
├── ws.js           # WebSocket server
├── package.json
└── README.md       # This file
```

---

## 📬 Contact & Contributions

Feel free to open issues or pull requests to improve functionality, add features, or fix bugs.

---

Would you like me to generate a `package.json` and `.gitignore` for this project too?
