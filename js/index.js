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
