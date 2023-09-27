import { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';

const JobOfferFilter = ({ handleNewParams, size, changeSize }) => {
  const [clt, setClt] = useState(false);
  const [pj, setPj] = useState(false);
  const [free, setFree] = useState(false);

  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  const configureParam = () => {
    let aux = { page: 1, size: size };
    let type = [];

    if (clt === true)
      type.push(0);
    if (pj === true)
      type.push(1);
    if (free === true)
      type.push(2);
    if (type.length > 0)
      aux.type = type;
    else
      delete aux.type;

    let status = [];
    if (open === true)
      status.push(0);
    if (paused === true)
      status.push(1);
    if (status.length > 0)
      aux.status = status;
    else
      delete aux.status;

    handleNewParams(aux)
  }

  
  const loadSize = (newSize) => {
    changeSize(newSize)
  }

  return (
    <div>
      <Form className='list'>
        <Dropdown autoClose="outside" className='buttons'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filter by Type
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setClt(!clt)}>
              <Form.Check // prettier-ignore
                type="checkbox"
                label="CLT"
                checked={clt}
                onChange={(e) => setClt(e.target.checked)}

              />
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => setPj(!pj)}>
              <Form.Check // prettier-ignore
                type="checkbox"
                label="PJ"
                checked={pj}
                onChange={(e) => setPj(e.target.checked)}
              />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFree(!free)}>
              <Form.Check // prettier-ignore
                type="checkbox"
                label="Freelancer"
                checked={free}
                onChange={(e) => setFree(e.target.checked)}

              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        

        <Dropdown autoClose="outside" className='buttons'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filter by Status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setOpen(!open)}>
              <Form.Check // prettier-ignore
                type="checkbox"
                label="Open"
                checked={open}
                onChange={(e) => setOpen(e.target.checked)}

              />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPaused(!paused)}>
              <Form.Check // prettier-ignore
                type="checkbox"
                label="Paused"
                checked={paused}
                onChange={(e) => setPaused(e.target.checked)}

              />
            </Dropdown.Item>
          </Dropdown.Menu>

          
        </Dropdown>

        <Dropdown className='buttons'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Items per page
          </Dropdown.Toggle>

          <Dropdown.Menu >
            <Dropdown.Item onClick={() => loadSize(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={() => loadSize(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => loadSize(20)}>20</Dropdown.Item>
            <Dropdown.Item onClick={() => loadSize(30)}>30</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

        <Button className='buttons' onClick={() => configureParam()}>Apply Filters</Button>
      </Form>
    </div>

  )
}

export default JobOfferFilter;