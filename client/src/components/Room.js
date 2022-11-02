import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Winner(props) {
    const [roomCodeInput, setRoomCodeInput] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = () => {
        props.onHide();
        props.setRoomCode(roomCodeInput);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className='text-center'>
                <h1>Enter room code</h1>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="number"
                        placeholder="eg: 1212"
                        onChange={(e) => setRoomCodeInput(e.target.value)}
                            />
                </Form.Group>
                <Button variant="warning" onClick={handleSubmit}>
                    Play
                </Button>
            </Modal.Body>


        </Modal>
    );
}

export default Winner;