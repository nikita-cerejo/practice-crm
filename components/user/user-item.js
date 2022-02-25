import { Button, Col } from "react-bootstrap";
import classes from "./user-item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEdit,
  faEnvelope,
  faPhoneAlt,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const UserItem = (props) => {
  const router = useRouter();
  const onEditHandler = () => {
    // console.log(props.id);
    router.push(`/users/${props.id}/edit`);
  };

  return (
    <>
      <Col key={props.id}>
        <div className="card my-3">
          <div className="row mx-0">
            <div className="col-md-11 m-3">
              <div>
                <FontAwesomeIcon className={`text-muted mr-1`} icon={faUser} />
                {props.name}
              </div>
              <div className={`text-muted`}>
                <FontAwesomeIcon icon={faEnvelope} /> {props.email}
              </div>
              {props.mobile && (
                <div className={`text-muted`}>
                  <FontAwesomeIcon icon={faPhoneAlt} /> {props.mobile}
                </div>
              )}
              {props.is_active && (
                <div className={`text-success`}>
                  <FontAwesomeIcon icon={faCheckCircle} /> Active
                </div>
              )}
              {!props.is_active && (
                <div className={`text-danger`}>
                  <FontAwesomeIcon icon={faTimesCircle} /> Deactive
                </div>
              )}
              <div className={classes.actions}>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onEditHandler}
                  className="mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default UserItem;
