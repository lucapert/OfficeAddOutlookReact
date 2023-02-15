import axios from 'axios';

export default class GraphManager {
  public getWebSite = async (authorization) => {
      if (!authorization) {
        let error = new Error("No Authorization header was found.");
        return Promise.reject(error);
      } else {  

      debugger;

      const headers = {
        "Authorization": `Bearer ${authorization}`,
        "Accept": "application/json;odata=verbose"
      };

      const response = await axios.get("https://peppedotnet.sharepoint.com/sites/bracco-intranet/_api/web", {
        headers: headers
      });

      const data = response.data;
      debugger;
      return data;
    }
  }
}