import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 10px;
  min-width: 300px;
  align-items: center;
  border: 1px solid red;
  flex-direction: column;
`

export const Title = styled.h3`
  color: salmon;
  font-size: 24px;

`

export const Description = styled.p`
  color: black;
  width: 100%;
  background: #eee;
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Btn = styled.button`
  border: 0;
  width: 100px;
  color: white;
  margin: 10px 0;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 20px;
  background: salmon;
  border-radius: 5px;
`

export const Light = styled.div`
  color: white;
  background-color: ${p => p.isActive ? 'salmon' : 'white'}
`