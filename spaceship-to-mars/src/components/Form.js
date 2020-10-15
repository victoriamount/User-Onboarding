import React from 'react';
import Styled from 'styled-components'

const StyledFormContainer = Styled.form`
    display: flex;
    justify-content: center;
    max-height: 75vh;
    
`

const StyledFormDiv = Styled.div`
    display: flex;
    flex-flow: column wrap;
    border: 4px solid ${props => props.theme.primaryColor};
    width: 50%;
    background: ${props => props.theme.white};
    align-items: space-between;
    padding: 2%;

    h2 {
        font-family: ${props => props.theme.displayFont};
        font-size: 3rem;
        border-bottom: 2px solid ${props => props.theme.primaryColor}
    }
    button {
        width: 30%;
        margin-left: 35%;
        font-family: ${props => props.theme.displayFont};
        font-size: 1.5rem;
    }
    label {
        display: flex;
        justify-content: space-between;
        padding: 1%;

    }
    .bold {
        font-weight: bold;
    }
`

const StyledInput = Styled.div`
            color: ${props => props.theme.accentColor};
`


export default function SignupForm(props) { 
    const { formValues, disabled, formErrors, submit, change } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    };



    return (
        <StyledFormContainer className='form container' onSubmit={onSubmit}>
            <StyledFormDiv>
                <h2>Join the Mission</h2>
                <label>
                    First Name 
                    <StyledInput>
                        <input
                            value={formValues.first_name}
                            onChange={onChange}
                            name="first_name"
                            type="text"
                        />
                        <div>{formErrors.first_name}</div>
                    </StyledInput>
                </label>         
                <label>
                    Last Name 
                    <StyledInput>
                        <input
                            value={formValues.last_name}
                            onChange={onChange}
                            name="last_name"
                            type="text"
                        />
                        <div>{formErrors.last_name}</div>
                    </StyledInput>
                </label>      
                <label>
                    Email 
                    <StyledInput>
                        <input
                            value={formValues.email}
                            onChange={onChange}
                            name="email"
                            type="email"
                        />              
                        <div>{formErrors.email}</div>
                    </StyledInput>
                </label>  
                <label>
                    Password 
                    <StyledInput>  
                        <input
                            value={formValues.password}
                            onChange={onChange}
                            name="password"
                            type="text"
                        />
                        <div>{formErrors.password}</div>
                    </StyledInput>
                </label>  
                <label>
                    I agree to the Terms of Service
                    <StyledInput>
                        <input
                            type="checkbox"
                            name="tos"
                            checked={formValues.tos}
                            onChange={onChange}
                        /> 
                        <div>{formErrors.tos}</div>
                    </StyledInput>
                </label>
                <br/>
                {/* Button disabled until all forms filled */}
                <button disabled={disabled}>Submit</button>

            </StyledFormDiv>
        </StyledFormContainer>
    )
}