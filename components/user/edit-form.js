import { Fragment } from "react";
import FormGenerate from "../form/form-generate";
import { validationSchema, formFields } from "./edit-form-fields";

const EditForm = (props) => {
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

export default EditForm;
