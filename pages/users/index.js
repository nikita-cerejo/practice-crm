import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
// import { getAllUsers } from "../../lib/api-util";
import Head from "next/head";
import UserList from "../../components/user/user-list";
import Image from "next/image";
import UserContext from "../../store/user-context";
import { useContext } from "react";

const UserListPage = (props) => {
  const router = useRouter();
  const userCtx = useContext(UserContext);

  const createBtnHandler = () => {
    router.push("/users/create");
  };

  const headContent = (
    <>
      <Head>
        <title>All Users</title>
      </Head>
      <div className="text-right mr-2 mt-2">
        <Button variant="primary" onClick={createBtnHandler}>
          Create User
        </Button>
      </div>
    </>
  );

  if (!userCtx.users) {
    return (
      <>
        {headContent}
        <div className="text-center text-muted">
          <h4>Loading...</h4>
        </div>
      </>
    );
  }

  if (0 == userCtx.users.length) {
    return (
      <>
        {headContent}
        <div className="text-center text-muted">
          <h4>No Users Available!</h4>
          <Image
            src="/images/no-data.jpg"
            width="350"
            height="350"
            alt="No Data"
          />
        </div>
      </>
    );
  }

  const content = (
    <>
      {headContent}
      <UserList users={userCtx.users} />
    </>
  );
  return content;
};

// export async function getServerSideProps() {
//   const allUsers = await getAllUsers();
//   return {
//     props: {
//       users: allUsers,
//     },
//   };
// }
export default UserListPage;
