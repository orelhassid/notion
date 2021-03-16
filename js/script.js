console.log("Index.js File. Import CSS Files");

const gitHubUrl = "https://orelhassid.github.io/notion";
function addStyle(href, rel) {
  let linkToAdd = document.createElement("link");
  linkToAdd.href = href;
  linkToAdd.rel = "stylesheet";
  if (rel) linkToAdd.rel = rel;
  document.head.appendChild(linkToAdd);
}

addStyle(`${gitHubUrl}/css/theme.css`);
addStyle(`${gitHubUrl}/css/rtl.css`);
