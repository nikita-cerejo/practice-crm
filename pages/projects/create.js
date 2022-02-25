import { Fragment } from "react";
import { Card } from "react-bootstrap";
import ProjectForm from "../../components/project/project-form";
import { initialValues } from "../../components/project/form-fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import BackBtn from "../../components/ui/back-btn";
import ProjectContext from "../../store/project-context";
import { useContext } from "react";

const CreateProjectPage = () => {
  const router = useRouter();
  const projectCtx = useContext(ProjectContext);

  const formSubmitHandler = (data) => {
    fetch(`${process.env.API_URL}/projects.json`, {
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
        toast.success(`Project ${data.name} created successfully!`);
        projectCtx.fetchProjects();
        router.push("/projects");
      });
  };

  return (
    <Fragment>
      <Card className="m-0">
        <Card.Title>
          <BackBtn />
          <h4 className="m-4 text-center">Create Project</h4>
        </Card.Title>
        <Card.Body>
          <ProjectForm
            initialValues={initialValues}
            formSubmitHandler={formSubmitHandler}
          ></ProjectForm>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default CreateProjectPage;
