import React from 'react'
import { Link } from 'react-router-dom'

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



function SignUp() {

  const formStyle ={
    height:'70px', 
    border:"2px solid",
    };

    const cardStyle={
        width:'5rem' ,
        height:'3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor:"pointer"
    }

    const a =():void=>{ console.log("button click"); }

  return (
    <Container>
    <Row>
      <Col style={{ marginTop: '30px' }} className="text-center">
        <h1>WELCOME BACK !</h1>
      </Col>
    </Row>
    <Row>
      <Stack style={{ marginTop: '30px' }} direction="horizontal" className='justify-content-center' gap={2}>
      <h4>Already have an account ?</h4>

      <h6 style={{cursor:"pointer"}} onClick={a}>Sign In</h6>
      </Stack>
     
    </Row>
    <Row>
      <Col md={6} lg={5} className="mx-auto"> 

        <Form style={{ marginTop: '20px' }} className='justify-content-center'>
             
             <Row>
             <Col>
             <Form.Group className="mb-3">
   
              <Form.Control
              style={formStyle}
              className='bg-light text-black'
                placeholder='First Name'></Form.Control>
             </Form.Group>
             </Col>
             <Col>
             <Form.Group className="mb-3"> 
              <Form.Control
              style={formStyle}
              className='bg-light text-black'
              placeholder='Last Name'></Form.Control>
             </Form.Group>
             </Col>
             </Row>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control 
              type="email" 
              placeholder="Email"
              style={formStyle}
              className='bg-light text-dark'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control 
              type="password" 
              placeholder="Password"
              style={formStyle}
              className='bg-light text-black'
            />
            
          </Form.Group>
        </Form>
        <Button style={{width:"18rem"}} className='mb-3' variant="dark" size='lg'>Login</Button>
        <hr style={{border:"1.5px solid black" , marginTop:"5px" }}></hr>
      </Col>
    </Row>
    <Stack direction="horizontal" className='justify-content-center' gap={5} >
      <Card onClick={a} style={cardStyle}>
          <FontAwesomeIcon icon={faGoogle} size='2x' />
      
      </Card>
      <Card onClick={a} style={cardStyle}>
          <FontAwesomeIcon icon={faFacebook} size='2x' />
      
      </Card>

 </Stack>
  </Container>
  )
}

export default SignUp
