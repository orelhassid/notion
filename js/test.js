// document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", (event) => {
  //the event occurred
  console.log("LAB MODE");
  const nav = document.querySelector(".notion-topbar");
  const topbar = document.querySelector(".notion-topbar").firstElementChild;
  const el = document.createElement("div");

  el.innerHTML = "THEME";
  topbar.appendChild(el);
  console.log("LAB MODE", { nav, topbar, el });
});
function init() {}
