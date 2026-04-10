import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Missing email or code' });
  }

  try {
    await resend.emails.send({
      from: 'BIG RECORDS <noreply@bigrecords.com>',
      to: email,
      subject: `${code} is your login code`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px; background: #000; color: #FFF;">
          <img src="data:image/png;base64,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" alt="BIG Records" style="height: 36px; margin-bottom: 32px; display: block;" />
          <h1 style="font-size: 24px; font-weight: 500; color: #FFF; margin: 0 0 6px;">Your login code</h1>
          <p style="color: #888; font-size: 14px; margin: 0 0 28px;">Enter this code to sign in to your Creator Portal.</p>
          <div style="background: #151515; border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 28px; border: 1px solid #222;">
            <span style="font-size: 32px; font-weight: 500; letter-spacing: 8px; color: #FFF;">${code}</span>
          </div>
          <p style="color: #555; font-size: 12px; margin: 0;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
