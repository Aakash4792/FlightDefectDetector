import MainNavigation from "../MainNav/MainNavigation";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect } from "react";

import QueryList from "../QueryList/QueryList";
const History = () => {
  const { isAuthenticated, analysisSet } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const queries = analysisSet;

  return (
    <>
      <MainNavigation />
      <div>History</div>
      <div style={{ padding: "2rem" }}>
        <QueryList items={queries} />
      </div>
    </>
  );
};

export default History;