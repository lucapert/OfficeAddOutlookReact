
import { dialogFallback } from "./fallbackauthdialog";

export async function getWebSite(callback) {
  try {
    dialogFallback(callback);
  } catch (exception) {
    debugger;
  }
}
