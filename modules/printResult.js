export default function printResult(user) {
  const resultDiv = document.querySelector(".result");

  function createDiv(avatar, nick) {
    const novoDiv = document.createElement("div");
    novoDiv.classList.add("resultCell");
    novoDiv.appendChild(avatar);
    novoDiv.appendChild(nick);
    return novoDiv;
  }

  function createAvatar() {
    const novaImg = document.createElement("img");
    novaImg.src = user.avatar_url;
    novaImg.classList.add("avatar");
    return novaImg;
  }

  function createNick() {
    const newNickname = document.createElement("h4");
    newNickname.innerText = user.login;
    newNickname.classList.add("nickname");
    return newNickname;
  }

  function makeItALink(toAppend) {
    const newLink = document.createElement("a");
    newLink.setAttribute("href", user.html_url);
    newLink.classList.add("link");
    newLink.appendChild(toAppend);
    //newLink.target = "_blank"
    return newLink;
  }

  const toAppend = makeItALink(createDiv(createAvatar(), createNick()));

  resultDiv.append(toAppend);
}
