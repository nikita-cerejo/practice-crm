import * as Yup from "yup";

export const formFields = [
  {
    type: "text",
    label: "Name",
    required: true,
    name: "name",
    placeholder: "Enter Name",
    classes: "col-md-4",
    validation: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(100, "Maximum 100 characters")
      .required("User Name is required")
      .matches(
        /^[a-z\d\-_\s.'()]+$/i,
        "Field cannot contain special characters"
      ),
  },
  {
    type: "text",
    label: "Email",
    required: true,
    disabled: true,
    name: "email",
    placeholder: "Enter registered email address",
    classes: "col-md-4",
    validation: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
  },
  {
    type: "text",
    label: "Mobile",
    required: false,
    name: "mobile",
    placeholder: "Enter mobile",
    classes: "col-md-4",
    validation: Yup.string().matches(/[6-9]{1}[0-9]{9}/, {
      message: "Invalid mobile",
    }),
  },
  {
    type: "select",
    label: "Role",
    required: true,
    name: "role",
    placeholder: "Select Role",
    classes: "col-md-4",
    options: [
      {
        text: "Admin",
        value: "admin",
      },
      {
        text: "Developer",
        value: "developer",
      },
    ],
    validation: Yup.string()
      .oneOf(["admin", "developer"], "Invalid Role")
      .required("Role field is required"),
  },
  {
    type: "checkbox",
    label: "Activate",
    name: "is_active",
    classes: "form-check",
    id: "is_active",
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
