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
  // Title
  let pageTitleBlock = document.querySelector("div[placeholder='Untitled']");
  if (!pageTitleBlock) return;

  let pageFrame = document.querySelector(".notion-frame");
  const pageTitle = pageTitleBlock.textContent;

  let pageIcon = document.querySelector(
    "div.notion-frame > div.notion-scroller.vertical.horizontal > div:nth-child(1) > div:nth-child(2) .notion-record-icon"
  );

  pageTitleBlock.dataset.selector = "pageTitle";
  pageFrame.dataset.selector = pageTitle; // Set Notion Frame ID to page title
  pageIcon.dataset.selector = "pageIcon";
}

const observer = new MutationObserver(function () {
  const app = document.querySelector("#notion-app");

  if (!app) return;

  window.onpopstate = function () {};

  setCustomIcons(
    "https://raw.githubusercontent.com/orelhassid/notion/b3768a3322588ba0bb1b913abae02d3e7a54b2bb/icons/logo.svg"
  );
  setClassNames();
});

observer.observe(document.querySelector("#notion-app"), {
  childList: true,
  subtree: true,
});
