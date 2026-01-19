const vscode = require('vscode');

let sessionStart = null;
let lastActivity = null;
let currentFile = null;
let currentProject = null;
let currentLanguage = null;

const IDLE_THRESHOLD = 5000; 
let idleTimer = null;

function activate(context) {
    console.log('DevFlow Tracker is active!');

    let listener = vscode.workspace.onDidChangeTextDocument((event) => {
        handleActivity(event.document);
    });

    let switcher = vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            handleActivity(editor.document);
        }
    });

	let forceSave = vscode.commands.registerCommand('devflow-tracker.forceSave', () => {
        console.log("💪 Manual Save Triggered!");
        vscode.window.showInformationMessage("Forcing DevFlow Save...");
        saveSession();
    });

    context.subscriptions.push(listener, switcher);
}

function handleActivity(document) {

    console.log("Evennt detected! ", document.fileName);
    
    if (document.uri.scheme !== 'file') return;

    const now = Date.now();
    
    currentFile = document.fileName;
    currentLanguage = document.languageId;
    
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    currentProject = workspaceFolder ? workspaceFolder.name : 'No Project';

    if (!sessionStart) {
        sessionStart = now;
        console.log(`🟢 Started coding in ${currentProject} (${currentLanguage})`);
    }

    lastActivity = now;

	console.log("Timer reset! Waiting 5s...	")

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

    console.log("💾 Saving Session:", payload);

    try {
        await fetch('http://localhost:5000/api/activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk2ZDFiN2NmNjBiZGQ4YTA4ZjI0MWY5Iiwicm9sZSI6ImRldmVsb3BlciJ9LCJpYXQiOjE3Njg4MDIzOTAsImV4cCI6MTc2OTIzNDM5MH0.9l1Y1QeeYAH-qeA9c01azMHVmjJo9tvCQew8Wzzhpxk' 
            },
            body: JSON.stringify(payload)
        });
        
        vscode.window.setStatusBarMessage(`DevFlow: Saved ${durationInSeconds}s of coding!`, 3000);
    } catch (err) {
        console.error("Failed to send activity:", err);
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