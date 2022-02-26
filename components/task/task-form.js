import { Fragment, useCallback, useEffect, useState } from "react";
import FormGenerate from "../form/form-generate";
import {
  //   initialValues,
  formFields,
  //   validationSchema,
} from "./form-fields";
import * as Yup from "yup";

const TaskForm = (props) => {
  const [formFieldsData, setFormFieldsData] = useState();
  const [validationSchema, setValidationSchema] = useState();
  const [initialValues, setInitialValues] = useState();

  const fetchForm = useCallback(async () => {
    let form_fields = await formFields();

    if (0 == form_fields.length) {
      return <h3>No fields</h3>;
    }

    let initValues = {};
    let schema = {};
    form_fields.forEach((data) => {
      schema[data.name] = data.validation;
      if (data.name == "project_id" && props.project_id) {
        initValues[data.name] = props.project_id;
      } else {
        initValues[data.name] = data.initValue ? data.initValue : "";
      }
    });

    setFormFieldsData(form_fields);
    setValidationSchema(Yup.object(schema));

    if (props.task) {
      setInitialValues(props.task);
    } else {
      setInitialValues(initValues);
    }
  }, [props.task, props.project_id]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  return (
    <Fragment>
      {formFieldsData && initialValues && (
        <FormGenerate
          classes="row mx-0"
          onSubmit={props.formSubmitHandler}
          initialValues={initialValues}
          inputFields={formFieldsData}
          validationSchema={validationSchema}
          btnName={props.btnName ? props.btnName : "+ Add"}
        ></FormGenerate>
      )}
    </Fragment>
  );
};

export default TaskForm;
