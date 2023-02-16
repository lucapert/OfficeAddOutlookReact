import * as https from "https";
import { ClientSecretCredential } from "@azure/identity";

async function _getAppToken(){
  let token = null;
  const clientId = "bd0711c7-d24f-4875-9c50-fb39bf392843"; //This is your client ID
  const clientSecret = "F5y8Q~f183HXsewrKkV4He6McMjlNatrKM8CtddT";
  const tenantId = "7e5f4e90-c792-4b0d-9646-db99c9acea28";
  const credentials = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const scopes = ["bd0711c7-d24f-4875-9c50-fb39bf392843/.default"];
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
    const functionCode = "ECN48abCYP3MGfNpXA8NeBr3tOrjsi76BaftGp3VYh7gAzFut2Qzqw==";
    const options = {
      hostname: 'officeaddin-test.azurewebsites.net',
      path: '/api/HttpTrigger1?code=${functionCode}',
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