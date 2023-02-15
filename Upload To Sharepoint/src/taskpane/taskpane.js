import { checkUserIsSharepointUser } from "../helpers/middle-tier-calls";

/* eslint-disable no-undef */
Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("getProfileButton").onclick = run;
  }
});

export async function run() {
  debugger;
  const result = await checkUserIsSharepointUser(Office?.context?.mailbox?.userProfile?.emailAddress);
}
