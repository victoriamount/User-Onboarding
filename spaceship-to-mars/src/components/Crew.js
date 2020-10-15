import React from 'react'
import Styled from 'styled-components'

const StyledAstronaut = Styled.div`
    display: flex;
    flex-flow: column wrap;
    background: ${props => props.theme.white};
    border: 2px solid ${props => props.theme.primaryColor};
    width: 30%;
    margin: 1%;
    

`



export default function Crew(props) {
    const { astronaut } = props;
    if (!astronaut) {
        return <h3>Loading astronauts...</h3>
    }

    return (
        <StyledAstronaut>
            <p>Name: {astronaut.first_name} {astronaut.last_name}</p>
            <p>Email: {astronaut.email}</p>
        </StyledAstronaut>
    )
}