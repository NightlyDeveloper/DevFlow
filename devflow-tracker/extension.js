const vscode = require('vscode');
const axios = require('axios');

let sessionStart = null;
let lastActivity = null;
let currentFile = null;
let currentProject = null;
let currentLanguage = null;
let idleTimer = null;

const IDLE_THRESHOLD = 5000; 

function activate(context) {
    console.log('DevFlow Tracker is active.');

    let loginCommand = vscode.commands.registerCommand('devflow-tracker.login', async () => {
        const token = await vscode.window.showInputBox({
            placeHolder: "Paste your DevFlow Token here...",
            prompt: "Copy the token from your Dashboard and paste it here."
        });

        if (token) {
            await context.secrets.store('devflow_token', token);
            vscode.window.showInformationMessage("✅ DevFlow: Login Successful!");
        }
    });

    let listener = vscode.workspace.onDidChangeTextDocument((event) => {
        handleActivity(event.document, context);
    });

    let switcher = vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            handleActivity(editor.document, context);
        }
    });

    context.subscriptions.push(loginCommand, listener, switcher);
}

function handleActivity(document, context) {
    if (document.uri.scheme !== 'file') return;

    const now = Date.now();
    currentFile = document.fileName;
    currentLanguage = document.languageId;
    
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    currentProject = workspaceFolder ? workspaceFolder.name : 'No Project';

    if (!sessionStart) {
        sessionStart = now;
    }

    lastActivity = now;

    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        saveSession(context); 
    }, IDLE_THRESHOLD);
}

async function saveSession(context) {
    if (!sessionStart) return;

    const token = await context.secrets.get('devflow_token');

    if (!token) {
        console.warn("⚠️ No token found. Run 'DevFlow: Login'");
        return;
    }

    const endTime = lastActivity;
    const durationInSeconds = Math.round((endTime - sessionStart) / 1000);

    if (durationInSeconds < 5) {
        sessionStart = null;
        return;
    }

    const payload = {
        project: currentProject,
        language: currentLanguage,
        fileName: currentFile,
        duration: durationInSeconds
    };

    try {
        await axios.post('http://127.0.0.1:5000/api/activity', payload, {
            headers: { 'x-auth-token': token },
            timeout: 5000
        });
        vscode.window.setStatusBarMessage(`DevFlow: Saved ${durationInSeconds}s`, 3000);
    } catch (err) {
        console.error("Upload Failed:", err.message);
    }

    sessionStart = null;
}

module.exports = {
    activate,
}