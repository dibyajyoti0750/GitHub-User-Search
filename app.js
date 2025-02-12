const btn = document.querySelector("#searchButton");

btn.addEventListener("click", () => {
  setValues();
});

async function getRes(userName) {
  try {
    const url = `https://api.github.com/users/${userName}`;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function setValues() {
  let userName = document.querySelector("#username");
  let data = await getRes(userName.value);
  userName.value = "";
  userName.focus();

  let avatar = document
    .querySelector("#avatar")
    .setAttribute("src", data.avatar_url);
  let name = (document.querySelector("#name").innerText = data.name);
  let profileLink = document
    .querySelector("#profileLink")
    .setAttribute("href", data.html_url);
  let bio = (document.querySelector("#bio").innerText = `Bio: ${data.bio}`);
  let createdAt = (document.querySelector(
    "#createdAt"
  ).innerText = `Created at: ${formatDate(data.created_at)}`);
  let followers = (document.querySelector(
    "#followers"
  ).innerText = `Followers: ${data.followers}`);
  let following = (document.querySelector(
    "#following"
  ).innerText = `Following: ${data.following}`);
  let twitterLink = document
    .querySelector("#twitterLink")
    .setAttribute("href", `https://x.com/${data.twitter_username}`);
  let blogLink = document
    .querySelector("#blogLink")
    .setAttribute("href", data.blog);
  let viewType = (document.querySelector(
    "#viewType"
  ).innerText = `User Type: ${data.user_view_type}`);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
