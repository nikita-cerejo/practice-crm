import { useRouter } from "next/router";

const UserDetailPage = () => {
  const router = useRouter();
  const user_id = router.query.user_id;
  return <h1>{user_id} User Detail Page</h1>;
};

export default UserDetailPage;
