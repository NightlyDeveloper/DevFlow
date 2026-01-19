const vscode = require('vscode');
const axios = require('axios');

let sessionStart = null;
let lastActivity = null;
let currentFile = null;
let currentProject = null;
let currentLanguage = null;
let idleTimer = null;

const IDLE_THRESHOLD = 5000;
const AUTH_TOKEN = 'YOUR_ACTUAL_TOKEN_HERE';

function activate(context) {
    console.log('DevFlow Tracker is running in the background...');

    let listener = vscode.workspace.onDidChangeTextDocument((event) => {
        handleActivity(event.document);
    });

    let switcher = vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            handleActivity(editor.document);
        }
    });

    context.subscriptions.push(listener, switcher);
}

function handleActivity(document) {
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
        saveSession();
    }, IDLE_THRESHOLD);
}

async function saveSession() {
    if (!sessionStart) return;

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
            headers: {
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk2ZDFiN2NmNjBiZGQ4YTA4ZjI0MWY5Iiwicm9sZSI6ImRldmVsb3BlciJ9LCJpYXQiOjE3Njg4MDIzOTAsImV4cCI6MTc2OTIzNDM5MH0.9l1Y1QeeYAH-qeA9c01azMHVmjJo9tvCQew8Wzzhpxk'
            },
            timeout: 5000
        });
        
        vscode.window.setStatusBarMessage(`DevFlow: Saved ${durationInSeconds}s`, 3000);
    } catch (err) {
        console.error("DevFlow Save Failed:", err.message);
    }

    sessionStart = null;
}

function deactivate() {
    if (sessionStart) {
        saveSession();
    }
}

module.exports = {
    activate,
    deactivate
}