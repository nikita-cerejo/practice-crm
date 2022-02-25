import { useEffect, useState } from "react";
import Login from "../auth/login";
import Header from "./header";
import Sidebar from "./sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";
import Overlay from "./overlay";
import ProjectContext from "../../store/project-context";
import { useContext } from "react";
import { getSession, useSession } from "next-auth/react";

const Layout = (props) => {
  const [toggle, setToggle] = useState(true);
  const { loading, isLoggedIn, setIsLoggedIn } = useContext(ProjectContext);
  const { data: session, status } = useSession();
  // console.log(session);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session, setIsLoggedIn]);

  const toggleSidebarHandler = () => {
    setToggle((prevState) => {
      return !prevState;
    });
  };

  if (isLoggedIn && status === "authenticated") {
    return (
      <Overlay show={loading} text="Processing...">
        <div id="wrapper" className={!toggle ? "toggled" : ""}>
          <Sidebar />
          <Header toggleSidebar={toggleSidebarHandler} />
          <ToastContainer />
          <section id="content-wrapper">{props.children}</section>
          <Footer />
        </div>
      </Overlay>
    );
  } else {
    return (
      <>
        <Login />
        <Footer fixed={true} />
      </>
    );
  }
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log("session");
  // console.log(session);
  return {
    props: {
      session: session,
    },
  };
}
export default Layout;
