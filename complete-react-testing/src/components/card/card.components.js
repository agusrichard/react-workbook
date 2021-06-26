import { useState } from 'react'
import PropTypes from 'prop-types'

import { Container, Title, Description, Content, Btn, Light } from './card.styled'

const Card = ({ title, description }) => {
  const [isActive, setIsActive] = useState(false) // eslint-disable-line

  const toggleButton = () => {
    setIsActive(prev => !prev)
  }

  const Button = () => (
    <Btn onClick={toggleButton}>Click</Btn>
  )

  const Surprise = ({ isActive }) => (
    <Light isActive={isActive}>
      <p id="detective">Sherlock Holmes and John Watson</p>
    </Light>
  )

  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Content>
        <Button />
        {isActive && <Surprise isActive={isActive} />}
      </Content>
    </Container>
  )
}

Card.defaultProps = {
  title: 'Title',
  description: 'Description'
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Card