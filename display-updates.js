async function loadAndDisplayUpdates() {
  try {
    const res = await fetch('updates.json');
    if (!res.ok) throw new Error('Network response was not ok');

    const updates = await res.json();
    const container = document.getElementById('updates-container');
    container.innerHTML = '';

    if (updates.length === 0) {
      container.innerHTML = '<p>No updates available.</p>';
      return;
    }

    updates.forEach(update => {
      const card = document.createElement('div');
      card.className = 'update-card';
      card.innerHTML = `
        <h2>${update.title}</h2>
        <p>${update.content}</p>
        <a href="${update.link}" target="_blank" rel="noopener">Read more</a>
        <div class="update-date">${update.date}</div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    const container = document.getElementById('updates-container');
    container.innerHTML = '<p>Failed to load updates.</p>';
    console.error('Error loading updates:', error);
  }
}

loadAndDisplayUpdates();