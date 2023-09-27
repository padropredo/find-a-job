import { Button, Form, Card } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {

  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(0);
  const [name, setName] = useState(''); 
  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      const data = await axios.post(process.env.REACT_APP_API_URL+'/account', {
        email,
        password,
        type
      });
      const auxId = data.data;
      if (type === 1) {
        await axios.post(process.env.REACT_APP_API_URL+'/candidateprofile/' + auxId.id, {
          name,
        })
      }
      setRegister(false)
      alert('Account created you can now login');
    } catch (err) {
      console.log(err);
      alert('Could not create account');
    }
  }

  const tryLogin = async () => {
    try {

      const data = await axios.get(process.env.REACT_APP_API_URL+'/account', {
        params: { email }
      });
      if (data.data !== undefined) {
        const account = data.data;
        localStorage.setItem('account', JSON.stringify(account));
        if (account.password === password) {
          if (account.type === 1) {
            const aux = await axios.get(process.env.REACT_APP_API_URL+'/candidateprofile', {
              params: { accountId: account.id, size: 200, page: 1 }
            })
            localStorage.setItem('candidateprofile', JSON.stringify(aux.data[0]));
          }
          if(account.type === 0){
            navigate('/Company')
          }else{
            navigate('/Candidate')
          }
        }
        else{
          alert('Login Filed');
        }
      }
    } catch (err) {
      console.log(err);
      alert('Login Filed');

    }
  }

  return (
    <Card>
      <Card.Body>
        {
          register === false
            ? (
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div>
                  <Button variant="primary" onClick={() => tryLogin()} className='buttons' >
                    Enter
                  </Button>
                  <Button variant="secondary" onClick={() => setRegister(true)} className='buttons'>
                    Register
                  </Button>
                </div>
              </Form>
            ) : (
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Type</Form.Label>
                  <Form.Select onChange={(e) => setType(Number(e.target.value))}>
                    <option value={0}>Company</option>
                    <option value={1}>Candidate</option>
                  </Form.Select>
                </Form.Group>

                {
                  type === 1 ? (
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Name</Form.Label>
                      <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                  ) : (<></>)
                }
                <div>
                  <Button variant="primary" onClick={() => createAccount()} className='buttons' >
                    Register
                  </Button>
                  <Button variant="secondary" onClick={() => setRegister(false)} className='buttons'>
                    Cancel
                  </Button>
                </div>
              </Form>
            )
        }
      </Card.Body >
    </Card >
  );
}

export default LoginCard;