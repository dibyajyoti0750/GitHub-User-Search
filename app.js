const btn = document.querySelector("#searchButton");
let userNameInput = document.querySelector("#username");

btn.addEventListener("click", () => {
  setValues();
});

async function getRes(userName) {
  try {
    const url = `https://api.github.com/users/${userName}`;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

async function setValues() {
  let userName = userNameInput.value.trim();
  if (!userName) return;

  let data = await getRes(userName);

  userNameInput.value = "";
  userNameInput.focus();

  const name = document.querySelector("#name");
  const avatar = document.querySelector("#avatar");
  const profileLink = document.querySelector("#profileLink");
  const bio = document.querySelector("#bio");
  const createdAt = document.querySelector("#createdAt");
  const repos = document.querySelector("#repos");
  const followers = document.querySelector("#followers");
  const following = document.querySelector("#following");
  const location = document.querySelector("#location");
  const twitterLink = document.querySelector("#twitterLink");
  const blogLink = document.querySelector("#blogLink");
  const viewType = document.querySelector("#viewType");
  const errorMessage = document.querySelector("#errorMessage");

  if (!data) {
    if (errorMessage) {
      errorMessage.innerText = "User not found.";
      errorMessage.style.display = "block";
    }
    return;
  }

  if (errorMessage) {
    errorMessage.innerText = "";
    errorMessage.style.display = "none";
  }

  if (name) name.innerText = data.name || "No Name Available";
  if (avatar)
    avatar.setAttribute(
      "src",
      data.avatar_url || "src/0684456b-aa2b-4631-86f7-93ceaf33303c.jpg"
    );

  if (profileLink) {
    profileLink.setAttribute("href", data.html_url || "#");
    profileLink.innerText = `@${data.login ?? "Not available"}`;
  }

  if (bio) bio.innerText = `Bio: ${data.bio ?? "Not available"}`;
  if (createdAt)
    createdAt.innerText = `Created at: ${
      formatDate(data.created_at) || "Unknown"
    }`;
  if (repos) repos.innerText = `Repos: ${data.public_repos ?? "Not available"}`;
  if (followers) followers.innerText = `Followers: ${data.followers ?? 0}`;
  if (following) following.innerText = `Following: ${data.following ?? 0}`;
  if (location)
    location.innerText = `Location: ${data.location ?? "Not available"}`;

  if (twitterLink) {
    if (data.twitter_username) {
      twitterLink.setAttribute(
        "href",
        `https://x.com/${data.twitter_username}`
      );
    } else {
      twitterLink.setAttribute("href", "#");
      twitterLink.innerText = "Not available";
    }
  }

  if (blogLink) {
    if (data.blog) {
      blogLink.setAttribute("href", data.blog);
      blogLink.innerText = "Visit Blog";
    } else {
      blogLink.setAttribute("href", "#");
      blogLink.innerText = "Not available";
    }
  }

  if (viewType)
    viewType.innerText = `User Type: ${data.user_view_type || "Unknown"}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
