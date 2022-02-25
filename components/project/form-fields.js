import * as Yup from "yup";

export const formFields = [
  {
    type: "text",
    label: "Name",
    required: true,
    name: "name",
    placeholder: "Enter Project Name",
    classes: "col-md-4",
    validation: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(100, "Maximum 100 characters")
      .required("Project Name is required")
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
    placeholder: "Enter Project Description",
    classes: "col-md-4",
    validation: Yup.string().ensure(),
  },
  {
    type: "file",
    label: "Logo",
    required: false,
    name: "logo",
    accept: "image/*",
    placeholder: "Choose Logo",
    classes: "col-md-4",
    validation: null,
  },
];

let initValues = {};
let schema = {};

formFields.forEach((data) => {
  initValues[data.name] = data.initValue ? data.initValue : "";
  schema[data.name] = data.validation;
});

export const validationSchema = Yup.object(schema);
export const initialValues = initValues;
