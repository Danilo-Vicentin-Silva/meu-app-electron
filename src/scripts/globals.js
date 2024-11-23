const code = document.querySelector("#code")
const output = document.querySelector("#output")
const clearButton = document.querySelector("#clear-button")

clearButton.addEventListener("click", () => {
  code.value = ""
  output.innerText = ""
})

document.getElementById("homeButton").addEventListener("click", () => {
  ipcRenderer.send("navigate-home")
})
