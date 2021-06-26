import { Link } from 'react-router-dom'

import routesList from '../../utils/routes.js'

import { Nav, NavItem } from './navbar.styled'

const Navbar = () => {

  const NavList = () => {
    return routesList.map((item, index) => (
      <NavItem key={index}>
        <Link to={item.href}>{item.title}</Link>
      </NavItem>
    ))
  }

  return (
    <Nav>
      <ul>
        <NavList />
      </ul>
    </Nav>
  )
}

export default Navbar