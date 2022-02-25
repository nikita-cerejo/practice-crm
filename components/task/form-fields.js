import * as Yup from "yup";
import { getAllProjects } from "../../lib/api-util";

async function projects() {
  const projects = await getAllProjects();
  const projects_list = projects.map((project) => {
    return {
      text: project.name,
      value: project.id,
    };
  });
  return projects_list;
}

const project_ids = async () => {
  const projects = await projects();
  return projects.map((project) => {
    return project.value;
  });
};

export const formFields = async () => {
  const projects_list = await projects();
  const project_ids = Object.values(
    projects_list.map((project) => project.value)
  );

  return [
    {
      type: "text",
      label: "Name",
      required: true,
      name: "name",
      placeholder: "Enter Task Name",
      classes: "col-md-4",
      validation: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(100, "Maximum 100 characters")
        .required("Task Name is required")
        .matches(
          /^[a-z\d\-_\s.'()]+$/i,
          "Field cannot contain special characters"
        ),
    },
    {
      type: "textarea",
      label: "Description",
      required: false,
      name: "description",
      placeholder: "Enter Task Description",
      classes: "col-md-4",
      validation: Yup.string().ensure(),
    },
    {
      type: "date",
      label: "Due Date",
      required: true,
      name: "due_date",
      placeholder: "Select Due Date",
      classes: "col-md-4",
      initValue: new Date().toISOString().split("T")[0],
      validation: Yup.date()
        .required("Due date is required")
        .min(
          new Date().toISOString().split("T")[0],
          "Previous dates not allowed"
        ),
    },
    {
      type: "select",
      label: "Project",
      required: true,
      name: "project_id",
      placeholder: "Select Project",
      classes: "col-md-4",
      options: projects_list,
      validation: Yup.string()
        .required("Project field is required")
        .oneOf(project_ids, "Invalid Project"),
    },
  ];
};
