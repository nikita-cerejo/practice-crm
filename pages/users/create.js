import { Fragment } from "react";
import { Card } from "react-bootstrap";
import UserForm from "../../components/user/user-form";
import { initialValues } from "../../components/user/form-fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import BackBtn from "../../components/ui/back-btn";
import UserContext from "../../store/user-context";
import { useContext } from "react";

const CreateUserPage = () => {
  const router = useRouter();
  const userCtx = useContext(UserContext);

  const formSubmitHandler = (data) => {
    fetch("/api/users/store", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (200 <= resp.status || 400 > resp.status) {
          return resp.json();
        } else {
          toast.error("Something went wrong");
          throw "Something went wrong";
        }
      })
      .then((response) => {
        toast.success(`User ${data.name} created successfully!`);
        userCtx.fetchUsers();
        router.push("/users");
      });
  };

  return (
    <Fragment>
      <Card className="m-0">
        <Card.Title>
          <BackBtn />
          <h4 className="m-4 text-center">Create User</h4>
        </Card.Title>
        <Card.Body>
          <UserForm
            initialValues={initialValues}
            formSubmitHandler={formSubmitHandler}
          ></UserForm>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default CreateUserPage;
