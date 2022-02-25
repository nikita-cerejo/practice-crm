import { Fragment } from "react";
import FormGenerate from "../form/form-generate";
import { validationSchema, formFields } from "./form-fields";

const UserForm = (props) => {
  return (
    <Fragment>
      <FormGenerate
        classes="row mx-0"
        onSubmit={props.formSubmitHandler}
        initialValues={props.initialValues}
        inputFields={formFields}
        validationSchema={validationSchema}
        btnName={props.btnName ? props.btnName : "+ Add"}
      ></FormGenerate>
    </Fragment>
  );
};

export default UserForm;
