import axios from "axios";
export async function callProtectedAPI(getAccessTokenSilently, method, route) {
  try {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: `MyExpressAPI`,
        scope: "openid profile email",
      },
    });
    console.log(token);
    console.log(`Bearer ${token}`);
    if (method === "GET") {
      const response = await axios.get(route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else if (method === "POST") {
    }
    console.log("invalid method call");
    return { error: "invalid method call" };
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}
