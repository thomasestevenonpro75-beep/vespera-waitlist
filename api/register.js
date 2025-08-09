export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nom et email requis' });
  }

  try {
    // 📌 Ici tu peux remplacer par l'enregistrement dans une base de données
    console.log(`Nouvelle inscription : ${name} - ${email}`);

    // Réponse OK
    return res.status(200).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
