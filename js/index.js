function addStyle(href, rel) {
  let linkToAdd = document.createElement("link");
  linkToAdd.href = href;
  linkToAdd.rel = "stylesheet";
  if (rel) linkToAdd.rel = rel;
  document.head.appendChild(linkToAdd);
}

function addScript(script, src) {
  let scriptToAdd = document.createElement("script");
  scriptToAdd.type = "text/javascript";

  let inlineScript = document.createTextNode(script);
  scriptToAdd.appendChild(inlineScript);

  // load script from another source
  if (src) scriptToAdd.src = src;

  document.head.appendChild(scriptToAdd);
}

function addMetaTags() {
  let meta = document.createElement("meta");
  /* <meta http-equiv="Content-Security-Policy" content="
  style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
  
  */
  meta.httpEquiv = "Content-Security-Policy";
  meta.content = `style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com`;

  document.head.appendChild(meta);
}

addMetaTags();
addStyle(`https://fonts.gstatic.com`, "preconnect");
addStyle(
  `https://fonts.googleapis.com/css2?family=Acme&family=Rubik:wght@300;400;500;600;700;800;900&display=swap`
);

addStyle(`https://orelhassid.github.io/notion/css/theme.css`);
addStyle(`https://orelhassid.github.io/notion/css/rtl.css`);
addScript(`__console.environment.ThemeStore.setState({ mode: 'dark' });`);
