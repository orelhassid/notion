// Test
console.log("CREATED BY OREL HASSID");
window.addEventListener("DOMContentLoaded", (event) => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    function createCustomButton(label, className) {
      let contentArea = document.querySelector(".notion-page-content");

      let button = document.createElement("button");
      let span = document.createElement("span");

      button.appendChild(span).innerText = label;
      button.className = className;
      button.addEventListener("click", () => {
        window.location.href = "https://www.yoursite.com";
      });

      contentArea.append(button);
      return button;
    }

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

    function init() {
      createCustomButton("CLICK ON ME", "custom-button", document);
      setCustomIcons(
        "https://raw.githubusercontent.com/orelhassid/notion/b3768a3322588ba0bb1b913abae02d3e7a54b2bb/icons/logo.svg"
      );
    }

    setTimeout(init, 1000);
  }
});
