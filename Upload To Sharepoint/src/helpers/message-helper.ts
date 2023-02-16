/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document */

export function showMessage(text: string) {
  (document.getElementById("message-area") as any).style.display = "flex";
  (document.getElementById("message-area") as any).innerText = text;
}

export function clearMessage() {
  (document.getElementById("message-area") as any).style.display = "flex";
  (document.getElementById("message-area") as any).innerText = "---<br>";
}

export function hideMessage() {
  (document.getElementById("message-area") as any).style.display = "none";
  (document.getElementById("message-area") as any).innerText = "---<br>";
}
