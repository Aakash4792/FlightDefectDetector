import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
function MainNavigation() {
  const { logout } = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>Home</li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
