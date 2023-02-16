import * as https from "https";
import { ClientSecretCredential } from "@azure/identity";

require("dotenv").config();

async function _getAppToken(){
  let token = null;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tenantId = process.env.TENANT_ID;
  const credentials = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const scopes = process.env.SCOPES.split(",");
  console.log(clientId);
  try {
    const result = await credentials.getToken(scopes);
    console.log("Token di accesso ottenuto: " + result.token);
    token = result.token;
  } catch (e) {
    console.log(e);
  }

  return token;
}

async function checkUserIsSharepointUser(req, res){
    const appToken = await _getAppToken();
    const functionCode = process.env.FUNCTION_CODE;
    const options = {
      hostname: 'officeaddin-test.azurewebsites.net',
      path: `/api/HttpTrigger1?code=${functionCode}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${appToken}`,
        "Content-Type": "application/json",
        "x-functions-key": `${functionCode}`,
    },
    };
    const userEmail = req.query["userEmail"];
    const data = {
      name: userEmail
    };
    
    const request = https.request(options, (response) => {
      console.log(`Status code: ${response.statusCode}`);
    
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });
    
      response.on('end', () => {
        // const json = JSON.parse(data);
        // console.log(json);
        res.status(200).send(data);
      });
    });
    
    request.on('error', (error) => {
      console.error(error);
      res.status(500).send(false);
    });
    
    request.write(JSON.stringify(data));
    request.end();
}

export { checkUserIsSharepointUser };