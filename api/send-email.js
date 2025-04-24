const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Verify the request method
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Méthode non autorisée",
    });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate form data
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    console.log("Email configuration:");
    console.log("- User:", emailUser);
    console.log("- Password length:", emailPass ? emailPass.length : 0);

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.fr",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // Message options
    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `Nouveau message de ${name} via le formulaire de contact`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    // Return detailed error for debugging
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      errorMessage: error.message,
      errorCode: error.code,
      errorStack:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
