import Image from "react-bootstrap/Image";
import { Button, Col } from "react-bootstrap";
import classes from "./task-item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClock,
  faEdit,
  faFolder,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmModal from "../ui/confirm-modal";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const TaskItem = (props) => {
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
    router.push(`/tasks/${props.id}/edit`);
  };

  const onCompleteHandler = () => {
    fetch(`/api/tasks/${props.id}/complete`, {
      method: "PATCH",
    })
      .then((resp) => {
        if (200 != resp.status) {
          toast.error("Something went wrong. Please try again later");
        }
        return resp.json();
      })
      .then((response) => {
        if (!response) {
          toast.error("Something went wrong. Please try again later");
        } else {
          props.completeHandler(props.id);
          toast.success("Task Marked Complete Successfully");
        }
      });
  };

  const onDeleteHandler = () => {
    setShow(true);
  };

  const closeBtnHandler = () => {
    setShow(false);
  };

  const confirmBtnHandler = (id) => {
    // console.log(id);
    fetch(`/api/tasks/${id}/delete`, {
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
          toast.success("Task Deleted Successfully");
        }
      });
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Col key={props.id}>
        <div className="card my-3">
          <div className={`${classes["logo"]} row mx-0`}>
            <div className="col-md-12 mt-3">
              <h5>
                <FontAwesomeIcon className="mr-2" icon={faList} />
                {props.name}
              </h5>
              <div className={`${classes["text-ellipsis"]} text-muted`}>
                <FontAwesomeIcon className="mr-2" icon={faFolder} />
                {`(${props.project_name})`}
              </div>
              {props.due_date && (
                <div
                  className={
                    today < props.due_date
                      ? `text-muted`
                      : props.is_done
                      ? `text-success`
                      : `text-danger`
                  }
                >
                  <FontAwesomeIcon className="mr-2" icon={faClock} />
                  {`${props.due_date}`}
                </div>
              )}
              <div className={`${classes["text-ellipsis"]} text-muted`}>
                {props.description}
              </div>
              <div className={classes.actions}>
                {!props.is_done && (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={onCompleteHandler}
                    className="mr-2 mb-1"
                  >
                    <FontAwesomeIcon icon={faCheck} /> Mark as Complete
                  </Button>
                )}
                {user && user.role == "admin" && (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={onEditHandler}
                      className="mr-2 mb-1"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="mb-1"
                      onClick={onDeleteHandler}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Col>

      <ConfirmModal
        title="Delete Task"
        body="Do you really want delete this task?"
        show={show}
        handleClose={closeBtnHandler}
        handleConfirm={confirmBtnHandler}
        id={props.id}
      />
    </>
  );
};

export default TaskItem;
