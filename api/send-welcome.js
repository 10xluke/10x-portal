import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, creatorName } = req.body;

    if (!email) return res.status(400).json({ error: "Missing email" });

    const name = creatorName || "there";

    const { data, error } = await resend.emails.send({
      from: "BIG Records <noreply@bigrecords.com>",
      to: email,
      subject: "[BIG Records] You've been invited to our Creator Portal",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;">

  <!-- Logo -->
  <tr><td style="padding-bottom:32px;">
    <img src="https://app.bigrecords.com/images/email-logo.jpg" alt="BIG Records" style="display:block;height:72px;width:72px;" />
  </td></tr>

  <!-- Greeting -->
  <tr><td style="font-size:15px;color:#e0e0e0;font-weight:400;padding-bottom:20px;line-height:1.6;">
    Hey ${name},
  </td></tr>

  <!-- Body -->
  <tr><td style="font-size:14px;color:rgba(255,255,255,0.65);font-weight:400;padding-bottom:8px;line-height:1.7;">
    Welcome to BIG Records! You've been invited to join our creator network for TikTok promo campaigns.
  </td></tr>

  <tr><td style="font-size:14px;color:rgba(255,255,255,0.65);font-weight:400;padding-bottom:24px;line-height:1.7;">
    Here's how it works:
  </td></tr>

  <!-- Steps -->
  <tr><td style="padding-bottom:24px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:12px 16px;background:rgba(255,255,255,0.04);border-radius:12px 12px 4px 4px;border:1px solid rgba(255,255,255,0.06);border-bottom:none;">
        <span style="color:rgba(255,255,255,0.25);font-size:12px;font-weight:400;">1</span>
        <span style="color:rgba(255,255,255,0.8);font-size:13px;font-weight:400;margin-left:10px;">We invite you to a campaign with a TikTok sound</span>
      </td></tr>
      <tr><td style="padding:12px 16px;background:rgba(255,255,255,0.04);border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">
        <span style="color:rgba(255,255,255,0.25);font-size:12px;font-weight:400;">2</span>
        <span style="color:rgba(255,255,255,0.8);font-size:13px;font-weight:400;margin-left:10px;">You accept, create a video, and post it on TikTok</span>
      </td></tr>
      <tr><td style="padding:12px 16px;background:rgba(255,255,255,0.04);border-radius:4px 4px 12px 12px;border:1px solid rgba(255,255,255,0.06);border-top:none;">
        <span style="color:rgba(255,255,255,0.25);font-size:12px;font-weight:400;">3</span>
        <span style="color:rgba(255,255,255,0.8);font-size:13px;font-weight:400;margin-left:10px;">Submit the link in the portal and get paid via PayPal</span>
      </td></tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding-bottom:12px;">
    <a href="https://app.bigrecords.com" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#000000;font-size:13px;font-weight:500;text-decoration:none;border-radius:10px;letter-spacing:-0.1px;">
      Open Portal
    </a>
  </td></tr>

  <tr><td style="padding-bottom:32px;">
    <a href="https://app.bigrecords.com/guide" style="font-size:13px;color:rgba(255,255,255,0.4);text-decoration:none;font-weight:300;">
      Read the Creator Guide →
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="font-size:12px;color:rgba(255,255,255,0.25);font-weight:400;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);line-height:1.6;">
    Log in with this email address (<span style="color:rgba(255,255,255,0.35);">${email}</span>) to access the portal.<br>
    Questions? DM <a href="https://instagram.com/bigrecordspromo" style="color:rgba(255,255,255,0.35);text-decoration:none;">@bigrecordspromo</a> or email <a href="mailto:promo@bigrecords.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">promo@bigrecords.com</a>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
      `.trim(),
    });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
