// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('calculator.calculator', function () {

		// Get the text that user has selected
		let editor = vscode.window.activeTextEditor;
		
		let prefillText = "";
		if (editor) {
			let selection = editor.selection;
			prefillText = editor.document.getText(selection);
		}

		// Ask user to input a math expression
		vscode.window.showInputBox({
			placeHolder: 'Please input a math expression',
			ignoreFocusOut: true,
			value: prefillText
		}).then(function (input) {
			if (input) {
				// calculate the result
				let result = eval(input);
				// show the result in a notification with a copy button
				vscode.window.showInformationMessage(`The result is ${result}`, 'Copy').then(function (selection) {
					if (selection === 'Copy') {
						vscode.env.clipboard.writeText(result.toString());
					}
				});
			}
		}
		);


	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
