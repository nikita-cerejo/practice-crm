import Link from "next/link";
import classes from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import { Button } from "react-bootstrap";
import ProjectContext from "../../store/project-context";
import { useContext } from "react";
import { useSession } from "next-auth/react";

const Header = (props) => {
  const projectCtx = useContext(ProjectContext);
  const isLoggedIn = projectCtx.isLoggedIn;
  const { data: session, status } = useSession();

  return (
    <header className={classes["main-nav-header"]}>
      <a
        href="#"
        onClick={props.toggleSidebar}
        className="navbar-brand"
        id="sidebar-toggle"
      >
        <FontAwesomeIcon icon={faBars} />
      </a>
      <nav className="d-flex">
        {isLoggedIn && status === "authenticated" && (
          <div className="d-block mt-2">Hi, {session.user.name}</div>
        )}
        <ul>
          {!isLoggedIn && (
            <li>
              <Link href="/">
                <a>
                  Login
                  <FontAwesomeIcon className="ml-2" icon={faRightToBracket} />
                </a>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Button
                onClick={() => {
                  signOut({ redirect: false, callbackUrl: "/" });
                  projectCtx.setIsLoggedIn(false);
                }}
                variant="outline-light"
              >
                Logout
                <FontAwesomeIcon className="ml-2" icon={faRightFromBracket} />
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
