const { ipcRenderer } = require("electron")

function compileCode() {
  const language = document.getElementById("language").value
  const code = document.getElementById("code").value
  const result = document.getElementById("output")

  if (language === "< Selecione uma linguagem >") {
    result.innerText = "Selecione uma linguagem"
  } else if (code === "") {
    result.innerText = "Digite seu código"
  } else {
    ipcRenderer.send("compile-code", { language, code })
  }
}

ipcRenderer.on("compile-result", (event, result) => {
  document.getElementById("output").innerText = result
})
