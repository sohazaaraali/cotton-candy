import MailerSend from "mailersend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Only allow POST requests
  }

  const ms = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
  });

  const data = req.body;

  try {
    await ms.email.send({
      from: {
        email: "soha.zaara.ali@gmail.com",
        name: "Soha Ali"
      },
      to: [
        {
          email: "soha.zaara.ali@gmail.com",
          name: "Soha"
        }
      ],
      subject: "🍭 New Cotton Candy Order!",
      html: `
        <h2>New Order Received</h2>
        <ul>
          <li><strong>First Name:</strong> ${data.firstName}</li>
          <li><strong>Parent Email:</strong> ${data.parentEmail}</li>
          <li><strong>Event Date:</strong> ${data.eventDate}</li>
          <li><strong>Event Type:</strong> ${data.eventType}</li>
          <li><strong>Quantity:</strong> ${data.quantity}</li>
          <li><strong>Flavors:</strong> ${data.flavors.join(", ")}</li>
          <li><strong>Notes:</strong> ${data.notes}</li>
        </ul>
      `,
      text: `New cotton candy order from ${data.firstName}.`,
    });

    return res.status(200).json({ message: "Order email sent!" });
  } catch (error) {
    console.error("MailerSend Error:", error);
    return res.status(500).json({ message: "Failed to send order email" });
  }
}