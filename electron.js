const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 550,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        frame: false,
        transparent: true,
    });

    mainWindow.loadFile("index.html");
});

// Handle window close event
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// IPC event handlers
ipcMain.on("minimize-window", () => mainWindow.minimize());
ipcMain.on("close-window", () => mainWindow.close());