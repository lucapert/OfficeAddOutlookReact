import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { showMessage } from "../helpers/message-helper";

const clientId = "bd0711c7-d24f-4875-9c50-fb39bf392843"; //This is your client ID
const accessScope = `api://${window.location.host}/${clientId}/access_as_user`;
const loginRequest = {
    scopes: [accessScope],
    extraScopesToConsent: ["user.read"],
};

const msalConfig = {
    auth: {
        clientId: clientId,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "https://localhost:3000/fallbackauthdialog.html",
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
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

Office.onReady(() => {
    if (Office.context.ui.messageParent) {
        publicClientApp
            .handleRedirectPromise()
            .then()
            .catch((error) => {
                console.log(error);
                Office.context.ui.messageParent(JSON.stringify({ status: "failure", result: error }));
            });
        if (localStorage.getItem("loggedIn") === "yes") {
            publicClientApp.acquireTokenRedirect(loginRequest);
        } else {
            publicClientApp.loginRedirect(loginRequest);
        }
    }
});

export function showLoginPopup(url) {
    var fullUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + url;
  
    Office.context.ui.displayDialogAsync(fullUrl, { height: 60, width: 30 }, function (result) {
      console.log("Dialog has initialized. Wiring up events");
      loginDialog = result.value;
      loginDialog.addEventHandler(Office.EventType.DialogMessageReceived, _processMessage);
    });
}

async function _processMessage(arg) {
    let messageFromDialog = JSON.parse(arg.message);
    try
    {
      if (messageFromDialog.status === "success") {
        loginDialog.close();
        console.log(messageFromDialog.result);
      } else if (messageFromDialog.error === undefined && messageFromDialog.result.errorCode === undefined) {
      } else {
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