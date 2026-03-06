export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, amount, paypal } = req.body;

  if (!email || !amount || !paypal) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Withdrawals`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Creator Email': email,
                Amount: amount,
                Status: 'Pending',
                PayPal: paypal,
                'Created Date': new Date().toISOString().split('T')[0],
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) throw new Error(await response.text());

    const data = await response.json();
    return res.status(200).json({ success: true, record: data.records[0] });
  } catch (error) {
    console.error('Withdraw error:', error);
    return res.status(500).json({ error: 'Failed to create withdrawal' });
  }
}
