import { showMessage } from "./message-helper";
import GraphManager from "../managers/SPManager";

let loginDialog = null;
let callbackFunction = null;

async function processMessage(arg) {

  let messageFromDialog = JSON.parse(arg.message);

  try
  {
    if (messageFromDialog.status === "success") {
      loginDialog.close();
      const graph: GraphManager = new GraphManager();
      const webSite = await graph.getWebSite(messageFromDialog.result);
      callbackFunction(webSite);
    } else if (messageFromDialog.error === undefined && messageFromDialog.result.errorCode === undefined) {
      // Need to pick the user to use to auth
    } else {
      // Something went wrong with authentication or the authorization of the web application.
      loginDialog.close();
      if (messageFromDialog.error) {
        showMessage(JSON.stringify(messageFromDialog.error.toString()));
      } else if (messageFromDialog.result) {
        showMessage(JSON.stringify(messageFromDialog.result.errorMessage.toString()));
      }
    }
  } catch(e)
  {
    console.log(e);
  }
}

// Use the Office dialog API to open a pop-up and display the sign-in page for the identity provider.
async function showLoginPopup(url) {
  var fullUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + url;

  // height and width are percentages of the size of the parent Office application, e.g., PowerPoint, Excel, Word, etc.
  Office.context.ui.displayDialogAsync(fullUrl, { height: 60, width: 30 }, function (result) {
    console.log("Dialog has initialized. Wiring up events");
    loginDialog = result.value;
    loginDialog.addEventHandler(Office.EventType.DialogMessageReceived, processMessage);
  });
}
