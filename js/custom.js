// Test
console.log("CREATED BY OREL HASSID");

function setCustomIcons(iconUrl) {
  let shortcutIcon = document.querySelector("link[rel='shortcut icon']");
  let appleIcon = document.querySelector("link[rel='apple-touch-icon']");
  let metaTwitter = document.querySelector("meta[name='twitter:image']");
  let metaOg = document.querySelector("meta[property='og:image']");

  shortcutIcon.href = iconUrl;
  appleIcon.href = iconUrl;
  metaTwitter.content = iconUrl;
  metaOg.content = iconUrl;
}

function setClassNames() {
  let pageTitleBlock = document.querySelector("div[placeholder='Untitled']");
  let pageFrame = document.querySelector(".notion-frame");
  const pageTitle = pageTitleBlock.textContent;

  pageFrame.id = pageTitle; // Set Notion Frame ID to page title
}

const observer = new MutationObserver(function () {
  const app = document.querySelector("#notion-app");
  console.log("MutationObserver 1", app);
  if (!app) return;

  console.log("MutationObserver 2", window.onpopstate);
  window.onpopstate = function () {
    console.log("MutationObserver 3", window.onpopstate);
  };

  setCustomIcons(
    "https://raw.githubusercontent.com/orelhassid/notion/b3768a3322588ba0bb1b913abae02d3e7a54b2bb/icons/logo.svg"
  );
  setClassNames();
});

observer.observe(document.querySelector("#notion-app"), {
  childList: true,
  subtree: true,
});
