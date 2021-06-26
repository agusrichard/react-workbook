import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom"

import routesList from './utils/routes.js'

import Navbar from './components/navbar'

function App() {
  const RoutesList = () => routesList.map(Item => (
    <Route exact key={Item.href} path={Item.href}>
      {<Item.Component />}
    </Route>
  ))

  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <RoutesList />
        </Switch>
      </Router>
    </>
  );
}

export default App;
