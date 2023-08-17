import axios from "axios";
import MainNavigation from "../MainNav/MainNavigation";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callProtectedAPI } from "../../utils/callProtectedAPI";
const HomePage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } =
    useContext(AuthContext);
  console.log(user, isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  function callAPI() {
    axios
      .get("/api")
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err.message));
  }
  async function callSecAPI() {
    const data = await callProtectedAPI(
      getAccessTokenSilently,
      "GET",
      "/api/protected"
    );
    console.log(data);
  }

  return (
    <>
      <MainNavigation />
      <div>Home Page</div>
      <ul>
        <li>
          <button onClick={callAPI}>Call API</button>
        </li>
        <li>
          <button onClick={callSecAPI}>Call protected API</button>
        </li>
      </ul>
    </>
  );
};

export default HomePage;
