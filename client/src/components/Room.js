import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

function Room(props) {
    const [roomCode, setRoomCodeInput] = useState(null);
    const navigate = useNavigate();
    const socket = io.connect('http://localhost:5000');

    const handleSubmit = () => {
        props.onHide();
        props.setRoomCode(roomCode);
        
    };

    useEffect(() => {
        //console.log(roomCode);
        if (roomCode) {
            try {
                fetch("/game/joinRoom", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem("token")
                    },
                })
                socket.emit("joinRoom", roomCode);
            } catch (err) {
                console.error(err.message);
            }
        }
    }, [roomCode]);

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

export default Room;