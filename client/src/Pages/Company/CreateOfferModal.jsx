import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
const CreateOfferModal = ({ show, handleClose,fetch }) => {


  const [type, setType] = useState(0);
  const [status, setStatus] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const accountId = JSON.parse(localStorage.getItem('account')).id
  const createJobOffer = async (type, status, title, description) => {
    try{
      await axios.post(process.env.REACT_APP_API_URL+'/joboffer/'+accountId, {
        type,
        status,
        title,
        description
      })
    }catch(err){
      console.log(err);
      alert('Could not create job offer');

    }
    handleClose();
    setType(0);
    setStatus(0);
    setTitle('');
    setDescription('');
    fetch(true);
  }

  return (
    <Modal show={show} onHide={handleClose}>

      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Job Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Job Offer Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type</Form.Label>
            <Form.Select onChange={(e) => setType(Number(e.target.value))}>
              <option value={0}>CLT</option>
              <option value={1}>PJ</option>
              <option value={2}>Freelancer</option>
            </Form.Select>

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Form.Select onChange={(e) => setStatus(Number(e.target.value))}>
              <option value={0}>Open</option>
              <option value={1}>Paused</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Job Offer Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => createJobOffer(type, status, title, description)}>
            Create
          </Button>
        </Modal.Footer>
      </Form >
    </Modal>
  );
}

export default CreateOfferModal;