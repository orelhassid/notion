var para = document.createElement("p");
var node = document.createTextNode("This is new.🎈🎈🎈🎈🎈🎈");
const frame = document.getElementsByClassName("notion-frame")[0];

console.log("Index.js Hello!", frame);
para.appendChild(node);

function makeNavigation() {
  var container = document.createElement("div");
  container.className = "navigation-container";
  return container;
}
const navigation = makeNavigation();
frame.appendChild(navigation);
