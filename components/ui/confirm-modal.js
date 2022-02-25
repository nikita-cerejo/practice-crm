import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmModal = (props) => {
  const handleConfirmBtn = () => {
    props.handleConfirm(props.id);
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title ?? "Delete Modal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmBtn}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
