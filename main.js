const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("src/index.html");
}

ipcMain.on("compile-code", async (event, { language, code }) => {
  try {
    const utf8Code = Buffer.from(code, "utf-8").toString();

    const response = await axios.post(
      "https://api.jdoodle.com/execute",
      {
        script: code,
        language: language,
        versionIndex: "0",
        clientId: "13364a56dd72ab853512c71eb1bb6c39",
        clientSecret:
          "b355f83a8140dc8ec39bd01149f13d091412b1d48f0a3815e603d29806831092",
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    event.sender.send("compile-result", response.data.output);
  } catch (error) {
    event.sender.send("compile-result", `Erro: ${error.message}`);
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
