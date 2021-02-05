// Test
console.log("CREATED BY OREL HASSID");

// Store Variables
let contentArea = document.querySelector(".notion-page-content");

function createCustomButton() {
  let button = document.createElement("button");

  button.innerText = "CLICK ON ME";
  button.addEventListener("click", () => {
    window.location.href = "www.yoursite.com";
  });

  contentArea.append(newButton);
  return button;
}
