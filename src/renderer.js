const { ipcRenderer } = require("electron");

function compileCode() {
  const language = document.getElementById("language").value;
  const code = document.getElementById("code").value;
  ipcRenderer.send("compile-code", { language, code });
}

ipcRenderer.on("compile-result", (event, result) => {
  document.getElementById("output").innerText = result;
});
