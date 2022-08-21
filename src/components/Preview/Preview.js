import {Button, Modal} from "react-bootstrap";
import styles from "./Preview.module.css"
import previewLogo from './ezgif-1-b092c8892b.gif'

const Preview = ({show, handleClose}) => {

    const Footer = () => {
      return(
          <div className={styles.FooterPreview}>
              <Button variant="outline-success"
                      size="lg"
                      onClick={handleClose}>
                  DONE
              </Button>
          </div>
      )
    }

    return (
        <Modal show={show}
               onHide={handleClose}
               animation={true}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
            {/*<Modal.Header closeButton>*/}
            {/*    <Modal.Title>Modal heading</Modal.Title>*/}
            {/*</Modal.Header>*/}
            <Modal.Body>
                <img className={styles.Preview} src={previewLogo} alt="Preview"/>
            </Modal.Body>
            <Modal.Footer as={Footer}>
                {/*<div className={styles.FooterPreview}>*/}
                {/*    <Button variant="secondary" onClick={handleClose}>*/}
                {/*        CLOSE*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </Modal.Footer>
        </Modal>
    )
}

export default Preview;