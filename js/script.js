console.log("Index.js File. Import CSS Files");
function addStyle(href, rel) {
  let linkToAdd = document.createElement("link");
  linkToAdd.href = href;
  linkToAdd.rel = "stylesheet";
  if (rel) linkToAdd.rel = rel;
  document.head.appendChild(linkToAdd);
}

addStyle(`https://orelhassid.github.io/notion/css/theme.css`);
