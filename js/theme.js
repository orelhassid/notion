// const lightThemeButton = document.querySelector("#light");
// const darkThemeButton = document.querySelector("#dark");

// darkThemeButton.addEventListener("click", setDarkTheme);

function addJS() {
  let scriptToAdd = document.createElement("script");
  scriptToAdd.type = "text/javascript";

  // Create contents of the script
  let inlineScript = document.createTextNode(
    "__console.environment.ThemeStore.setState({ mode: 'dark' });"
  );

  scriptToAdd.appendChild(inlineScript);

  // Uncomment to load script from another
  // source
  // scriptToAdd.src = 'myscript.js';

  // Get the head element of the document
  // and append the script
  document.head.appendChild(scriptToAdd);

  // Update textarea
  updateHeadOutput();
}

function updateHeadOutput() {
  document.querySelector(".head-element").textContent = document.head.innerHTML;
}

addJS();
updateHeadOutput();
