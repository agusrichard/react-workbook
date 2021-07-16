# React Hooks


</br>

## List of Contents:
### 1. [Understanding React Hooks](#content-1)
### 2. [Official Docs - Introducing Hooks](#content-2)
### 3. [Official Docs - Hooks at a Glance](#content-3)
### 4. [Official Docs - Using the State Hook](#content-4)
### 5. [Official Docs - Using the Effect Hook](#content-5)


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
- Crucially, Hooks work side-by-side with existing code so you can adopt them gradually.

</br>

---

## [Official Docs - Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html) <span id="content-3"><span>

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

</br>

---

## [Official Docs - Using the State Hook](https://reactjs.org/docs/hooks-state.html) <span id="content-4"><span>

### Intro
- Functional component code snippet: </br>
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
- Class component code snippet (equivalent example): </br>
  ```javascript
  class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }
  ```

### Hooks and Function Components
- Code snippet: </br>
  ```javascript
  // Initialized
  const Example = (props) => {
    // You can use Hooks here!
    return <div />;
  }

  // Declarative
  function Example(props) {
    // You can use Hooks here!
    return <div />;
  }
  ```
- Hooks don't work inside classes.

### What's Hook?
- **What is a Hook?** A Hook is a special function that lets you “hook into” React features.
- **When would I use a Hook?** If we want to write a function component with state to it, then we need to use hook, especially the `useState` hook.

### Declaring a State Variable
- Code snippet comparison: </br>
  ```javascript
  // Class component
  class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  }

  // Functional component
  import React, { useState } from 'react';

  function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
  }
  ```
- **What does calling useState do?** It declares a “state variable”.
- **What do we pass to useState as an argument?** The only argument to the useState() Hook is the initial state.
- The only argument to the useState() Hook is the initial state.
- **What does useState return?** It returns a pair of values: the current state and a function that updates it.
- This is why we write const [count, setCount] = useState(). This is similar to this.state.count and this.setState in a class.
- React will remember its current value between re-renders, and provide the most recent one to our function.

### Reading State
- Comparison of using state between class-based and functional: </br>
  ```javascript
  // Class-based
  <p>You clicked {this.state.count} times</p>

  // FUnctional
  <p>You clicked {count} times</p>
  ```

### Updating State
- Comparison of using state between class-based and functional: </br>
  ```javascript
  // Class-based
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>

  // FUnctional
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
  ```

### Recap
```javascript
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```
- Line 1: We import the `useState` Hook from React. It lets us keep local state in a function component.
- Line 4: `useState` returns a pair. One is the state and the other is the function to update the state. The only argument received by `useState` is the initial state.
- Line 9: When the user clicks, we call setCount with a new value. React will then re-render the Example component, passing the new count value to it.

### Tip: Using Multiple State Variables
- Declaring state variables as a pair of [something, setSomething] is also handy because it lets us give different names to different state variables if we want to use more than one.
- Unlike this.setState in a class, updating a state variable always replaces it instead of merging it.

</br>

---


## [Official Docs - Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html) <span id="content-5"><span>

### Intro
- Code snippet </br>
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
- `useEffect` lets us perform side effects in function components
- Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
- `useEffect` is like a combination of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.
- Two common kinds of side effect in React Component: those that don’t require cleanup, and those that do.

### Effects Without Cleanup
- Without cleanup is like, we run the `useEffect` and forget about it.
- Class-based component example: </br>
  ```javascript
  class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }

    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }
  ```
