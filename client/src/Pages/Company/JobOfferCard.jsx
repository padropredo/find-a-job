import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ViewOfferModal from './ViewOfferModal';

const JobOfferCard = ({ jobOffer,fetch }) => {
  const [showAllInfoModal, setShowAllInfoModal] = useState(false);
  const handleCloseModal = () => setShowAllInfoModal(false);
  const handleShowModal = () => setShowAllInfoModal(true);
  return (
    <div>

      <Card className='joboffer' onClick={() => handleShowModal()}>
        <Card.Body>
          <Card.Title>{jobOffer.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {jobOffer.type === 0 ? "CLT" : jobOffer.type === 1 ? "PJ" : "Freelancer"}
          </Card.Subtitle>
          {
            jobOffer.status === 0
              ? (
                <div className='openOffer'>
                  Appliable
                </div>
              ) :
              (
                <div className='pausedOffer'>
                  Paused
                </div>
              )
          }
        </Card.Body>
      </Card>
      <ViewOfferModal show={showAllInfoModal} handleClose={handleCloseModal} jobOffer={jobOffer} fetch={fetch}/>
    </div>

  )
}

export default JobOfferCard;