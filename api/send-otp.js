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
      from: '10X Projects <noreply@10xprojects.co>',
      to: email,
      subject: `${code} is your login code`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 0;">
          <div style="font-size: 14px; font-weight: 600; color: #000; margin-bottom: 24px;">10X PROJECTS</div>
          <h1 style="font-size: 28px; font-weight: 500; color: #000; margin: 0 0 8px;">Your login code</h1>
          <p style="color: #999; font-size: 15px; margin: 0 0 32px;">Enter this code to sign in to your Creator Portal.</p>
          <div style="background: #F6F6F6; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 32px;">
            <span style="font-size: 36px; font-weight: 500; letter-spacing: 8px; color: #000;">${code}</span>
          </div>
          <p style="color: #BBB; font-size: 13px; margin: 0;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
