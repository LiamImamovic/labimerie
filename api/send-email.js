import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Permettre seulement les requêtes POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  // Validation des données
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont requis",
    });
  }

  // Vérifier les variables d'environnement
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Variables d'environnement manquantes");
    return res.status(500).json({
      success: false,
      message: "Configuration email manquante",
    });
  }

  try {
    // Configuration du transporteur email avec les paramètres Ionos optimisés
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.fr",
      port: 465,
      secure: true, // true pour SSL sur port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Accepter les certificats auto-signés si nécessaire
        rejectUnauthorized: false,
        // Forcer TLS version
        minVersion: "TLSv1.2",
      },
      // Timeout plus long pour Ionos
      connectionTimeout: 60000, // 60 secondes
      greetingTimeout: 30000, // 30 secondes
      socketTimeout: 60000, // 60 secondes
    });

    console.log("Tentative de connexion SMTP...");

    // Tester la connexion avant d'envoyer
    try {
      await transporter.verify();
      console.log("Connexion SMTP vérifiée avec succès");
    } catch (verifyError) {
      console.error("Erreur de vérification SMTP:", verifyError);
      // Continuer quand même, parfois verify() échoue mais sendMail() fonctionne
    }

    // Configuration de l'email
    const mailOptions = {
      from: `"La Bimerie" <${process.env.EMAIL_USER}>`, // Nom d'affichage + email
      to: "contact@labimerie.fr",
      replyTo: email, // Permettre de répondre directement au client
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message depuis le site web
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Informations du contact :</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message :</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(
              /\n/g,
              "<br>",
            )}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px;">
              Ce message a été envoyé depuis le formulaire de contact du site web La Bimerie
            </p>
          </div>
        </div>
      `,
      // Version texte de fallback
      text: `
Nouveau message depuis le site web La Bimerie

Informations du contact :
Nom : ${name}
Email : ${email}
Téléphone : ${phone}

Message :
${message}
      `,
    };

    console.log("Envoi de l'email...");
    const result = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès:", result.messageId);

    return res.status(200).json({
      success: true,
      message: "Email envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message || "Erreur inconnue",
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    });

    // Messages d'erreur plus spécifiques
    let errorMessage = "Erreur lors de l'envoi de l'email";

    if (error.message) {
      if (error.message.includes("authentication")) {
        errorMessage = "Erreur d'authentification email";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Timeout de connexion email";
      } else if (error.message.includes("connection")) {
        errorMessage = "Erreur de connexion au serveur email";
      }
    }

    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
}
