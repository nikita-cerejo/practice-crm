import { createContext, useState, useEffect } from "react";
import { getAllUsers, getUserById } from "../lib/api-util";

const UserContext = createContext({
  users: [], // { id, name, email, mobile, password, role, is_active }
  fetchUsers: () => {},
  fetchUserById: (user_id = null) => {},
  removeUser: (user_id) => {},
  isLoggedIn: true,
});

export function UserContextProvider(props) {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUsers() {
      const user_list = await getAllUsers();

      setUsers(user_list);
    }
    getUsers();
  }, []);

  async function fetchUsersHandler() {
    const user_list = await getAllUsers();
    setUsers(user_list);
  }

  async function fetchByIdHandler(user_id) {
    const user = await getUserById(user_id);
    return user;
  }

  const context = {
    users: users,
    fetchUsers: fetchUsersHandler,
    fetchUserById: fetchByIdHandler,
    isLoggedIn: true,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
