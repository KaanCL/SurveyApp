import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { signInWithEmail , doSıgnUpWithFacebook, doSıgnUpWithGoogle} from '../firebase/auth';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle  ,faFacebook} from '@fortawesome/free-brands-svg-icons'


 
function SignIn() {

    interface FormData{
      email:string;
      password:string;
    }

    const [formData,setFormData] = useState<FormData>({
      email: '',
      password: '',
    })
    
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

    const handleSubmit = async (event:React.FormEvent)=>{
      event.preventDefault();

      if(!formData.email || !formData.password){
        alert("Please fill in all field!.");
        return;
      }
      signInWithEmail(formData.email,formData.password)



    }


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
        <h4>Don’t have an account yet ?</h4>

        <h6 style={{cursor:"pointer"}} onClick={()=>window.location.href="signup"}>Sign Up</h6>

        </Stack>
       
      </Row>
      <Row>
        <Col md={6} lg={5} className="mx-auto"> 
          <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }} className='justify-content-center'>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control 
                onChange={handleChange}
                name="email"
                type="email" 
                placeholder="Email"
                value={formData.email}
                style={formStyle}
                className='bg-light text-dark'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control 
                onChange={handleChange}
                type="password" 
                name="password"
                placeholder="Password"
                value={formData.password}
                style={formStyle}
                className='bg-light text-black'
              />
              
            </Form.Group>
            <Button style={{width:"18rem"}} className='mb-3' variant="dark" size='lg' type='submit'>Login</Button>

          </Form>
          <hr style={{border:"1.5px solid black" , marginTop:"5px" }}></hr>
        </Col>
      </Row>
      <Stack direction="horizontal" className='justify-content-center' gap={5} >
        <Card onClick={doSıgnUpWithGoogle} style={cardStyle}>
            <FontAwesomeIcon icon={faGoogle} size='2x' />
        
        </Card>
        <Card onClick={doSıgnUpWithFacebook} style={cardStyle}>
            <FontAwesomeIcon icon={faFacebook} size='2x' />
        
        </Card>
  
   </Stack>
    </Container>
   
  )
}

export default SignIn
