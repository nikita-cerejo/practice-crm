import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const BackBtn = (props) => {
  const router = useRouter();

  const back = () => {
    router.back();
  };

  const classes = props.className
    ? "mx-2 my-1 " + props.className
    : "mx-2 my-1 ";

  return (
    <div className={classes}>
      <Button variant="secondary" onClick={back} size="md">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Button>
    </div>
  );
};

export default BackBtn;
