import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { doCreateUserWithEmailAndPassword , doSıgnUpWithFacebook, doSıgnUpWithGoogle} from '../firebase/auth';


import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle  ,faFacebook} from '@fortawesome/free-brands-svg-icons'
import { error } from 'console';


function SignUp() {

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const maxLengths : {[key:string]:number}={
      firstName: 20,
      lastName: 20,
      email: 50,
      password: 30,
    };


    if(value.length <= (maxLengths[name] || Infinity)){
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    else{
      alert("Lütfen Karakter Sınırını Aşmayınız !")
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!formData.firstName || !formData.lastName || !formData.email || !formData.password){
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }
    doCreateUserWithEmailAndPassword(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password)
  };

  const formStyle = {
    height: '70px',
    border: '2px solid',
  };

  const cardStyle = {
    width: '5rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const handleSocialClick = (): void => {
    doSıgnUpWithGoogle();
  };

  return (
    <Container>
      <Row>
        <Col md={6} lg={5} style={{ marginTop: '30px' }} className="mx-auto  text-center">
          <h1>WELCOME BACK !</h1>
        </Col>
      </Row>
      <Row>
        <Stack style={{ marginTop: '30px' }} direction="horizontal" className="justify-content-center" gap={2}>
          <h4>Already have an account?</h4>
          <h6 style={{ cursor: 'pointer' }} onClick={handleSocialClick}>
            Sign In
          </h6>
        </Stack>
      </Row>
      <Row>
        <Col md={6} lg={5} className="mx-auto">
          <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }} className="justify-content-center">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    onChange={handleChange}
                    name="firstName"
                    value={formData.firstName}
                    style={formStyle}
                    className="bg-light text-black"
                    placeholder="First Name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    onChange={handleChange}
                    name="lastName"
                    value={formData.lastName}
                    style={formStyle}
                    className="bg-light text-black"
                    placeholder="Last Name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                style={formStyle}
                className="bg-light text-dark"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                style={formStyle}
                className="bg-light text-black"
              />
            </Form.Group>
            <Button style={{ width: '18rem' }} className="mb-3" variant="dark" size="lg" type="submit">
              Sign Up
            </Button>
          </Form>
          <hr style={{ border: '1.5px solid black', marginTop: '5px' }} />
        </Col>
      </Row>
      <Stack direction="horizontal" className="justify-content-center" gap={5}>
        <Card onClick={handleSocialClick} style={cardStyle}>
          <FontAwesomeIcon icon={faGoogle} size="2x" />
        </Card>
        <Card onClick={doSıgnUpWithFacebook} style={cardStyle}>
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </Card>
      </Stack>
    </Container>
  );
}

export default SignUp;