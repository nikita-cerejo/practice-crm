import { Card } from "react-bootstrap";
import ProjectForm from "../../../components/project/project-form";
import { initialValues } from "../../../components/project/form-fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import BackBtn from "../../../components/ui/back-btn";
import { getProjectById } from "../../../lib/api-util";
import ProjectContext from "../../../store/project-context";
import { useContext } from "react";

const EditProjectPage = (props) => {
  const router = useRouter();
  const projectCtx = useContext(ProjectContext);

  let initValues = initialValues;
  if (props.project) {
    initValues = props.project;
  }

  const formSubmitHandler = (data) => {
    projectCtx.setLoading(true);
    fetch(`${process.env.API_URL}/projects/${router.query.project_id}.json`, {
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
        projectCtx.fetchProjects();
        toast.success(`Project ${data.name} updated successfully!`);
        router.push("/projects");
      });
  };

  return (
    <Card className="m-0">
      <Card.Title>
        <BackBtn />
        <h4 className="m-4 text-center">Edit Project</h4>
      </Card.Title>
      <Card.Body>
        <ProjectForm
          initialValues={initValues}
          formSubmitHandler={formSubmitHandler}
          btnName="Update"
        ></ProjectForm>
      </Card.Body>
    </Card>
  );
};

export async function getServerSideProps(context) {
  const { project_id } = context.query;
  const project = await getProjectById(project_id);

  return {
    props: {
      project: project,
    },
  };
}
export default EditProjectPage;
