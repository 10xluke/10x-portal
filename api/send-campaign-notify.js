import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, creatorName, campaignName, payment, deadline } = req.body;

    if (!email) return res.status(400).json({ error: "Missing email" });

    const name = creatorName || "there";
    const campaign = campaignName || "a new campaign";
    const pay = payment ? `$${payment}` : "";
    const dl = deadline || "";

    const { data, error } = await resend.emails.send({
      from: "BIG Records <noreply@bigrecords.com>",
      to: email,
      subject: `[BIG Records] New campaign available`,
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
    <span style="font-size:16px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">BIG Records</span>
  </td></tr>

  <!-- Greeting -->
  <tr><td style="font-size:15px;color:#e0e0e0;font-weight:400;padding-bottom:20px;line-height:1.6;">
    Hey ${name},
  </td></tr>

  <!-- Body -->
  <tr><td style="font-size:14px;color:rgba(255,255,255,0.65);font-weight:400;padding-bottom:24px;line-height:1.7;">
    You've been invited to a new promo campaign:
  </td></tr>

  <!-- Campaign details card -->
  <tr><td style="padding-bottom:28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:14px;">
      <tr><td style="padding:18px 20px;">
        <div style="font-size:16px;color:#ffffff;font-weight:500;margin-bottom:12px;letter-spacing:-0.2px;">${campaign}</div>
        ${pay ? `<div style="font-size:13px;color:rgba(255,255,255,0.55);font-weight:400;margin-bottom:6px;">Payment: <span style="color:#fff;font-weight:500;">${pay}</span></div>` : ""}
        ${dl ? `<div style="font-size:13px;color:rgba(255,255,255,0.55);font-weight:400;">Deadline: <span style="color:#fff;font-weight:500;">${dl}</span></div>` : ""}
      </td></tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding-bottom:32px;">
    <a href="https://app.bigrecords.com" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#000000;font-size:13px;font-weight:500;text-decoration:none;border-radius:10px;letter-spacing:-0.1px;">
      View Campaign
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="font-size:12px;color:rgba(255,255,255,0.25);font-weight:400;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);line-height:1.6;">
    Log in to the portal to accept or decline this campaign.<br>
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
