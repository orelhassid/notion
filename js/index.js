console.log("INDEX.JS");

let SETTINGS = {};
async function setSettings() {
  response = await fetch(
    "https://orelhassid.github.io/notion/settings/settings-dev.json"
  );

  const result = await response.json();
  SETTINGS = { ...result };
  // return result;
}
setSettings();

console.log("INDEX.JS 2", SETTINGS);

const features = document.createElement("div");
features.className = "topbar-features";
features.id = "topbar-features";
if (SETTINGS.theme) localStorage.setItem("oh_theme", SETTINGS.theme);

features.innerHTML =
  '<div class="theme-container"><button id="dropdown-button" class="dropdown-button"><span>Theme</span></button><ul class="dropdown-content" id="dropdown-content"><li id="dark">Dark</li><li id="light">Light</li><li id="palenight">Palenight</li><li id="solarized_light">Solarized Light</li><li id="night_owl">Night Owl</li></ul></div>';

function createDropdown(device) {
  const currentTheme = localStorage.getItem("oh_theme") || SETTINGS.theme;
  setTheme({ id: currentTheme });
  const nav =
    device === "web"
      ? document.querySelector(".notion-topbar").firstChild
      : document.querySelector(".notion-topbar-mobile");
  nav.appendChild(features);

  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownContent = document.getElementById("dropdown-content");

  dropdownButton.addEventListener("click", toggle);

  var items = Array.from(dropdownContent.children);
  items.forEach((item) => {
    item.addEventListener("click", toggle);
    item.addEventListener("click", () => setTheme(item));
  });
}

function toggle() {
  const dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("show");
}

function setTheme({ id }) {
  document.body.className = "notion-body " + id;
  document.body.dataset.theme = id;

  localStorage.setItem("oh_theme", id);
  switch (id) {
    case "dark":
      onDark();
      break;
    case "light":
      onLight();
      break;
    case "palenight":
      onDark();
      break;
    case "solarized_light":
      onLight();
      break;
    case "night_owl":
      onDark();
      break;
    default:
      onLight();
  }
}

function onDark() {
  __console.environment.ThemeStore.setState({ mode: "dark" });
}

function onLight() {
  __console.environment.ThemeStore.setState({ mode: "light" });
}

const SLUG_TO_PAGE = SETTINGS.SLUG_TO_PAGE;
const PAGE_TO_SLUG = {};
const slugs = [];
const pages = [];
let redirected = false;
Object.keys(SLUG_TO_PAGE).forEach((slug) => {
  const page = SLUG_TO_PAGE[slug];
  slugs.push(slug);
  pages.push(page);
  PAGE_TO_SLUG[page] = slug;
});

function getPage() {
  return location.pathname.slice(-32);
}
function getSlug() {
  return location.pathname.slice(1);
}

function updateSlug() {
  const slug = PAGE_TO_SLUG[getPage()];
  if (slug != null) {
    history.replaceState(history.state, "", "/" + slug);
  }
}

const observer = new MutationObserver(function () {
  if (redirected) return;
  const nav = document.querySelector(".notion-topbar");
  const mobileNav = document.querySelector(".notion-topbar-mobile");
  if (
    (nav && nav.firstChild && nav.firstChild.firstChild) ||
    (mobileNav && mobileNav.firstChild)
  ) {
    redirected = true;
    updateSlug();
    createDropdown(nav ? "web" : "mobile");
    const onpopstate = window.onpopstate;
    window.onpopstate = function () {
      if (slugs.includes(getSlug())) {
        const page = SLUG_TO_PAGE[getSlug()];
        if (page) {
          history.replaceState(history.state, "bypass", "/" + page);
        }
      }
      onpopstate.apply(this, [].slice.call(arguments));
      updateSlug();
    };
  }
});

observer.observe(document.querySelector("#notion-app"), {
  childList: true,
  subtree: true,
});

const replaceState = window.history.replaceState;
window.history.replaceState = function (state) {
  if (arguments[1] !== "bypass" && slugs.includes(getSlug())) return;
  return replaceState.apply(window.history, arguments);
};

const pushState = window.history.pushState;
window.history.pushState = function (state) {
  const dest = new URL(location.protocol + location.host + arguments[2]);
  const id = dest.pathname.slice(-32);
  if (pages.includes(id)) {
    arguments[2] = "/" + PAGE_TO_SLUG[id];
  }
  return pushState.apply(window.history, arguments);
};

const open = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function () {
  arguments[1] = arguments[1].replace(SETTINGS.DOMAIN, "www.notion.so");
  return open.apply(this, [].slice.call(arguments));
};

/** ---------- Theme Control ---------- */
