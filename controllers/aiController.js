const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) {
  console.error('CRITICAL: OPENAI_API_KEY is not set in .env file!');
  process.exit(1); // or just log it – prevents silent failure
}

// System prompt: Tailor to your app's context for better NLP relevance
const systemPrompt = `You are Anna, a helpful AI assistant for Annadaata, a direct farmer-to-consumer grain trading platform. 
Use natural language to respond to queries about grains (e.g., prices, availability), events, cart management, user profiles, and general farming tips. 
Be friendly, concise, and accurate. If the query needs real data, suggest checking the app (we'll enhance this later). 
Examples: 
- "Price of rice?" -> "Current rice price is ₹50/kg. Check GrainPage for details."
- "Add wheat to cart" -> "Sure! Redirecting to cart. (In future, auto-add via integration.)"`;

exports.chatCompletion = async (req, res) => {
  try {
    const { message } = req.body; // Expect { message: "user input" }
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or 'gpt-4o-mini' for better/cheaper performance
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 150, // Limit response length
      temperature: 0.7, // Balance creativity vs. accuracy
    });

    const response = completion.choices[0].message.content;
    res.status(200).json({ response });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'AI service unavailable' });
  }
};
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) {
  console.error('CRITICAL: OPENAI_API_KEY is not set in .env file!');
  process.exit(1); // or just log it – prevents silent failure
}

// System prompt: Tailor to your app's context for better NLP relevance
const systemPrompt = `You are Anna, a helpful AI assistant for Annadaata, a direct farmer-to-consumer grain trading platform. 
Use natural language to respond to queries about grains (e.g., prices, availability), events, cart management, user profiles, and general farming tips. 
Be friendly, concise, and accurate. If the query needs real data, suggest checking the app (we'll enhance this later). 
Examples: 
- "Price of rice?" -> "Current rice price is ₹50/kg. Check GrainPage for details."
- "Add wheat to cart" -> "Sure! Redirecting to cart. (In future, auto-add via integration.)"`;

exports.chatCompletion = async (req, res) => {
  try {
    const { message } = req.body; // Expect { message: "user input" }
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or 'gpt-4o-mini' for better/cheaper performance
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 150, // Limit response length
      temperature: 0.7, // Balance creativity vs. accuracy
    });

    const response = completion.choices[0].message.content;
    res.status(200).json({ response });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'AI service unavailable' });
  }
};
