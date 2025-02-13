const btn = document.querySelector("#searchButton");
let userNameInput = document.querySelector("#username");
const errorMessage = document.querySelector("#errorMessage");

btn.addEventListener("click", () => {
  setValues();
});

async function getRes(userName) {
  try {
    const url = `https://api.github.com/users/${userName}`;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    let message = "An unexpected error occurred. Please try again.";

    if (error.response) {
      if (error.response.status === 404) {
        message = "User not found.";
      } else if (error.response.status === 403) {
        message = "Rate limit exceeded. Try again later.";
      } else {
        message = "Server error. Please try again.";
      }
    } else if (error.request) {
      message = "Network error. Please check your internet connection.";
    }

    console.error("Error fetching user:", error);
    showError(message);
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

  if (!data) {
    if (errorMessage) {
      errorMessage.innerText =
        "User not found or an error occurred. Please try again.";
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

  if (bio) bio.innerText = data.bio ?? "Not available";
  if (createdAt)
    createdAt.innerText = `Joined ${formatDate(data.created_at) || "Unknown"}`;
  if (repos) repos.innerText = data.public_repos ?? "Not available";
  if (followers) followers.innerText = data.followers ?? 0;
  if (following) following.innerText = data.following ?? 0;
  if (location)
    location.innerHTML = `<i class="fas fa-location-dot me-2"></i> ${
      data.location ?? "Not available"
    }`;

  if (twitterLink) {
    if (data.twitter_username) {
      twitterLink.setAttribute(
        "href",
        `https://x.com/${data.twitter_username}`
      );
    } else {
      twitterLink.setAttribute("href", "#");
    }
  }

  if (blogLink) {
    if (data.blog) {
      blogLink.setAttribute("href", data.blog);
    } else {
      blogLink.setAttribute("href", "#");
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

function showError(msg) {
  if (errorMessage) {
    errorMessage.innerText = msg;
    errorMessage.style.display = "block";
  } else {
    alert(msg);
  }
}
