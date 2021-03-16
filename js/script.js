console.log("Index.js File. Import CSS Files");

const gitHubUrl = "https://orelhassid.github.io/notion";
const apiEndpoint = "http://localhost:7000/api";
let settings;
// Example POST method implementation:
async function fetchData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

fetchData(`${apiEndpoint}/sites/604eeebf4373cb53709b8912`).then((data) => {
  console.log("Settings Data 1", data); // JSON data parsed by `data.json()` call
  settings = data;
});

console.log("Settings 2", settings);

function addStyle(href, rel) {
  let linkToAdd = document.createElement("link");
  linkToAdd.href = href;
  linkToAdd.rel = "stylesheet";
  if (rel) linkToAdd.rel = rel;
  document.head.appendChild(linkToAdd);
}

addStyle(`${gitHubUrl}/css/theme.css`);
addStyle(`${gitHubUrl}/css/rtl.css`);
