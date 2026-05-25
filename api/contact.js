export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ayurveda Sanctuary <onboarding@resend.dev>',
        to: process.env.CLINIC_EMAIL || 'delivery@resend.dev',
        subject: `New Consultation Request from ${name}`,
        html: `
          <h3>New Consultation Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message/Therapy:</strong> ${message}</p>
        `,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      return res.status(500).json({ success: false, message: resendData.message || 'Failed to send email' });
    }

    return res.status(200).json({
      success: true,
      message: "Request submitted successfully"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
