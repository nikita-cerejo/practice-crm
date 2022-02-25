import { Row } from "react-bootstrap";
import UserItem from "./user-item";

const UserList = (props) => {
  // console.log(props.users);
  const { users } = props;

  return (
    <>
      <Row xs={1} md={3} className="g-3 mt-2 mx-0">
        {users.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            mobile={user.mobile}
            role={user.role}
            is_active={user.is_active}
          />
        ))}
      </Row>
    </>
  );
};

export default UserList;
