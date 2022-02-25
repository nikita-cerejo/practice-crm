import { Card } from "react-bootstrap";
import EditForm from "../../../components/user/edit-form";
import { initialValues } from "../../../components/user/form-fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import BackBtn from "../../../components/ui/back-btn";
import { getUserById } from "../../../lib/api-util";
import UserContext from "../../../store/user-context";
import ProjectContext from "../../../store/project-context";
import { useContext } from "react";

const EditUserPage = (props) => {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const projectCtx = useContext(ProjectContext);

  let initValues = initialValues;
  if (props.user) {
    initValues = props.user;
  }

  const formSubmitHandler = (data) => {
    projectCtx.setLoading(true);
    fetch(`${process.env.API_URL}/users/${router.query.user_id}.json`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then((resp) => {
        projectCtx.setLoading(false);
        if (200 < resp.status || 400 > resp.status) {
          return resp.json();
        } else {
          toast.error("Something went wrong");
          throw "Something went wrong";
        }
      })
      .then((response) => {
        // console.log(response.name);
        userCtx.fetchUsers();
        toast.success(`User ${data.name} updated successfully!`);
        router.push("/users");
      });
  };

  return (
    <Card className="m-0">
      <Card.Title>
        <BackBtn />
        <h4 className="m-4 text-center">Edit User</h4>
      </Card.Title>
      <Card.Body>
        <EditForm
          initialValues={initValues}
          formSubmitHandler={formSubmitHandler}
          btnName="Update"
        ></EditForm>
      </Card.Body>
    </Card>
  );
};

export async function getServerSideProps(context) {
  const { user_id } = context.query;
  const user = await getUserById(user_id);

  return {
    props: {
      user: user,
    },
  };
}
export default EditUserPage;
