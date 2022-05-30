import { useState } from 'react';

import { withSnackbar } from '../util/Snackbar'

import { Modal, Button, Form } from 'react-bootstrap';

const TermsOfUse = ({ snackbarShowMessage, acceptTerm, termAccepted }) => {

    const [show, setShow] = useState(false);
    const [openOnce, setOpenOnce] = useState(false);

    const handleOpen = () => {

        const newValue = !show

        if (newValue) {
            setTimeout(() => {
                if (newValue)
                    setOpenOnce(true)
            }, 2000)
        }


        setShow(newValue)
    }

    const accept = () => {

        if (openOnce) {
            acceptTerm(!termAccepted)
            setShow(false)
        }
        else
            snackbarShowMessage("Leia o termo antes de aceitar.", "error")

    }

    return (
        <>
            {
                show &&
                <Modal show={show} onHide={handleOpen} >
                    <Modal.Header closeButton>
                        <Modal.Title>Termos de uso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Termos de uso</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleOpen}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={accept}>
                            Li e aceito os termos de uso
                        </Button>
                    </Modal.Footer>
                </Modal >
            }
            <Form.Check type="checkbox" id={`check-api`}>
                <Form.Check.Input checked={termAccepted} onChange={accept} type="checkbox" />
                <Form.Check.Label>
                    <span>
                        Confesso que li e aceito os
                    </span>

                </Form.Check.Label>

                <span className="cursor-pointer mx-1 text-primary" onClick={handleOpen}>
                    termos de uso.
                </span>

            </Form.Check>
        </>
    );
}


export default withSnackbar(TermsOfUse)