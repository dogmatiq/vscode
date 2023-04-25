import { commands, ExtensionContext } from "vscode";
import { LanguageClient, TransportKind } from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("dogma.restartLanguageServer", async () => {
      if (client) {
        return client.restart();
      }
    })
  );

  client = new LanguageClient(
    "dogmatiq/dogma",
    "Dogma Language Server",
    {
      command:
        "/Users/james/grit/github.com/dogmatiq/dogmacli/artifacts/build/debug/darwin/arm64/dogma",
      args: ["lsp"],
      transport: TransportKind.stdio,
    },
    {
      documentSelector: [
        {
          scheme: "file",
          language: "go",
        },
      ],
    }
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (client) {
    return client.stop();
  }
}
