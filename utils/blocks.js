function createCustomButton(label, className) {
  let contentArea = document.querySelector(".notion-page-content");

  let notionContainer = generateNotionBlock();
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

function generateNotionBlock() {
  let notionContainer = document.createElement("div");
  notionContainer.className = "data-block-id";

  return notionContainer;
}
