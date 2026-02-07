fetch("updates.json")
  .then(res => res.json())
  .then(data => {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    data.forEach(update => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h4>${update.title}</h4>
        <p>${update.content}</p>
        <a href="${update.link}" target="_blank">Read more</a>
        <br />
        <small>${update.time}</small>
      `;
      feed.appendChild(div);
    });
  });
