import { spawn } from "child_process";

export const generateInsights = async (req, res) => {
  try {
    const { salesData, categoryData } = req.body;

    // Aggregate data to minimize prompt size and hallucinations
    const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
    const avgSales = (totalSales / salesData.length).toFixed(2);

    const topCategory = categoryData.reduce((prev, curr) =>
      curr.count > prev.count ? curr : prev
    );

    // Build a minimal structured summary for Mistral
    const summaryData = {
      totalSalesINR: totalSales.toFixed(2),
      avgDailySalesINR: avgSales,
      topCategory: topCategory.category,
      topCategoryCount: topCategory.count,
      categories: categoryData,
    };

    const prompt = `
You are a professional Indian retail analytics assistant.

Here is aggregated recent sales and category data:
${JSON.stringify(summaryData)}

Please generate a **realistic and concise business insights report** using ONLY this data. Do not assume any products or categories beyond what is given.

Use this exact format with plain text (no markdown or special characters):

Top Categories and Products:
- Top category: ...
- Top category product count: ...
- Average daily sales (INR): ...

Sales Trends:
- ...

Recommendations:
- ...

Ensure all currency is shown in ₹ INR. Do not include US dollars ($). Only mention categories and products actually provided in the data.
`.trim();

    const ollama = spawn("ollama", ["run", "mistral"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let aiOutput = "";

    ollama.stdout.on("data", (data) => {
      aiOutput += data.toString();
    });

    ollama.on("close", (code) => {
      if (code !== 0) {
        console.error("Ollama process exited with code", code);
        return res
          .status(500)
          .json({ insights: "AI process exited with code " + code });
      }

      if (!aiOutput.trim()) {
        return res
          .status(500)
          .json({ insights: "AI returned empty output. Please retry." });
      }

      res.json({ insights: aiOutput.trim() });
    });

    // Send prompt
    ollama.stdin.write(prompt);
    ollama.stdin.end();
  } catch (err) {
    console.error("AI Controller Error:", err.message);
    res.status(500).json({ insights: "Failed to generate AI insights." });
  }
};
