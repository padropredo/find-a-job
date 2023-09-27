import { useState, useEffect } from 'react';
import JobOfferFilter from '../../Shared/JobOfferFilter';
import axios from 'axios';
import JobOfferCard from './JobOfferCard';
import JobOfferPagination from '../../Shared/JobOfferPagination'
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CandidatePage = () => {
  const [jobOffers, setjobOffers] = useState([]);
  const [params, setParams] = useState({ page: 1, size: 10 });
  const [fetch, setFetch] = useState(true)
  const [profile, serProfile] = useState(JSON.parse(localStorage.getItem('candidateprofile')))
  const navigate = useNavigate();


  const logout = () => {
    localStorage.clear();
    navigate('/');
  }
  const listJobOffers = async () => {
    try {
      const data = await axios.get(process.env.REACT_APP_API_URL+'/joboffer', { params })
      setjobOffers(data?.data);
    } catch (err) {
      console.log(err);
    }
  }

  const listProfile = async () => {
    try {
      const data = await axios.get(process.env.REACT_APP_API_URL+'/candidateprofile', {
        params: {
          id: profile.id,
          size: 500,
          page: 1
        }
      })
      serProfile(data?.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleFetch = () => { setFetch(true) }

  const handlePage = (page) => {
    let aux = { ...params }
    aux.page = page;
    setParams(aux);
    setFetch(true)
  }

  const handleParams = (newParams) => {
    setParams(newParams);
    setFetch(true);
  }

  const handleSize = (size) => {
    let aux = { ...params }
    aux.size = size;
    setParams(aux);
    setFetch(true);
  };

  useEffect(() => {
    if (fetch === true)
      listJobOffers();
    listProfile();
    setFetch(false)
  }, [fetch]);

  return (
    <div className="app">
      <h1>Candidate Page</h1>
      <ProfileCard profile={profile} fetch={handleFetch}/>
      <JobOfferFilter className='filters' handleNewParams={handleParams} size={params.size} changeSize={handleSize} />
      {
        jobOffers?.length > 0
          ? (
            <div className='list'>
              {jobOffers.map((joboffer) => (
                <JobOfferCard jobOffer={joboffer} fetch={handleFetch} profileId={profile.id} />
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
      <Button variant='danger' onClick={() => logout()}>Logout</Button>
    </div>
  )
}

export default CandidatePage;