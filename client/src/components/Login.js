import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TbArrowBack } from 'react-icons/tb';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [log, setLog] = useState(true);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("/logIn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            const parse = await response.json();
            localStorage.setItem('token', parse.token)
            localStorage.setItem('isAuth', 'true')
            localStorage.setItem('user', parse.tokenInfo.t_email)
            navigate('/game')
        } catch (err) {
            console.error(err.message);
        }
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            await fetch("/signIn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            setUsername('');
            setPassword('');
            setLog(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (

        <Container fluid className="d-flex justify-content-center align-items-center text-center home" >
            <Row className="d-flex justify-content-center align-items-center text-center box">
                <h1 className='mb-5'>Tic Tac Toe</h1>
                {log ? <Col md={6} >
                    <Form className='mb-5' onSubmit={login}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                placeholder="Enter username"
                                name='username'
                                value={username}
                                onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password"
                                name='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="warning" type="submit">
                            Log in
                        </Button>
                    </Form>
                    <div>
                        <p>Don't have an account? <a className='link' href='#' onClick={() => { setLog(false)}}>Sign up</a></p>
                    </div>

                </Col> : <Col md={6} >
                    <Form className='mb-5' onSubmit={register}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text"
                                placeholder="Enter username"
                                name='username'
                                value={username}
                                onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password"
                                name='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="warning" type="submit">
                            Sign up
                        </Button>
                    </Form>
                    <div>
                        <p>Already have an account? <a className='link' href='#' onClick={() => setLog(true)}>Log in</a></p>
                    </div>
                </Col>}
                <Col md={12}>
                    <Button variant='outline-dark'
                        className='m-2 d-flex'
                        style={{ fontSize: '25px' }}
                        onClick={() => navigate('/')}>
                        <TbArrowBack />
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;