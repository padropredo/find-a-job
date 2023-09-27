import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateOfferModal from './CreateOfferModal';
import JobOfferCard from './JobOfferCard';
import JobOfferFilter from '../../Shared/JobOfferFilter';
import JobOfferPagination from '../../Shared/JobOfferPagination';
import { useNavigate } from 'react-router-dom';

const CompanyPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobOffers, setjobOffers] = useState([]);
  const [params, setParams] = useState({ page: 1, size: 10 })
  const [fetch, setFetch] = useState(true)
  const [accountId, setAccountId] = useState(JSON.parse(localStorage.getItem('account')).id)
  console.log(accountId)
  const navigate = useNavigate();

  const handleCloseModal = () => setShowCreateModal(false);
  const handleShowModal = () => setShowCreateModal(true);
  const handleParams = (newParams) => {
    setParams(newParams);
    setFetch(true);
  }
  const handlePage = (page) => {
    let aux = { ...params }
    aux.page = page;
    setParams(aux);
    setFetch(true)
  }
  const handleSize = (size) => {
    let aux = { ...params }
    aux.size = size;
    setParams(aux);
    setFetch(true)
  }
  const handleFetch = () => { setFetch(true) }

  const listJobOffers = async () => {
    try {
      const data = await axios.get(process.env.REACT_APP_API_URL+'/joboffer', { params: {...params, accountId} })
      setjobOffers(data?.data);
    } catch (err) {
      console.log(err);
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    if (fetch === true)
      listJobOffers();
    setFetch(false)
  }, [fetch]);

  return (
    <div className="app">
      <h1>Company Page</h1>
      <Button onClick={handleShowModal} className='buttons'>Create new Job Offer</Button>
      <JobOfferFilter className='filters' handleNewParams={handleParams} size={params.size} changeSize={handleSize} />
      {
        jobOffers?.length > 0
          ? (
            <div className='list'>
              {jobOffers.map((joboffer) => (
                <JobOfferCard jobOffer={joboffer} fetch={handleFetch} />
              ))}
            </div>
          ) :
          (
            <div className='empty'>
              <h2>No offer found</h2>
            </div>
          )
      }
      <JobOfferPagination currentPage={params.page} changePage={handlePage} />
      <CreateOfferModal show={showCreateModal} handleClose={handleCloseModal} fetch={handleFetch} />
      <Button variant='danger' onClick={() => logout()}>Logout</Button>
    </div>
  )
}

export default CompanyPage;