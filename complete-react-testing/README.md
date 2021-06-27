# React Testing

</br>

## List of Contents:
### 1. [How to Test React Components: the Complete Guide](#content-1)

</br>

---

## Contents:


## [How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/) <span id="content-1"></span>

</br >

## Theory:

### What is Testing?
- Testing is a 3 step process that composed by this: (remember the 3 a's)
  - Arrange
  - Act
  - Assert
- Arrange: This is a step before the action takes place
- Act: This is when the event happens or a function is called and returning a value
- Assert: This is a step whether our expectation meets the actual event or return values
- Snippet:
  ```javascript
  describe('Testing sum', () => {
      function sum(a, b) {
         return a + b;
      }

      it('should equal 4',()=>{
         expect(sum(2,2)).toBe(4);
        })

      test('also should equal 4', () => {
          expect(sum(2,2)).toBe(4);
        }) 
  });
  ```
- `describe` is used to declare the test block or suite
- `it` or `test` is used to write the actual test

### Why test?
- Testing is done to ensure that your app will work as intended
- Having test will make our code robust and less error prone
- Drawbacks:
  - Time consuming
  - Running actual scenarios would cost money (in CI for example)
  - Need to be done correctly, or it would lead us to false positives or false negatives

### What to test?
- Should test the functionality of our code or app
- Should mimic how it will be used by your end users

### What not to test?
- Philosophy by Kent C Dodds, we shouldn't test implementation details
- No need to change const variables and third party libraries

### Author's personal philosophy on testing
- Many integration tests
- No snapshot tests
- Few unit tests
- Few end to end tests
- It's easy to test implementation details with unit tests, especially shallow render
- Integration tests should mock as little as possible
- Do not test implementation details such as names of functions and variables.

### Shallow vs mount
- Mount actually executes the html, css and js code like a browser would, but does so in a simulated way.
- Mount tests are still much slower than shallow tests.
- Unmount or cleanup  the component after each test.
- `mount/render` for integrations testing and `shallow` for unit testing
- `shallow` does not render the child components and allows to test in isolation
- Check this examples:
  ```javascript
  import React from 'react';

  const App = () => {
    return (
      <div> 
        <ChildComponent /> 
      </div> 
    )
  }

  const ChildComponent = () => {
    return (
      <div>
       <p> Child components</p>
      </div>
    )
  }
  ```
- This is the DOM nodes when we are using `shallow`
  ```html
  <App>
    <div> 
      <ChildComponent /> 
    </div>
  </App> 
  ```
- This is the DOM nodes when we are using `mount`
  ```html
  <App>
    <div> 
      <ChildComponent> 
        <div>
         <p> Child components</p>
        </div>
      </ChildComponent>
     </div>
  </App> 
  ```

### Unit vs Integration vs End to End
- unit testing: testing an isolated part of your app, usually done in combination with shallow rendering. example: a component renders with the default props.
- integration testing: testing if different parts work or integrate with each other. Usually done with mounting or rendering a component. example: test if a child component can update context state in a parent.
- e to e testing: Stands for end to end. Usually a multi step test combining multiple unit and integration tests into one big test. Usually very little is mocked or stubbed. Tests are done in a simulated browser, there may or may not be a UI while the test is running. example: testing an entire authentication flow.


### SnapShot testing
- Snippet
  ```javascript
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
    console.log(wrapper.debug())

    expect(toJson(wrapper)).toMatchSnapshot()
  })
  ```
- If we haven't created `__snapshots__` before, it will create the folder for us
- On every subsequent test the new snapshot will be compared to the existing snapshot file. 
- The test will pass if the snapshot has not changed and fail if it has changed
- The downside of doing snapshot test is if we deliberately change a component, our snapshot tests will fail. But still, we can update the snapshot
- If we run `npm test` by default the tests are running in watch mode.
- Press `u` in watch mode to update the snapshots
- Snatshot test allows us to see how our component has changed since the last test
- The benefits:
  - It's very quick to implement
  - To see if our component renders correctly
- Use `.debug()` to get the string representation of a component
- Cons and arguments of snapshot testing:
  - Also comparing diffs can be done with git version control. This should not be the job of snapshot testing.
  - A failed test doesn’t mean your app isn’t working as intended, only that your code has changed since the last time you ran the test.


### Testing Implementation details with Enzyme
- Snippet by the author
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Counter from '../counter';

  import Enzyme, { shallow, render, mount } from 'enzyme';
  import toJson from 'enzyme-to-json';
  import Adapter from 'enzyme-adapter-react-16';

  Enzyme.configure({ adapter: new Adapter() })

  // incorrect function assignment in the onClick method
  // will still pass the tests.

  test('the increment method increments count', () => {
    const wrapper = mount(<Counter />)

    expect(wrapper.instance().state.count).toBe(0)

    // wrapper.find('button.counter-button').simulate('click')
    // wrapper.setState({count: 1})
    wrapper.instance().increment()
    expect(wrapper.instance().state.count).toBe(1)
  })
  ```
- My own snippet
  ```javascript
  import { mount } from 'enzyme'

  import Card from '../card.components'

  it('Test the card default', () => {
    const wrapper = mount(<Card />)

    expect(wrapper.props().title).toBe('Title')
    expect(wrapper.props().description).toBe('Description')
  })

  it('Test after click', () => {
    const wrapper = mount(<Card />)

    const btn = wrapper.find('button')
    btn.simulate('click')
    const myText = wrapper.find('#detective')
    expect(myText.text()).toBe('Sherlock Holmes and John Watson')
  })
  ```

### React-testing-library

> The more your tests resemble the way your software is used the more confidence they can give you.

#### useState

- Author's snippet:
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import TestHook from '../test_hook.js';
  import {render, fireEvent, cleanup} from '@testing-library/react';
  import App from '../../../App'

  afterEach(cleanup)

  it('Text in state is changed when button clicked', () => {
      const { getByText } = render(<TestHook />);

      expect(getByText(/Initial/i).textContent).toBe("Initial State")

      fireEvent.click(getByText("State Change Button"))

      expect(getByText(/Initial/i).textContent).toBe("Initial State Changed")
   })


  it('button click changes props', () => {
    const { getByText } = render(<App>
                                  <TestHook />
                                 </App>)

    expect(getByText(/Moe/i).textContent).toBe("Moe")

    fireEvent.click(getByText("Change Name"))

    expect(getByText(/Steve/i).textContent).toBe("Steve")
  })
  ```
- My snippet
  ```javascript
  import { render, cleanup, fireEvent } from '@testing-library/react'

  afterEach(cleanup)

  it('Test with react testing library', () => {
    const { getByText } = render(<Card />)

    expect(getByText(/Title/)).toBeInTheDocument()
    expect(getByText(/Description/)).toBeInTheDocument()

    const btn = getByText('Click')
    fireEvent.click(btn)
    expect(getByText('Sherlock Holmes and John Watson')).toBeInTheDocument()
    expect(getByText('Sherlock Holmes and John Watson').textContent).toBe('Sherlock Holmes and John Watson')
  })
  ```
- `afterEach(cleanup)` This line is used to unmount or clean up after every test
- `getByText` looks up for any component with some specified text


#### useReducer
- Author's snippet
  ```javascript
  // Reducer
  import * as ACTIONS from './actions'

  export const initialState = {
      stateprop1: false,
  }

  export const Reducer1 = (state = initialState, action) => {
    switch(action.type) {
      case "SUCCESS":
        return {
          ...state,
          stateprop1: true,
        }
      case "FAILURE":
        return {
          ...state,
          stateprop1: false,
        }
      default:
        return state
    }
  }

  // Actions
  export const SUCCESS = {
    type: 'SUCCESS'
  }

  export const FAILURE = {
    type: 'FAILURE'
  }

  // Component
  import React, { useReducer } from 'react';
  import * as ACTIONS from '../store/actions'
  import * as Reducer from '../store/reducer'


  const TestHookReducer = () => {
    const [reducerState, dispatch] = useReducer(Reducer.Reducer1, Reducer.initialState)

    const dispatchActionSuccess = () => {
      dispatch(ACTIONS.SUCCESS)
    }

    const dispatchActionFailure = () => {
      dispatch(ACTIONS.FAILURE)
    }


    return (
      <div>
         <div>
          {reducerState.stateprop1
             ? <p>stateprop1 is true</p>
             : <p>stateprop1 is false</p>}
         </div>
         <button onClick={dispatchActionSuccess}>
           Dispatch Success
         </button>
      </div>
    )
  }


  export default TestHookReducer;

  // Test
  import React from 'react';
  import ReactDOM from 'react-dom';
  import TestHookReducer from '../test_hook_reducer.js';
  import {render, fireEvent, cleanup} from '@testing-library/react';
  import * as Reducer from '../../store/reducer';
  import * as ACTIONS from '../../store/actions';


  afterEach(cleanup)

  describe('test the reducer and actions', () => {
    it('should return the initial state', () => {
      expect(Reducer.initialState).toEqual({ stateprop1: false })
    })

    it('should change stateprop1 from false to true', () => {
      expect(Reducer.Reducer1(Reducer.initialState, ACTIONS.SUCCESS ))
        .toEqual({ stateprop1: true  })
    })
  })

  it('Reducer changes stateprop1 from false to true', () => {
     const { container, getByText } = render(<TestHookReducer />);

     expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is false")

     fireEvent.click(getByText("Dispatch Success"))

     expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is true")
  })
  ```

#### useContext
- Author's snippet
  ```javascript
  // Context
  import React from 'react';

  const Context = React.createContext()

  export default Context

  // App.js
  import React, { useState } from 'react';
  import TestHookContext from './components/react-testing-lib/test_hook_context';


  import Context from './components/store/context';


  const App = () => {
    const [state, setState] = useState("Some Text")
    

    const changeText = () => {
      setState("Some Other Text")
    }


    return (
      <div className="App">
      <h1> Basic Hook useContext</h1>
       <Context.Provider value={{changeTextProp: changeText,
                                 stateProp: state
                                   }} >
          <TestHookContext />
       </Context.Provider>
      </div>
    );
  }

  export default App;


  // Component
  import React, { useContext } from 'react';

  import Context from '../store/context';

  const TestHookContext = () => {
    const context = useContext(Context)

    return (
      <div>
      <button onClick={context.changeTextProp}>
          Change Text
      </button>
        <p>{context.stateProp}</p>
      </div>
    )
  }


  export default TestHookContext;

  // Test
  import React from 'react';
  import ReactDOM from 'react-dom';
  import TestHookContext from '../test_hook_context.js';
  import {act, render, fireEvent, cleanup} from '@testing-library/react';
  import App from '../../../App'

  import Context from '../../store/context';

  afterEach(cleanup)

  it('Context value is updated by child component', () => {

     const { container, getByText } = render(<App>
                                              <Context.Provider>
                                               <TestHookContext />
                                              </Context.Provider>
                                             </App>);

     expect(getByText(/Some/i).textContent).toBe("Some Text")

     fireEvent.click(getByText("Change Text"))

     expect(getByText(/Some/i).textContent).toBe("Some Other Text")
  })
  ```

### Controlled Component Forms
- Author's snippet
  ```javascript
  // Component
  import React, { useState } from 'react';

  const HooksForm1 = () => {
    const [valueChange, setValueChange] = useState('')
    const [valueSubmit, setValueSubmit] = useState('')

    const handleChange = (event) => (
      setValueChange(event.target.value)
    );

    const handleSubmit = (event) => {
      event.preventDefault();
      setValueSubmit(event.target.text1.value)
    };

      return (
        <div>
         <h1> React Hooks Form </h1>
          <form data-testid="form" onSubmit={handleSubmit}>
            <label htmlFor="text1">Input Text:</label>
            <input id="text1" onChange={handleChange} type="text" />
            <button type="submit">Submit</button>
          </form>
          <h3>React State:</h3>
            <p>Change: {valueChange}</p>
            <p>Submit Value: {valueSubmit}</p>
          <br />
        </div>
      )
  }


  export default HooksForm1;


  // Test
  import React from 'react';
  import ReactDOM from 'react-dom';
  import HooksForm1 from '../test_hook_form.js';
  import {render, fireEvent, cleanup} from '@testing-library/react';

  afterEach(cleanup)

  //testing a controlled component form.
  it('Inputing text updates the state', () => {
      const { getByText, getByLabelText } = render(<HooksForm1 />);

      expect(getByText(/Change/i).textContent).toBe("Change: ")

      fireEvent.change(getByLabelText("Input Text:"), {target: {value: 'Text' } } )

      expect(getByText(/Change/i).textContent).not.toBe("Change: ")
   })


   it('submiting a form works correctly', () => {
       const { getByTestId, getByText } = render(<HooksForm1 />);

       expect(getByText(/Submit Value/i).textContent).toBe("Submit Value: ")

       fireEvent.submit(getByTestId("form"), {target: {text1: {value: 'Text' } } })

       expect(getByText(/Submit Value/i).textContent).not.toBe("Submit Value: ")
    })
  ```
- My snippet
  ```javascript
  // Component
  import { useState } from 'react'

  import { FormComponent, TextFieldComponent, FormItemWrapper, Button } from './form.styled'

  const Form = () => {
    const [age, setAge] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleClick = (event) => {
      setIsSubmitted(true)
      event.preventDefault()
    }

    return (
      <FormComponent>
        <FormItemWrapper>
          <TextFieldComponent
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormItemWrapper>
        <FormItemWrapper>
          <TextFieldComponent
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormItemWrapper>
        <FormItemWrapper>
          <TextFieldComponent
            value={age}
            type="number"
            placeholder="Age"
            onChange={(event) => setAge(event.target.value)}
          />
        </FormItemWrapper>
        <div>
          <Button onClick={handleClick}>Submit</Button>
        </div>
        {isSubmitted && (
          <div>
            <p>{username}</p>
            <p>{password}</p>
            <p>{age}</p>
          </div>
        )}
      </FormComponent>
    )
  }

  export default Form

  // Test
  import { render, fireEvent, cleanup, screen } from '@testing-library/react'

  import Form from '../form.components'

  afterEach(cleanup)

  it('Test for placeholder', () => {
    render(<Form />)

    const usernameInput = screen.getByPlaceholderText(/Username/)
    const passwordInput = screen.getByPlaceholderText(/Password/)
    const ageInput = screen.getByPlaceholderText(/Age/)

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(ageInput).toBeInTheDocument()

    fireEvent.change(usernameInput, { target: { value: 'My Username' } })
    fireEvent.change(passwordInput, { target: { value: 'My Password' } })
    fireEvent.change(ageInput, { target: { value: 21 } })

    const submitBtn = screen.getByText('Submit')
    fireEvent.click(submitBtn)

    expect(screen.getByText('My Username')).toBeInTheDocument()
    expect(screen.getByText('My Password')).toBeInTheDocument()
    expect(screen.getByText('21')).toBeInTheDocument()
  })
  ```

### useEffect and API requests with axios
- A mock is way to simulate behavior we dont actually want to do in our tests. For example we mock API requests because we dont want to make real requests in our tests.
- Author's snippet
  ```javascript
  // Parent
  ...
       <TestAxios url='https://jsonplaceholder.typicode.com/posts/1' />   
  ...

  // Component 
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';


  const TestAxios = (props) => {
    const [state, setState] = useState()

    useEffect(() => {
      axios.get(props.url)
        .then(res => setState(res.data))
    }, [])


    return (
      <div>
      <h1> Axios Test </h1>
          {state
            ? <p data-testid="title">{state.title}</p>
            : <p>...Loading</p>}
      </div>
    )
  }


  export default TestAxios;

  // Imports on test file
  import React from 'react';
  import ReactDOM from 'react-dom';
  import TestAxios from '../test_axios.js';
  import {act, render, fireEvent, cleanup, waitForElement} from '@testing-library/react';

  import axiosMock from "axios";


  // __mocks__/axios.js
  export default {
    get: jest.fn(() => Promise.resolve({ data: {} }) )
  };

  // Test
  //imports
  ...

  afterEach(cleanup)

  it('Async axios request works', async () => {
    axiosMock.get.mockResolvedValue({data: { title: 'some title' } })

    const url = 'https://jsonplaceholder.typicode.com/posts/1'
    const { getByText, getByTestId, rerender } = render(<TestAxios url={url} />);

    expect(getByText(/...Loading/i).textContent).toBe("...Loading")

    const resolvedEl = await waitForElement(() => getByTestId("title"));

    expect((resolvedEl).textContent).toBe("some title")

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
   })
  ```
- The first thing we do in our test is call our fake axios get request, and mock the resolved value with ironically the mockResolvedValue function offered by jest. This function does exactly what its name says, it resolves a promise with the data we pass in, which simulates what axios does.
- The waitForElement()  function, which will wait until the promise resolves before going to the next assertion.
  
### Cypress
- Installing: `npm install cypress`
- To run: `node_modules/.bin/cypress open`
- Running the cypress open command will give you a basic configuration of cypress and create some files and folders for your automatically. A cypress folder will be created in the project root. We will write our code in the integration folder.
- No mocking, our app will be running in its full development version in a simulated browser with a UI
- Unlike unit and integration tests we do not need to explicitly assert some things. This is because some Cypress commands have built in default assertions. Default assertions are exactly what they sound like, they are asserted by default so no need to add a matcher.
- Commands are chained together so order is important and one command will wait until a previous command is completed before running.
- We will make use of the `cy.contains()` command which will return a DOM node with matching text.
- Author's snippet
  ```javascript
  import React from 'react';

  describe ('complete e to e test', () => {
    it('e to e test', () => {
      cy.visit('/')
      //counter test
      cy.contains("Clicked: 0")
        .click()
      cy.contains("Clicked: 1")
      // basic hooks test
      cy.contains("Initial State")
      cy.contains("State Change Button")
        .click()
      cy.contains("Initial State Changed")
      cy.contains("Moe")
      cy.contains("Change Name")
        .click()
      cy.contains("Steve")
      //useReducer test
      cy.contains('stateprop1 is false')
      cy.contains('Dispatch Success')
        .click()
      cy.contains('stateprop1 is true')
      //useContext test
      cy.contains("Some Text")
      cy.contains('Change Text')
        .click()
      cy.contains("Some Other Text")
      //form test
      cy.get('#text1')
        .type('New Text {enter}')
      cy.contains("Change: New Text")
      cy.contains("Submit Value: New Text")
      //axios test
      cy.request('https://jsonplaceholder.typicode.com/posts/1')
        .should(res => {
            expect(res.body).not.to.be.null
            cy.contains(res.body.title)
          })
    });
  });
  ```
- My snippet
  ```javascript
  /* eslint-disable */

  describe('End to end test', () => {
    it('e2e test', () => {
      cy.visit('/')

      // Test for top part
      cy.contains('Home').click()
      cy.contains('Title')
      cy.contains('Description')

      // Test for click event
      cy.contains('Click').click()
      cy.contains('Sherlock Holmes and John Watson')

      // Test for form
      cy.get('#form-username').type('My Username')
      cy.get('#form-password').type('My Password')
      cy.get('#form-age').type('21')
      cy.get('#form-submit').click()
      cy.contains('My Username')
      cy.contains('My Password')
      cy.contains('21')
    })
  })
  ```

</br>

---

## References:
- https://www.freecodecamp.org/news/testing-react-hooks/