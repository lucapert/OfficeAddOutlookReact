import { ClientSecretCredential } from "@azure/identity";
export default class TokenManager {
    
    public static  GetClientCredentialToken = async () => {
        debugger;
        let token = null;
        const clientId = "a1a23c1a-f36a-4014-b13c-a21d71197984"; //This is your client ID
        const clientSecret = "sbz8Q~gZ~be8Yxq4NKnESbSIfJHIh.dobp7kWa7Q";
        const tenantId = "2f3a1e69-c586-4a12-b883-4f582eb8322b";
        const credentials = new ClientSecretCredential(tenantId, clientId, clientSecret);
        const scopes = ["a1a23c1a-f36a-4014-b13c-a21d71197984/.default"];
        
        try
        {
            const result: any = await credentials.getToken(scopes);
            console.log("Token di accesso ottenuto: " + result.accessToken);
            token = result.accessToken;
        } catch(e)
        {
            console.log(e);
        }

        return token;
    }
}