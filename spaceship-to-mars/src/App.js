import React, { useState, useEffect } from 'react';
import './App.css';
import SignupForm from './components/Form';
import Crew from './components/Crew'
import axios from 'axios';
import * as yup from 'yup';
import schema from './validation/formSchema'
import Styled from 'styled-components'
import marsCover from './images/marsCover.jpg'

// ------------ INITIAL STATES ------------
const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  tos: false,
};

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

const initialAstronauts = [];
const initialDisabled = true;

// ------------ STYLES ------------
const StyledCrew = Styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`
const StyledFormSection = Styled.div`
  background: url(${marsCover}) no-repeat fixed center; 
  height: 90vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`
const StyledCrewSection = Styled.div`
  background-color: ${props => props.theme.black};
  h2{
    color: ${props => props.theme.white};
    font-family: ${props => props.theme.displayFont};
    
  }
`

// ------------ APP ------------
function App() {
  // ------ States ------
  const [astronauts, setAstronauts] = useState(initialAstronauts);
  // array of astronaut objects
  const [formValues, setFormValues] = useState(initialFormValues);
  // object 
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  // object
  const [disabled, setDisabled] = useState(initialDisabled); 
  // boolean

  // ------ Helpers ------ 
  const getAstronauts = () => {
    axios 
      .get('https://reqres.in/api/users')
      .then(res => {
        // console.log(res.data.data)
        setAstronauts(res.data.data)
        setFormValues(initialFormValues)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postNewAstronaut = (newAstronaut) => {
    axios
      .post('https://reqres.in/api/users', newAstronaut)
      .then(res => {
        console.log(res.data);
        debugger;
        setAstronauts([res.data, ...astronauts])
        setFormValues(initialFormValues)
        console.log(`Success posting! Response data: ${res.data}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // ------ Event Handlers ------
  const submit = () => {
    const newAstronaut = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: ['tos'].filter(agree => formValues[agree]),
    };
    postNewAstronaut(newAstronaut);
  }

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors, 
          [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors, 
          [name]: err.errors[0]
        })
      })
    setFormValues({
      ...formValues, 
      [name]: value
    })

  }


  // ------ Side Effects ------
  useEffect(() => {
    getAstronauts()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className="App">
      <header style={{background: "black", color: "white", fontFamily: "'Megrim', monospace", padding: "0.1%", fontSize: '2rem'}}><h1>SPACESHIP TO MARS</h1></header>
      <StyledFormSection>
        <SignupForm formValues={formValues} disabled={disabled} formErrors={formErrors} submit={submit} change={inputChange} />
      </StyledFormSection>
      <StyledCrewSection>
      <h2>The Crew</h2>
        <StyledCrew>
          {
            astronauts.map((astronaut, index) => {
              return (
                <Crew key={index} astronaut={astronaut} />
              )
            })
          }
        </StyledCrew>
      </StyledCrewSection>
    </div>
  );
}

export default App;
