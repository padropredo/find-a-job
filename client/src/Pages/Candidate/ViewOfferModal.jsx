import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
const CreateOfferModal = ({ show, handleClose, jobOffer, fetch, profileId }) => {

  const setApply = async (id) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL+'/jobapplication/', {
        candidateProfileId: profileId,
        jobOfferId: id
      });
      
      alert('Application done');
      fetch(true);

    } catch (err) {
      console.log(err);
      alert('Could not applicate for this offer');

    }
  }

  return (

    <Modal show={show} onHide={handleClose} scrollable={true}>

      <Modal.Header closeButton>
        <Modal.Title>{jobOffer.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {jobOffer.description}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {
          jobOffer.status === 0
            ? (

              <Button variant="primary" onClick={() => setApply(jobOffer.id)}>
                Apply for this Job
              </Button>
            ) : 
             ( 
              <Button disabled variant="primary" onClick={() => setApply(jobOffer.id)}>
                Apply for this Job
              </Button>
             )
        }
      </Modal.Footer>


    </Modal>
  );
}

export default CreateOfferModal;