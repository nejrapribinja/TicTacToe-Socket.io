import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPlay, FaWifi } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    return (
        <Container fluid className="d-flex justify-content-center align-items-center text-center home" >
            <Row className="d-flex justify-content-center align-items-center text-center box">
            <h1 className='mb-5'>Tic Tac Toe</h1>
                <Col md={12} className="d-flex justify-content-center align-items-center ">  
                
                    <Button variant="warning" className='m-2' style={{ fontSize: "30px" }} onClick={() => navigate('/game')}>
                    Play as guest <FaPlay />
                    </Button>
                </Col>
                <Col md={12} className="d-flex justify-content-center align-items-center ">  
                    <Button variant="warning" className='m-2' style={{ fontSize: "30px" }} onClick={() => navigate('/login')}>
                        Play online  
                    </Button>
                </Col>
            </Row>
            
            
        </Container>
    );
}

export default Home;