- Function component example: </br>
  ```javascript
  import React, { useState, useEffect } from 'react';

  function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
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
- **What does useEffect do?** 
  - By using this Hook, you tell React that your component needs to do something after render.
  - React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
- **Why is useEffect called inside a component?**
  - Placing useEffect inside the component lets us access the state we've defined in that same component.
- **Does useEffect run after every render?**
  - Yes! By default, it runs both after the first render and after every update.
  - Effects happen "after render".
  - React guarantees the DOM has been updated by the time it runs the effects.
- Detail explanation of this code </br>
  ```javascript
  function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });
  }
  ```
  - First, we initialized the state using `useState` hook, which returned `count` and `setCount`.
  - Second, we call `useEffect` and pass the function we usually call as the "effect" to it. 
  - We can read the current value of count inside `useEffect`.
  - React runs the effect after updating the DOM and happens for every render.
  - Effects created using useEffect are run after the render commit phase and hence after the render cycle.
  - The function passed to useEffect is going to be different on every render.
  -  Every time we re-render, we schedule a different effect, replacing the previous one. In a way, this makes the effects behave more like a part of the render result — each effect “belongs” to a particular render.

### Effects with Cleanup
- Class component example: </br>
  ```javascript
  class FriendStatus extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOnline: null };
      this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
      ChatAPI.subscribeToFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }
    componentWillUnmount() {
      ChatAPI.unsubscribeFromFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }
    handleStatusChange(status) {
      this.setState({
        isOnline: status.isOnline
      });
    }

    render() {
      if (this.state.isOnline === null) {
        return 'Loading...';
      }
      return this.state.isOnline ? 'Online' : 'Offline';
    }
  }
  ```
- Functional component example: </br>
  ```javascript
  import React, { useState, useEffect } from 'react';

  function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
      // Specify how to clean up after this effect:
      return function cleanup() {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      };
    });

    if (isOnline === null) {
      return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
  }
  ```
- If your effect returns a function, React will run it when it is time to clean up.
- **Why did we return a function from our effect?**
  - This is the optional cleanup mechanism for effects.
  - Every effect may return a function that cleans up after it. 
- **When exactly does React clean up an effect?**
  - React performs the cleanup when the component unmounts.


### Recap
- `useEffect` lets us express different kinds of side effects after a component renders. Some effects might require cleanup so they return a function.


### Tips for Using Effects

#### Tip: Use Multiple Effects to Separate Concerns
- Motivation of the creation of Hook is class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods. </br>
  ```javascript
  class FriendStatusWithCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0, isOnline: null };
      this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
      ChatAPI.subscribeToFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }

    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
      ChatAPI.unsubscribeFromFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }

    handleStatusChange(status) {
      this.setState({
        isOnline: status.isOnline
      });
    }
  // ...
  }
  ```
- To solve the separation of the same logic on different lifecycle methods. If we are using functional component, we could use Hooks: </br>
  ```javascript
  function FriendStatusWithCounter(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }

      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      };
    });
    // ...
  }
  ```
- **Explanation: Why Effects Run on Each Update**
  - Remember that cleanup function will run after every re-render.
  - The flow we have to remember: return => cleanup => mount or update.
  - Let's try to analyze the bug we would have when using class-based component: </br>
    ```javascript
     componentDidMount() {
      ChatAPI.subscribeToFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }

    componentWillUnmount() {
      ChatAPI.unsubscribeFromFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }
    ```
    - Assume that the friend prop is changed when the component is on the screen. Our component would continue to display the online status of a different friend and when the component will unmount, we will unsubscribe a different friend from the one we are subscribing.
    - The solution of the above problem would be to use `componentDidUpdate`: </br>
      ```javascript
      componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }

      componentDidUpdate(prevProps) {
        // Unsubscribe from the previous friend.id
        ChatAPI.unsubscribeFromFriendStatus(
          prevProps.friend.id,
          this.handleStatusChange
        );
        // Subscribe to the next friend.id
        ChatAPI.subscribeToFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }

      componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }
      ```
    - A better solution is by using Hook: </br>
      ```javascript
      function FriendStatus(props) {
      // ...
      useEffect(() => {
        // ...
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      });
      ```
  - There is no special code for handling updates because useEffect handles them by default. It cleans up the previous effects before applying the next effects.
  - The illustration of the sequence that happen: </br>
    ```javascript
    // Mount with { friend: { id: 100 } } props
    ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

    // Update with { friend: { id: 200 } } props
    ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
    ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

    // Update with { friend: { id: 300 } } props
    ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
    ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

    // Unmount
    ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
    ```
  - This behavior ensures consistency by default and prevents bugs that are common in class components due to missing update logic.

#### Tip: Optimizing Performance by Skipping Effects
- How to do this in class-based component </br>
  ```javascript
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      document.title = `You clicked ${this.state.count} times`;
    }
  }
  ```
- How to do this in functional component:
  ```javascript
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // Only re-run the effect if count changes
  ```
- For example, the current value of count is 5 and the next re-render the current value of count is still 5. Then the effect inside `useEffect` will not get called.
- If you use this optimization, make sure the array includes all values from the component scope (such as props and state) that change over time and that are used by the effect. Otherwise, your code will reference stale values from previous renders.
- If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.
- Don’t forget that React defers running useEffect until after the browser has painted, so doing extra work is less of a problem.

</br>

---

## References
- https://serverless-stack.com/chapters/understanding-react-hooks.html
- https://reactjs.org/docs/hooks-intro.html
- https://reactjs.org/docs/hooks-overview.html
- https://reactjs.org/docs/hooks-state.html
- https://reactjs.org/docs/hooks-effect.html