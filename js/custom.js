// Test
console.log("CREATED BY OREL HASSID");
window.addEventListener("DOMContentLoaded", (event) => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    console.log("document.readyState", document.readyState);
    console.log("DOM fully loaded and parsed", event);

    const root = event.path[0]; // Set the document

    function createCustomButton(label, className, rootParam) {
      //   let contentArea = root.body.querySelector(".notion-page-content");
      let body = root.body;
      let demo = document.getElementById("notion-app");
      let contentArea = document.getElementsByClassName(
        "notion-page-content"
      )[0];

      console.log("contentArea", {
        event,
        root,
        document,
        rootParam,
        contentArea,
        body,
        demo,
      });
      let button = root.createElement("button");

      button.innerText = label;
      button.className = className;
      button.addEventListener("click", () => {
        window.location.href = "https://www.yoursite.com";
      });

      contentArea.append(button);
      return button;
    }

    function setCustomIcons(iconUrl) {
      let shortcutIcon = root.querySelector("link[rel='shortcut icon']");
      let appleIcon = root.querySelector("link[rel='apple-touch-icon']");
      let metaTwitter = root.querySelector("meta[name='twitter:image']");
      let metaOg = root.querySelector("meta[property='og:image']");

      shortcutIcon.rel = iconUrl;
      appleIcon.rel = iconUrl;
      metaTwitter.name = iconUrl;
      metaOg.property = iconUrl;
    }

    function init() {
      createCustomButton("CLICK ON ME", "custom-button", root);
      setCustomIcons(
        "https://www.flaticon.com/svg/vstatic/svg/564/564419.svg?token=exp=1612527261~hmac=4715ce4d5a25326b53448f92071da4e5"
      );
    }

    setTimeout(init, 500);
  }
});
