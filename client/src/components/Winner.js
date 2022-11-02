import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { CgMenuGridR } from 'react-icons/cg';
import { AiOutlineReload } from 'react-icons/ai';

function Winner(props) {
    const navigate = useNavigate();

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className='text-center'>
                <h1>{props.winner}</h1>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='outline-warning'
                    className='m-2 d-flex justify-content-center align-items-center'
                    style={{ fontSize: '25px' }}
                    onClick={() => navigate('/')}>
                    <CgMenuGridR />
                </Button>
                <Button variant='outline-warning'
                    className='m-2 d-flex justify-content-center align-items-center'
                    style={{ fontSize: '25px' }}
                    onClick={() => props.newGame()}>
                    <AiOutlineReload />
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default Winner;