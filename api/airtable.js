export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const TOKEN = process.env.AIRTABLE_TOKEN;
  const BASE_ID = "appcoK3pr8zwz08iX";
  const { path } = req.query;
  if (!path) return res.status(400).json({ error: "Missing path" });

  const url = `https://api.airtable.com/v0/${BASE_ID}/${path}`;
  const options = {
    method: req.method,
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  };
  if (req.method === "PATCH" || req.method === "POST") {
    options.body = JSON.stringify(req.body);
  }

  const response = await fetch(url, options);
  const data = await response.json();
  return res.status(response.status).json(data);
}
