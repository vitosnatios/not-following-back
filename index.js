import printResult from "./modules/printResult.js";

const button = document.querySelector('[type="submit"]');
const input = document.querySelector('[name="username"]');

const fetchFollowAndFollowers = async (username) => {
  const button = document.querySelector("button");
  const loadingGif = document.querySelector('[alt="loading"]');
  const hasPrevResults = document.querySelectorAll(".resultCell");
  button.style.display = "none";
  loadingGif.style.display = "initial";
  if (hasPrevResults.length) {
    hasPrevResults.forEach((i) => i.remove());
  }
  try {
    const seguindoRes = await (
      await fetch(
        `https://api.github.com/users/${username}/following?per_page=1000`
      )
    ).json();
    const seguidoresRes = await (
      await fetch(
        `https://api.github.com/users/${username}/followers?per_page=1000`
      )
    ).json();
    const seguindo = seguindoRes.map((user) => {
      return user.login;
    });
    const seguidores = seguidoresRes.map((user) => {
      return user.login;
    });
    seguindo.forEach((seguido, index) => {
      if (!seguidores.includes(seguido)) {
        const { login, avatar_url, html_url } = seguindoRes[index];
        printResult({
          login,
          avatar_url,
          html_url,
        });
      }
    });

    button.style.display = "initial";
    loadingGif.style.display = "none";
    document.querySelector(".result").style.display = "block";
  } catch (err) {
    document.querySelector(".result").style.display = "block";
    document.querySelector(".result").innerText =
      "Houve algum erro. Tente novamente, ou não.";
    setTimeout(() => {
      document.querySelector(".result").innerText = "";
      document.querySelector(".result").style.display = "none";
    }, 1500);
    button.style.display = "initial";
    loadingGif.style.display = "none";
  }
};

button.addEventListener("click", () => {
  fetchFollowAndFollowers(input.value);
});
