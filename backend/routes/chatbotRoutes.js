
import express from "express";

const router = express.Router();

const MODELS = [
  "gemini-3.8-flash",
  "gemini-3.5-flash-lite"
];

const SYSTEM_INSTRUCTION = `
You are TravelBuddy AI, a professional and friendly travel assistant
for a Smart Travel Planner website.

YOUR RESPONSIBILITIES:
1. Suggest travel destinations.
2. Create detailed day-wise itineraries.
3. Suggest hotels and accommodation types.
4. Calculate estimated trip budgets.
5. Recommend food, transport and sightseeing.
6. Suggest family, couple, solo and group trips.
7. Help users plan trips according to their budget.
8. Give practical travel tips and packing suggestions.

LANGUAGE:
- Understand English, Hindi and Punjabi.
- Reply in the same language as the user.
- Use simple and friendly language.
- Use emojis naturally.

TRIP PLANNING:
When a user asks for a trip plan, provide:
- Destination overview.
- Day-wise itinerary.
- Popular attractions.
- Food suggestions.
- Transport suggestions.
- Estimated hotel cost.
- Estimated food cost.
- Estimated transport cost.
- Total estimated budget.

IMPORTANT:
- Give useful and detailed answers.
- Do not give unrelated generic replies.
- Ask for missing details when necessary.
- Never invent live hotel prices, bookings or weather.
- Clearly mention when costs are estimates.
- Stay focused on travel assistance.
`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateAnswer(model, apiKey, contents) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 25000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: SYSTEM_INSTRUCTION
              }
            ]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500
          }
        }),
        signal: controller.signal
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        data.error?.message || "Gemini API request failed."
      );

      error.status = response.status;
      throw error;
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      throw new Error("AI did not return a text answer.");
    }

    return reply;

  } finally {
    clearTimeout(timeout);
  }
}

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        reply: "Please enter a message."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        reply: "Gemini API key is missing in backend .env."
      });
    }

    const previousMessages = Array.isArray(history)
      ? history
          .slice(-10)
          .filter(
            (item) =>
              item &&
              ["user", "bot"].includes(item.sender) &&
              typeof item.text === "string" &&
              item.text.trim()
          )
          .map((item) => ({
            role: item.sender === "user" ? "user" : "model",
            parts: [
              {
                text: item.text.trim()
              }
            ]
          }))
      : [];

    const contents = [
      ...previousMessages,
      {
        role: "user",
        parts: [
          {
            text: message.trim()
          }
        ]
      }
    ];

    let lastError = null;

    for (let i = 0; i < MODELS.length; i++) {
      const model = MODELS[i];

      try {
        console.log(`Trying TravelBuddy model: ${model}`);

        const reply = await generateAnswer(
          model,
          apiKey,
          contents
        );

        console.log(`TravelBuddy response received from ${model}`);

        return res.json({
          success: true,
          reply
        });

      } catch (error) {
        lastError = error;

        console.error(
          `Model ${model} failed:`,
          error.message
        );

        const retryable =
          error.status === 429 ||
          error.status === 503 ||
          error.status >= 500 ||
          error.name === "AbortError" ||
          !error.status;

        if (!retryable || i === MODELS.length - 1) {
          break;
        }

        console.log("Trying backup Gemini model...");

        await wait(1000);
      }
    }

    const status = lastError?.status;

    if (status === 400 || status === 401 || status === 403) {
      return res.status(status).json({
        success: false,
        reply: lastError.message
      });
    }

    if (lastError?.name === "AbortError") {
      return res.status(504).json({
        success: false,
        reply: "TravelBuddy is taking too long to respond. Please try again."
      });
    }

    if (status === 429 || status === 503 || status >= 500 || !status) {
      return res.status(503).json({
        success: false,
        reply: "Both AI models are temporarily busy. Please try again in a little while."
      });
    }

    return res.status(500).json({
      success: false,
      reply: lastError?.message || "TravelBuddy could not generate a response."
    });

  } catch (error) {
    console.error("TravelBuddy backend error:", error);

    return res.status(500).json({
      success: false,
      reply: "Something went wrong. Please try again."
    });
  }
});

export default router;
