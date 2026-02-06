const feed = document.getElementById("feed");

function post() {
  const text = document.getElementById("text").value;
  if (!text) return;

  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `<p>${text}</p>
  <input placeholder="Comment..." onkeypress="addComment(event,this)">
  <div class="comments"></div>`;

  feed.prepend(div);
  document.getElementById("text").value = "";
}

function addComment(e,input){
  if(e.key==="Enter"){
    const c = document.createElement("p");
    c.innerText = input.value;
    input.nextElementSibling.appendChild(c);
    input.value="";
  }
}
