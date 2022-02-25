import Image from "react-bootstrap/Image";
import { Button, Col } from "react-bootstrap";
import classes from "./project-item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmModal from "../ui/confirm-modal";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ProjectItem = (props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
    }
  }, [status, session]);

  const onEditHandler = () => {
    // console.log(props.id);
    router.push(`/projects/${props.id}/edit`);
  };
  const onDeleteHandler = () => {
    setShow(true);
  };

  const closeBtnHandler = () => {
    setShow(false);
  };

  const confirmBtnHandler = (id) => {
    // console.log(id);
    fetch(`/api/projects/${id}/delete`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (200 != resp.status) {
          setShow(false);
          toast.error("Something went wrong. Please try again later");
        }
        return resp.json();
      })
      .then((response) => {
        if (!response) {
          setShow(false);
          toast.error("Something went wrong. Please try again later");
        } else {
          props.deleteHandler(props.id);
          toast.success("Project Deleted Successfully");
        }
      });
  };

  return (
    <>
      <Col key={props.id}>
        <div className="card my-3">
          <div className="row mx-0">
            <Image
              alt={`${props.name} Logo`}
              className="card-img-left col-md-4 pl-0"
              width={40}
              height={120}
              src={props.logo ? props.logo : "/images/dair-logo.png"}
            />
            <div className="col-md-8 mt-3">
              <span>{props.name}</span>
              <div className={`${classes["text-ellipsis"]} text-muted`}>
                {props.description}
              </div>
              {user && user.role == "admin" && (
                <div className={classes.actions}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={onEditHandler}
                    className="mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={onDeleteHandler}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>

      <ConfirmModal
        title="Delete Project"
        body="Do you really want delete this project?"
        show={show}
        handleClose={closeBtnHandler}
        handleConfirm={confirmBtnHandler}
        id={props.id}
      />
    </>
  );
};

export default ProjectItem;
