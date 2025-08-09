document.getElementById("waitlistForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (!name || !email) {
    message.textContent = "Veuillez remplir tous les champs.";
    message.style.color = "red";
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      message.textContent = "✅ Inscription réussie ! Vous êtes ajouté à la liste d'attente.";
      message.style.color = "green";
      document.getElementById("waitlistForm").reset();
    } else {
      throw new Error("Erreur serveur");
    }
  } catch (error) {
    message.textContent = "❌ Une erreur est survenue. Réessayez plus tard.";
    message.style.color = "red";
  }
});
