const dropdown = document.createElement("div");

dropdown.innerHTML =
  '<div class="dropdown-container"><button id="dropdown-button" class="dropdown-button"><span>Theme</span></button><ul class="dropdown-content" id="dropdown-content"><li id="dark">Dark</li><li id="light">Light</li><li id="pink">Pink</li></ul></div>';

function createDropdown(device) {
  const nav =
    device === "web"
      ? document.querySelector(".notion-topbar").firstChild
      : document.querySelector(".notion-topbar-mobile");
  nav.appendChild(dropdown);

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
  switch (id) {
    case "dark":
      onDark();
      break;
    case "light":
      onLight();
      break;
    case "pink":
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
