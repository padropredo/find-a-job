import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ProfileCard = ({ profile, fetch }) => {
  const [showUpdateProfileModal, setshowUpdateProfileModal] = useState(false);
  const [name, setName] = useState(profile.name);
  const [experiences, setExperiences] = useState(profile.experiences);

  const handleCloseModal = () => setshowUpdateProfileModal(false);
  const handleShowModal = () => setshowUpdateProfileModal(true);

  const updateProfile = async (name, experiences, id) => {
    try {
      await axios.put(process.env.REACT_APP_API_URL+'/candidateprofile', { name, experiences }, { params: { id: id} });
      
      alert('Profile updated');
      fetch(true);
    } catch (err) {
      console.log(err);
      alert('Could not update profile');
    }
  }

  return (
    <div>
      <Card >
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>
            {profile.experiences}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShowModal()}>Edit Profile</Button>
        </Card.Body>
      </Card>

      <Modal show={showUpdateProfileModal} onHide={handleCloseModal} scrollable={true}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Update Candidate Progile</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder={"Candidate Name"} value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Experiences</Form.Label>
              <Form.Control placeholder="Job Experiences" value={experiences} onChange={(e) => setExperiences(e.target.value)} />
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleCloseModal()}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => updateProfile(name, experiences, profile.id)}>
              Update
            </Button>
          </Modal.Footer>
        </Form >
      </Modal>
    </div>
  )
}

export default ProfileCard;