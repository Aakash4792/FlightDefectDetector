import React from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
} from "../NavbarElements/NavElements.js";

function MainNavigation() {
  const { logout } = useContext(AuthContext);
  return (
    // <header className={classes.header}>
    //   <nav>
    //     <ul className={classes.list}>
    //       <li>Home</li>
    //       <li>
    //         <button onClick={logout}>Logout</button>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/homepage">Home</NavLink>
          <NavLink to="/history">History</NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <button onClick={logout}>Logout</button>
        </NavBtn>
      </Nav>
    </>
  );
}

export default MainNavigation;
