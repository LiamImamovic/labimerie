const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Vérifier que la méthode est bien POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Méthode non autorisée",
    });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Valider les données du formulaire
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    // Configurer le transporteur SMTP avec vos identifiants Ionos
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.fr", // ou l'hôte SMTP fourni par Ionos
      port: 587, // généralement 587 pour TLS ou 465 pour SSL
      secure: false, // true pour 465, false pour les autres ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Options du message
    const mailOptions = {
      from: `"${name}" <contact@labimerie.fr>`,
      to: "contact@labimerie.fr", // adresse de réception
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

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Répondre avec succès
    return res.status(200).json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      error: error.message,
    });
  }
};
