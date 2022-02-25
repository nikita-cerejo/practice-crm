import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faHome,
  faUser,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import classes from "./sidebar.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
    }
  }, [status, session]);

  const activeLink = (url, pathname) => {
    const baseurl = url.split("/")[1];
    if (pathname === baseurl) {
      return "active";
    } else {
      return "";
    }
  };

  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <h2>
            <Link href="/">
              <a className={`d-flex row mx-3 ${classes["logo-div"]}`}>
                <div className={`px-1 ${classes["logo-img-div"]}`}>
                  <Image
                    className={classes.logo}
                    alt="Dair Icon"
                    src="/images/dair-icon.png"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="ml-1">
                  <b>T</b>rio CRM
                </div>
              </a>
            </Link>
          </h2>
        </div>
        <ul className="sidebar-nav">
          <li className={activeLink(router.pathname, "")}>
            <Link href="/">
              <a>
                <FontAwesomeIcon icon={faHome} />
                Home
              </a>
            </Link>
          </li>
          <li className={activeLink(router.pathname, "projects")}>
            <Link href="/projects">
              <a>
                <FontAwesomeIcon icon={faFolder} />
                Projects
              </a>
            </Link>
          </li>
          <li className={activeLink(router.pathname, "tasks")}>
            <Link href="/tasks">
              <a>
                <FontAwesomeIcon icon={faListCheck} />
                Tasks
              </a>
            </Link>
          </li>
          {user && user.role == "admin" && (
            <li className={activeLink(router.pathname, "users")}>
              <Link href="/users">
                <a>
                  <FontAwesomeIcon icon={faUser} />
                  Users
                </a>
              </Link>
            </li>
          )}
        </ul>
      </aside>
    </>
    //   <section id="content-wrapper">
    //     <div className="row">
    //       <div className="col-lg-12">
    //         <h2 className="content-title">Test</h2>
    //         <p>Lorem ipsum...</p>
    //       </div>
    //     </div>
    //   </section>
  );
};

export default Sidebar;
