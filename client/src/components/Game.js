import React, { useState, useEffect } from 'react';
import { Col, Container, Button, Row } from "react-bootstrap";
import Winner from './Winner';
import Room from './Room';
import { CgMenuGridR } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { AiOutlineReload } from 'react-icons/ai';
import io from 'socket.io-client';

const Game = () => {
    const navigate = useNavigate()
    const [turn, setTurn] = useState(true)
    const [content, setContent] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [roomModalShow, setRoomModalShow] = useState(true);
    const [roomCode, setRoomCode] = useState(null);
    const [user, setUser] = useState(localStorage.getItem('user'))
    const token = localStorage.getItem('token');
    const socket = io.connect('http://localhost:5000', {
        query: { token }
    });

    useEffect(() => {
        created();
    })

    const created = () => {
        socket.on("play", (index, roomCode) => {
            console.log("Received index", index);
            draw(index, true);
        })
    }

    const draw = (index, drawFromOther) => {
        if (content[index] !== '') {
            alert('already clicked');
            return;
        }
        let squares = [...content];

        if (turn) {
            squares[index] = 'x';
        } else {
            squares[index] = 'o';
        }
        setTurn(!turn);

        if (!drawFromOther) {
            socket.emit('play', { index, roomCode });
        }

        isOver(squares);
        noWinner(squares);
        setContent(squares);
    }

    const isOver = (squares) => {
        let win_lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]];


        win_lines.forEach((pattern) => {
            if (squares[pattern[0]] === '' || squares[pattern[1]] === '' || squares[pattern[2]] === '') {
                // do nothing
            } else if (squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
                setModalShow(true);
                setWinner("Winner is " + squares[pattern[0]]);
            }
        });
    }

    const noWinner = (squares) => {
        let filled = true;
        squares.forEach((square) => {
            if (square == "") {
                filled = false;
            }
        })
        if (filled) {
            setModalShow(true);
            setWinner("No winner");
        }
    }

    const newGame = () => {
        window.location.reload();
    }

    useEffect(() => {
        console.log(roomCode);
        if (roomCode) {
            try {
                fetch("/game/joinRoom/" + roomCode, {
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
        <Container fluid className="d-flex justify-content-center align-items-center text-center home">
            <Row className="d-flex justify-content-center align-items-center text-center box2">
                <Col md={1}>
                    <Button variant='outline-dark'
                        className='m-2 d-flex'
                        style={{ fontSize: '25px' }}
                        onClick={() => navigate('/')}>
                        <CgMenuGridR />
                    </Button>
                    <Button variant='outline-dark'
                        className='m-2 d-flex'
                        style={{ fontSize: '25px' }}
                        onClick={newGame}>
                        <AiOutlineReload />
                    </Button>
                    <p>{user}</p>
                </Col>
                <Col md={11} className="d-flex justify-content-center align-items-center text-center">
                    <div class="play-area">
                        <div id="block_0" class="block" onClick={() => draw(0, false)}>{content[0]}</div>
                        <div id="block_1" class="block" onClick={() => draw(1, false)}>{content[1]}</div>
                        <div id="block_2" class="block" onClick={() => draw(2, false)}>{content[2]}</div>
                        <div id="block_3" class="block" onClick={() => draw(3, false)}>{content[3]}</div>
                        <div id="block_4" class="block" onClick={() => draw(4, false)}>{content[4]}</div>
                        <div id="block_5" class="block" onClick={() => draw(5, false)}>{content[5]}</div>
                        <div id="block_6" class="block" onClick={() => draw(6, false)}>{content[6]}</div>
                        <div id="block_7" class="block" onClick={() => draw(7, false)}>{content[7]}</div>
                        <div id="block_8" class="block" onClick={() => draw(8, false)}>{content[8]}</div>
                    </div>
                </Col>
                <Row className="d-flex justify-content-center align-items-center text-center">
                    <Col md={7} className="d-flex justify-content-center align-items-center text-center">
                        <h4 className={turn ? 'player' : ''}>Player x</h4>
                    </Col>
                    <Col md={5} className="d-flex justify-content-center align-items-center text-center">
                        <h4 className={!turn ? 'player' : ''}>Player o</h4>
                    </Col>
                </Row>

                <Winner
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    winner={winner}
                    newGame={newGame} />

                {user ? <Room show={roomModalShow}
                    onHide={() => setRoomModalShow(false)}
                    setRoomCode={setRoomCode} /> : ''}
            </Row>
        </Container>
    );
}

export default Game;