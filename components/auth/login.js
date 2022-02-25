import { useRouter } from "next/router";
import { useRef, useState } from "react";
import classes from "./login.module.css";
import { signIn, getCsrfToken } from "next-auth/react";
import ProjectContext from "../../store/project-context";
import { useContext } from "react";

const Login = ({ csrfToken }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [error, setError] = useState();
  const projectCtx = useContext(ProjectContext);

  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // authentication logic here
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result.error) {
      // set some auth state
      projectCtx.setIsLoggedIn(true);
      router.replace("/");
    } else {
      switch (JSON.parse(result.error).message) {
        case "INVALID_PASSWORD":
          setError("Invalid password!");
          break;

        case "INVALID_EMAIL":
          setError("Invalid Email!");
          break;

        case "EMAIL_NOT_FOUND":
          setError("Email not found!");
          break;

        default:
          setError("Something went wrong!");
          break;
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={error ? "text-danger" : "d-none"}>{error}</div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </section>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
