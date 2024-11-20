const { ipcRenderer } = require("electron");
const code = document.querySelector("#code");
const output = document.querySelector("#output");
function clearCode() {
  code.value = "";
  output.innerText = "";
}

document.getElementById("homeButton").addEventListener("click", () => {
  ipcRenderer.send("navigate-home");
});
