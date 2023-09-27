import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
const CreateOfferModal = ({ show, handleClose, jobOffer, fetch }) => {
  const [updateOffer, setUpdateOffer] = useState(false);
  const [type, setType] = useState(jobOffer.type);
  const [status, setStatus] = useState(jobOffer.status);
  const [title, setTitle] = useState(jobOffer.title);
  const [description, setDescription] = useState(jobOffer.description);
  const [candidates, setCandidates] = useState([]);
  const [firstRenderDone, setFirstRenderDone] = useState(false);

  const removeOffer = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + '/joboffer', { params: { id: id } })
      fetch();
      handleClose();
    } catch (err) {
      console.log(err);
      alert('Could not remove offer');

    }
  }

  const updateJobOffer = async (type, status, title, description, id) => {
    try {
      await axios.put(process.env.REACT_APP_API_URL + '/joboffer/', {
        type,
        status,
        title,
        description
      },
        {
          params: { id: id }
        });
      fetch();
      setUpdateOffer(false);

    } catch (err) {
      console.log(err);
      alert('Could not update offer');

    }
  }

  const listAppliedCandidates = async (id) => {
    try {
      const rawData = await axios.get(process.env.REACT_APP_API_URL + '/jobapplication/',
        {
          params: { jobOfferId: id, size: 500, page: 1 }
        });
      const data = rawData?.data;
      const candidatesId = [];
      console.log(data)

      data.map((candidate) => {
        candidatesId.push(candidate.candidateprofile_id);
      })
      if (candidatesId.length > 0) {
        console.log(candidatesId)
        const candidatesData = await axios.get(process.env.REACT_APP_API_URL + '/candidateprofile/',
          {
            params: { id: candidatesId, size: 500, page: 1 }
          });

        console.log(candidatesData)
        setCandidates(candidatesData.data)
      }


    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setFirstRenderDone(true);
  }, []);

  useEffect(() => {
    if (firstRenderDone && show === true) {
      listAppliedCandidates(jobOffer.id)
    }
  }, [show]);

  return (

    <Modal show={show} onHide={handleClose} scrollable={true}>
      {
        updateOffer === true
          ? (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Update Job Offer</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control placeholder={"Job Offer Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Type</Form.Label>
                  <Form.Select value={type} onChange={(e) => setType(Number(e.target.value))}>
                    <option value={0}>CLT</option>
                    <option value={1}>PJ</option>
                    <option value={2}>Freelancer</option>
                  </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Form.Select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
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
                <Button variant="secondary" onClick={() => setUpdateOffer(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => updateJobOffer(type, status, title, description, jobOffer.id)}>
                  Update
                </Button>
              </Modal.Footer>
            </Form >
          ) :
          (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{jobOffer.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>Description:</div>
                <div>{jobOffer.description}</div>
                <hr class="solid"></hr>
                <div>Candidates:</div>
                {

                  candidates?.length > 0
                    ? (
                      <ListGroup numbered>
                        {candidates.map((candidate) => (
                          <ListGroup.Item>{candidate.name}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) :
                    (
                      <div>No candidates for this offer</div>
                    )
                }
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => removeOffer(jobOffer.id)}>
                  Remove Offer
                </Button>
                <Button variant="primary" onClick={() => setUpdateOffer(true)}>
                  Update Offer
                </Button>
              </Modal.Footer>
            </>
          )
      }
    </Modal>
  );
}

export default CreateOfferModal;