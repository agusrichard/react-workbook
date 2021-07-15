# React Hooks


</br>

## List of Contents:
### 1. [Understanding React Hooks](#content-1)
### 2. [Official Docs - Introducing Hooks](#content-2)
### 3. [Official Docs - Hooks at a Glance](#content-3)


</br>

---

## Contents

## [Understanding React Hooks](https://serverless-stack.com/chapters/understanding-react-hooks.html) <span id="content-1"><span>

React Hooks are a way for your function components to “hook” into React’s lifecycle and state.

### The React Class Component Lifecycle
- Snippet of class-based component:
  ```javascript
  class Hello extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
        </div>
      );
    }
  }
  ```
- The simplified model of the above code:
  - React will creae a new instance of our component </br>
    ```javascript
    const HelloInstance = new Hello(someProps)
    ```
  - This calls your component’s `constructor(someProps)`
  - Call the `render` method
  - Call the `componentDidMount` method
  - Calling the `setState` will trigger another call for the `render` method
  - After the update, React will call `componentDidUpdate`
  - If the user navigates to a different screen, React will remove the rendered component by calling `componentWillUnmount` method

### The React Function Component Lifecycle
- Snippet
  ```javascript
  function Hello(props) {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
  ```
- For a function component, React simply runs our function every time it needs to render or re-render it

### Adding React Hooks
- Snippet
  ```javascript
  function Hello(props) {
    const [ stateVariable, setStateVariable ] = useState(0);

    useEffect(() => {
      console.log('mount and update');

      return () => {
        console.log('cleanup');
      };
    });

    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
  ```
- Explanation of the above snippet:
  - When our component gets rendered, by writing `useState`, we tell React that we want to store something in the state
  - useEffect can be used at the beginning of the rendering process, when the state changes, or when component will unmount
  - Function components are run on every single render


### React Hooks Mental Model
- Components are rerun every time
- As opposed to Class components, where specific methods in your class are called upon render.

### Subtle Differences Between Class & Function Components
- Let's notice the differences
  ```javascript
  // Class-based component
  class ProfilePage extends React.Component {
    showMessage = () => {
      alert('Followed ' + this.props.user);
    };

    handleClick = () => {
      setTimeout(this.showMessage, 3000);
    };

    render() {
      return <button onClick={this.handleClick}>Follow</button>;
    }
  }


  // Function-based component
  function ProfilePage(props) {
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return (
      <button onClick={handleClick}>Follow</button>
    );
  }
  ```
- React is using the SAME instance of your Class component between re-renders.
- So conceptually React changes the ProfilePage instance prop by doing something like this
- Class-based component flow:
  ```javascript
  // Create an instance
  const ProfilePageInstance = new ProfilePage({ user: "First User" });
  // First render
  ProfilePageInstance.render();

  // Button click
  this.handleClick();
  // Timer is started

  // Update prop
  ProfilePageInstance.props.user = "New User";
  // Re-render
  ProfilePageInstance.render();

  // Timer completes
  // where this <=> ProfilePageInstance
  alert('Followed ' + this.props.user);
  ```
- Function-based component flow:
  ```javascript
  // First render
  ProfilePage({ user: "First User" });

  // Button click
  handleClick();
  // Timer is started

  // Re-render with updated props
  ProfilePage({ user: "New User" });

  // Timer completes
  // from the first ProfilePage() call scope
  alert('Followed ' + props.user);
  ```

</br>

---

## [Official Docs - Introducing Hooks](https://reactjs.org/docs/hooks-intro.html) <span id="content-2"><span>

### Intro code snippet
```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### No Breaking Changes

Note that hooks are:
- **Completely opt-in**. You can try Hooks in a few components without rewriting any existing code.
- **100% backwards-compatible**. Hooks don’t contain any breaking changes.
- **Available now**. Hooks are now available with the release of v16.8.0.
- **There are no plans to remove classes from React**
- **Hooks don’t replace your knowledge of React concepts**. Instead, Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.

### Motivation
- **It’s hard to reuse stateful logic between components**
  - Hard to create reusable behavior when using class-based component.
  - Trapped in wrapper hell where components are surrounded by layers of providers, consumers, higher order components, render props and other abstractions.
  - React needs a better primitive for sharing stateful logic.
  - Hooks allow you to reuse stateful logic without changing your component hierarchy.
- **Complex components become hard to understand**
  - Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method. This makes it too easy to introduce bugs and inconsistencies.
  - Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods.
- **Classes confuse both people and machines**
  - You have to understand how this works in JavaScript, which is very different from how it works in most languages.
  - You have to remember to bind the event handlers.
  - Classes don’t minify very well, and they make hot reloading flaky and unreliable.

### Gradual Adoption Strategy
- **TLDR: There are no plans to remove classes from React.**
- Crucially, Hooks work side-by-side with existing code so you can adopt them gradually

</br>

---

## [Official Docs - Hooks at a Glance](https://reactjs.org/docs/hooks-intro.html) <span id="content-3"><span>

### State Hook
- Code snippet </br>
  ```javascript
  import React, { useState } from 'react';

  function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  ```
- `useState` is a Hook.
- `useState` returns a pair: the current state value and a function that lets you update it.
- `count` and `setCount` can be compared to `this.setState` and `state` of a class-based component.
- The only argument for `useState` method is the initial value for the state.
- We can declare multiple Hook in a single component. </br>
  ```javascript
   function ExampleWithManyStates() {
    // Declare multiple state variables!
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
    // ...
  }
  ```
- Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.

### Effect Hook
- Data fetching, subscriptions, or manually changing the DOM are called as "side effects".
- `useEffect` has the same ability as `componentDidUpdate`, `componentDidMount`, and `componentWillUnmount`
- Code snippet: </br>
  ```javascript
  import React, { useState, useEffect } from 'react';

  function Example() {
    const [count, setCount] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
      document.title = `You clicked ${count} times`;
    });

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  ```
- When you call useEffect, you’re telling React to run your “effect” function after flushing changes to the DOM.
- Since `useEffect` is used inside the component, so it can use `state` and `setState`.
- `useEffect` can be used to clean up the component </br>
  ```javascript
  import React, { useState, useEffect } from 'react';

  function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    useEffect(() => {
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      };
    });

    if (isOnline === null) {
      return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
  }
  ```
- In the above example, React will unsubscribe (calling ChatAPI.unsubscribeFromFriendStatus) when the component unmounts.
- In a single component, we can have multiple `useEffect`.
  
### Rules of Hooks
- Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
- Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions.


### Building Your Own Hooks
- Solution to reuse some stateful logic between components:
  - higher order components
  - render props
- The previous code snippet when using `useEffect` can be refactored into this: </br>
  ```javascript
  // Custom hook
  import React, { useState, useEffect } from 'react';

  function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    useEffect(() => {
      ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
      };
    });

    return isOnline;
  }

  // Usage
  function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id);

    return (
      <li style={{ color: isOnline ? 'green' : 'black' }}>
        {props.friend.name}
      </li>
    );
  }
  ```
- The state of each component is completely independent.
- Each call to a Hook has a completely isolated state.
- 

</br>

---

## References
- https://serverless-stack.com/chapters/understanding-react-hooks.html
- https://reactjs.org/docs/hooks-intro.html