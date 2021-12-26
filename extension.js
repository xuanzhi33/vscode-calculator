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
		

		// Ask user to input a math expression
		vscode.window.showInputBox({
			placeHolder: 'Please input a math expression',
			ignoreFocusOut: true,
			value: editor.document.getText(editor.selection)
		}).then(function (input) {
			if (input) {
				// calculate the result
				let result = eval(input);
				// show the result
				vscode.window.showInformationMessage("The result is "+result.toString());
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
