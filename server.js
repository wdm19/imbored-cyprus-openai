const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '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';
const BACKUP_KEY = process.env.BACKUP_KEY || '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';

const CYPRUS_SYSTEM_PROMPT = `You are ImboredCY, an enthusiastic AI assistant specializing in Cyprus activities and experiences.

RESPONSE FORMAT: {"message": "your response", "choices": ["Choice 1", "Choice 2", "Choice 3"]}
- Be enthusiastic about Cyprus with emojis
- Provide 2-6 actionable choices
- Keep responses under 150 words

CYPRUS EXPERTISE:
- Beaches: Nissi Beach (Ayia Napa), Fig Tree Bay (Protaras), Blue Lagoon (Akamas), Coral Bay (Paphos)
- Adventures: ATV tours, scuba diving, paragliding, sea caves exploration
- Food: Traditional tavernas, meze restaurants, wineries, fresh seafood spots
- Culture: Kourion ruins, Tombs of the Kings, Paphos Archaeological Park, Kykkos Monastery
- Nightlife: Ayia Napa clubs, Limassol beach bars, Paphos harbor restaurants
- Mountains: Troodos Mountains, Omodos Village, traditional villages, hiking trails

Always suggest specific places and provide actionable choices!`;

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, userChoice } = req.body;
        const conversationMessages = [
            { role: 'system', content: CYPRUS_SYSTEM_PROMPT },
            ...messages.slice(-6),
            { role: 'user', content: userChoice }
        ];

        let response = await callOpenAI(conversationMessages, OPENAI_API_KEY);
        if (!response && BACKUP_KEY) {
            response = await callOpenAI(conversationMessages, BACKUP_KEY);
        }

        if (!response) throw new Error('Both API keys failed');

        let aiResponse = response.choices[0].message.content.trim();

        try {
            const parsed = JSON.parse(aiResponse);
            if (parsed.message && parsed.choices) {
                res.json(parsed);
                return;
            }
        } catch (e) {}

        res.json({
            message: aiResponse,
            choices: ["🏖️ Show me beaches", "🏔️ Mountain adventures", "🍽️ Food experiences", "🎉 Nightlife options", "🔄 Something else"]
        });

    } catch (error) {
        res.json({
            message: "I'm having a moment! 😅 But Cyprus has endless amazing activities! What would you like to explore?",
            choices: ["🏖️ Beautiful Beaches", "🏔️ Adventure Sports", "🍽️ Amazing Food", "🏛️ Culture & History", "🌙 Epic Nightlife"]
        });
    }
});

async function callOpenAI(messages, apiKey) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: messages,
                temperature: 0.8,
                max_tokens: 400
            })
        });
        return response.ok ? await response.json() : null;
    } catch (error) {
        return null;
    }
}

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        message: 'ImboredCY OpenAI Server Running!',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 ImboredCY OpenAI Server started!');
    console.log(`📡 Server running on port ${PORT}`);
});