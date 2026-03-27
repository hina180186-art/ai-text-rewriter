import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that rewrites text professionally.",
        },
        {
          role: "user",
          content: `Rewrite this text to be clear, professional, and engaging:\n\n${text}`,
        },
      ],
    });

    res.status(200).json({
      output: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
