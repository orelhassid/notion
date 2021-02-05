// Test
console.log("CREATED BY OREL HASSID");

// Store Variables
let contentArea = document.querySelector(".notion-page-content");

function createCustomButton(label, className) {
  let button = document.createElement("button");

  button.innerText = label;
  button.className = className;
  button.addEventListener("click", () => {
    window.location.href = "https://www.yoursite.com";
  });

  contentArea.append(newButton);
  return button;
}

createCustomButton("CLICK ON ME", "custom-button");

function setCustomIcons(iconUrl) {
  let shortcutIcon = document.querySelector("link[rel='shortcut icon']");
  let appleIcon = document.querySelector("link[rel='apple-touch-icon']");
  let metaTwitter = document.querySelector("meta[name='twitter:image']");
  let metaOg = document.querySelector("meta[property='og:image']");

  shortcutIcon.rel = iconUrl;
  appleIcon.rel = iconUrl;
  metaTwitter.name = iconUrl;
  metaOg.property = iconUrl;
}
setCustomIcons(
  "https://www.flaticon.com/svg/vstatic/svg/564/564419.svg?token=exp=1612527261~hmac=4715ce4d5a25326b53448f92071da4e5"
);
