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


</br>

---

## References:
- https://www.freecodecamp.org/news/testing-react-hooks/