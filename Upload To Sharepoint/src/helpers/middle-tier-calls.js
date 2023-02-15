import { showMessage } from "./message-helper.js";
import * as $ from "jquery";

export async function checkUserIsSharepointUser(userEmail) {
  try {
    const response = await $.ajax({
      type: "GET",
      url: `/checkuserissharepointuser?userEmail=${userEmail}`,
    });
    return response;
  } catch (err) {
    showMessage(`Error from middle tier. \n${err.responseText || err.message}`);
    throw err;
  }
}
