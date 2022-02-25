import { useFormik } from "formik";
import React from "react";
import { Button, Form, Image } from "react-bootstrap";

const FormGenerate = ({
  form_classes = "",
  classes,
  initialValues,
  inputFields = [],
  validationSchema,
  onSubmit,
  btnName,
  extras = "",
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (e, { resetForm }) => {
      console.log(e);
      onSubmit(e);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={form_classes}>
      <div className={classes}>
        {inputFields.map((field) => {
          return (
            <div
              className={field.classes + " form-group mb-3"}
              key={field.name}
            >
              {/* Label */}
              {!["checkbox", "hidden"].includes(field.type) && (
                <Form.Label className="form-label text-uppercase">
                  <b>
                    {field.label}{" "}
                    {field.required && <span className="text-danger">*</span>}
                  </b>
                </Form.Label>
              )}

              {/* Type Text or Number */}
              {["text", "number", "password"].includes(field.type) && (
                <Form.Control
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                  autoComplete="off"
                  disabled={field.disabled ?? false}
                />
              )}

              {"date" === field.type && (
                <Form.Control
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder ?? "Select Date"}
                  onChange={formik.handleChange}
                  value={formik.values[field.name]}
                  disabled={field.disabled ?? false}
                />
              )}

              {/* Type Hidden */}
              {/* {"hidden" === field.type && (
              <Form.Control
                type={field.type}
                name={field.name}
                value={
                  "admin_local_id" === field.name
                    ? user.localId
                    : formik.values[field.name]
                }
              />
            )} */}

              {/* Type Checkbox */}
              {"checkbox" === field.type && (
                <>
                  <Form.Group className="" controlId={field.id}>
                    <Form.Check
                      type={field.type}
                      name={field.name}
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                      label={field.label}
                    />
                  </Form.Group>
                  {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type={field.type}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    id={field.id}
                  ></input>
                  <label htmlFor={field.id} className="form-check-label">
                    {field.label}
                  </label>
                </div> */}
                </>
              )}

              {/* Type Textarea */}
              {"textarea" === field.type && (
                <Form.Control
                  as={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                  autoComplete="off"
                  rows={field.rows ?? 2}
                />
              )}

              {/* Type Select */}
              {"select" === field.type && (
                <Form.Select
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option>{field.placeholder}</option>
                  {field.options.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    );
                  })}
                </Form.Select>
              )}

              {/* Type File */}
              {"file" === field.type && (
                <>
                  <Form.Control
                    name={field.name}
                    placeholder={field.placeholder}
                    accept={field.accept}
                    type={field.type}
                    onChange={(e) => {
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          formik.values[field.name] = fileReader.result;
                        }
                      };
                      fileReader.readAsDataURL(e.target.files[0]);
                    }}
                  />
                  {"image/*" === field.accept && formik.values[field.name] && (
                    <Image
                      alt=""
                      height="50"
                      src={formik.values[field.name]}
                      className="mx-1 mb-1"
                    />
                  )}
                </>
              )}

              {/* Errors Displaying */}
              {formik.errors[field.name] &&
                formik.touched[field.name] &&
                formik.errors[field.name] && (
                  <div className="text-danger">{formik.errors[field.name]}</div>
                )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        {extras}
        <Button type="submit" className="my-1" variant="success">
          {btnName}
        </Button>
      </div>
    </form>
  );
};

export default React.memo(FormGenerate);
