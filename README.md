# 🏝️ ImboredCY - Cyprus AI Chat with OpenAI

## 🎯 **Manual GitHub Upload Instructions**

### 📁 **File Structure to Upload:**
```
Your GitHub Repository/
├── server.js              # Backend with OpenAI integration
├── package.json           # Node.js dependencies  
├── .gitignore             # Git ignore rules
└── public/                # Frontend files
    ├── index.html         # Beautiful chat interface
    ├── style.css          # Blue space design
    └── app.js             # Chat functionality
```

### 🚀 **GitHub Web Upload Steps:**

1. **Create Repository:**
   - Go to github.com
   - Click "New repository"
   - Name: `imbored-cyprus-openai`
   - Make it **Public**
   - Don't initialize with README

2. **Upload Files:**
   - Click "uploading an existing file"
   - **Drag and drop ALL files** from this ZIP
   - **IMPORTANT:** Maintain the folder structure!
   - `public/` folder must contain the 3 frontend files

3. **Commit:**
   - Commit message: "ImboredCY - Cyprus AI Chat"
   - Click "Commit new files"

### 🌐 **Render.com Deployment:**

1. **Sign up:** render.com (free account)

2. **New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configuration:**
   ```
   Name: imbored-cyprus-ai
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables:**
   Add these in "Advanced" section:
   ```
   OPENAI_API_KEY = sk-proj-9FvnHBPx...
   BACKUP_KEY = sk-proj-r21IduWv...
   ```

5. **Deploy!**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Get your live URL!

### ✨ **Features:**
🤖 Real OpenAI GPT-4 integration
🎯 Button-based chat (no typing)
🌌 Beautiful blue space design with stars
💬 Message bubbles and conversation flow
📱 Mobile responsive
🔒 Secure API key handling
🎓 YOU control AI training in server.js

### 🎓 **AI Training:**
Edit `server.js` → `CYPRUS_SYSTEM_PROMPT` to customize AI responses

### 🌐 **Live URL:**
`https://imbored-cyprus-ai.onrender.com`

**Your Cyprus AI chat will be live! 🏝️🤖✨**