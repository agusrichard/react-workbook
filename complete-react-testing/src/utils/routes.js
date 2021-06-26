import Home from '../pages/home'
import About from '../pages/about'
import Blog from '../pages/blog'
import Project from '../pages/project'
import Contact from '../pages/contact'

const Routes = [
  {
    title: 'Home',
    href: '/home',
    Component: () => <Home />
  },
  {
    title: 'About',
    href: '/about',
    Component: () => <About />
  },
  {
    title: 'Blog',
    href: '/blog',
    Component: () => <Blog />
  },
  {
    title: 'Project',
    href: '/project',
    Component: () => <Project />
  },
  {
    title: 'Contact',
    href: '/contact',
    Component: () => <Contact />
  },
]

export default Routes