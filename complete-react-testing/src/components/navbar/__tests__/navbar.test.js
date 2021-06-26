import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BrowserRouter as Router } from 'react-router-dom'


import Navbar from '../navbar.components'

it('Snapshot navbar', () => {

  const wrapper = mount(
    <Router>
      <Navbar />
    </Router>
  )

  expect(toJson(wrapper)).toMatchSnapshot()
})