const { app, BrowserWindow, ipcMain } = require('electron')

let loginWindow = null;   //登录窗口

let chatWindow = null;  //聊天主窗口

function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (loginWindow) {
            if (loginWindow.isMinimized()) loginWindow.restore()
            loginWindow.focus()
        }
    })
}


function createWindow() {
    // 创建浏览器窗口
    loginWindow = new BrowserWindow({
        width: 450,
        height: 310,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载index.html文件
    loginWindow.loadURL('http://localhost:3000/#/login')

    const ipc = ipcMain;
    ipc.on('min', function () {
        loginWindow.minimize();
    });
    ipc.on('max', function () {
        loginWindow.maximize();
    });
    ipc.on("login", function () {
        loginWindow.minimize();
        cteateChatWindow();
    });
    ipc.on('closed', () => {
        loginWindow.close();
    })
}

function cteateChatWindow() {
    chatWindow = new BrowserWindow({
        width: 600,
        height: 800,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    chatWindow.loadURL('http://localhost:3000/#/chess')
}


makeSingleInstance();
//app主进程的事件和方法
app.on('ready', () => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (loginWindow === null) {
        createWindow();
    }
});
// app.whenReady().then(createWindow)


module.exports = loginWindow;