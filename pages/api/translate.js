export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, targetLang } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a translator AI."
          },
          {
            role: "user",
            content: `Translate this to ${targetLang}: ${text}`
          }
        ]
      })
    });

    const data = await response.json();
    const translated = data.choices[0].message.content;
    res.status(200).json({ translated });
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).json({ error: "Translation failed." });
  }
}
