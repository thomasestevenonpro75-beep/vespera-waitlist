document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlistForm');
  const status = document.getElementById('status');
  const btn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = "Envoi en cours…";
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Erreur serveur');
      }

      status.textContent = "Merci ! Un e-mail de confirmation vient de vous être envoyé.";
      form.reset();
    } catch (err) {
      status.textContent = "Désolé, une erreur est survenue. Réessayez.";
    } finally {
      btn.disabled = false;
    }
  });
});
