import styled from 'styled-components'

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  background: salmon;
  justify-content: center;
`

export const NavItem = styled.li`
  display: inline;
  list-style: none;
  margin: 0 10px;

  & a {
    color: #FFFFFF;
    font-size: 22px;
    font-weight: bolder;
    text-decoration: none;
  }

  & a:hover {
    color: #000;
  }
`