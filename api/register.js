import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nom et email requis' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 📩 Email pour toi
    await resend.emails.send({
      from: 'Vespera Angelorum <onboarding@resend.dev>',
      to: process.env.OWNER_EMAIL || 'thomas.estevenonpro75@gmail.com',
      subject: 'Nouvelle inscription à la liste d’attente',
      html: `<p><b>Nom :</b> ${name}</p><p><b>Email :</b> ${email}</p>`
    });

    // 📩 Email de confirmation pour le visiteur
    await resend.emails.send({
      from: 'Vespera Angelorum <onboarding@resend.dev>',
      to: email,
      subject: 'Confirmation inscription liste d’attente',
      html: `<p>Bonjour ${name},</p>
             <p>Merci de vous être inscrit à la liste d’attente pour nos prochaines soirées.</p>
             <p>Nous vous tiendrons informé dès l’ouverture des réservations.</p>
             <p>— L’équipe Vespera Angelorum</p>`
    });

    return res.status(200).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
