import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { getUserData } from "./middle-tier-calls";
import { showMessage } from "./message-helper";
import GraphManager from "../managers/SPManager";

const clientId = "a1a23c1a-f36a-4014-b13c-a21d71197984"; //This is your client ID
const port = "3000";
const loginRequest = {
  scopes: ["https://peppedotnet.sharepoint.com/.default"]
};

const msalConfig = {
  auth: {
    clientId: clientId,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: `https://localhost:${ port }/fallbackauthdialog.html`,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

const publicClientApp = new PublicClientApplication(msalConfig);

let loginDialog = null;
let homeAccountId = null;
let callbackFunction = null;

export async function dialogFallback(callback) {
  debugger;
  // Attempt to acquire token silently if user is already signed in.
  if (homeAccountId !== null) {
    const result = await publicClientApp.acquireTokenSilent(loginRequest);
    if (result !== null && result.accessToken !== null) {
      const response = await getUserData(result.accessToken);
      callbackFunction(response);
    }
  } else {
    callbackFunction = callback;

    // We fall back to Dialog API for any error.
    const url = "/fallbackauthdialog.html";
    showLoginPopup(url);
  }
}
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
function showLoginPopup(url) {
  var fullUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + url;

  // height and width are percentages of the size of the parent Office application, e.g., PowerPoint, Excel, Word, etc.
  Office.context.ui.displayDialogAsync(fullUrl, { height: 60, width: 30 }, function (result) {
    console.log("Dialog has initialized. Wiring up events");
    loginDialog = result.value;
    loginDialog.addEventHandler(Office.EventType.DialogMessageReceived, processMessage);
  });
}
