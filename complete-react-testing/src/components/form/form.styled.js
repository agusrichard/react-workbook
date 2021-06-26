import styled from 'styled-components'

export const FormComponent = styled.form`
  width: 100%;
  display: flex;
  background: #eee;
  align-items: center;
  flex-direction: column;
`

export const TextFieldComponent = styled.input.attrs(props => ({
  type: props.type
}))`
  padding: 5px;
  font-size: 18px;
`

export const FormItemWrapper = styled.div`
  margin: 10px 0;
`

export const Button = styled.button`
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