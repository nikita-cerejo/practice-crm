import Layout from "../components/ui/layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectContextProvider } from "../store/project-context";
import { TaskContextProvider } from "../store/task-context";
import { UserContextProvider } from "../store/user-context";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <ProjectContextProvider>
          <TaskContextProvider>
            <Layout>
              <Head>
                <title>Trio CRM</title>
                <meta name="description" content="A Basic CRM Application" />
                <meta
                  name="viewport"
                  content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/images/favicon.ico" />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </TaskContextProvider>
        </ProjectContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default App;
