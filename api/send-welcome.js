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
    <img src="data:image/png;base64,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" alt="BIG Records" style="height:40px;" />
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
