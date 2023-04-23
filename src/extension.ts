import {
	workspace,
	ExtensionContext,
 } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	TransportKind,
 } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	client = new LanguageClient(
		'dogmatiq/dogma',
		'Dogma Language Server',
		{
			command: "dogma",
			args: ["lsp"],
		},
		{
			documentSelector: [
				{
					scheme: 'file',
					language: 'go',
				},
			],
		},
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}

	return client.stop();
}
