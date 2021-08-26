# React Hooks


</br>

## List of Contents:
### 1. [Understanding React Hooks](#content-1)
### 2. [Official Docs - Introducing Hooks](#content-2)
### 3. [Official Docs - Hooks at a Glance](#content-3)
### 4. [Official Docs - Using the State Hook](#content-4)
### 5. [Official Docs - Using the Effect Hook](#content-5)
### 6. [Official Docs - Rules of Hooks](#content-6)
### 7. [Official Docs - Building Your Own Hooks](#content-7)
### 8. [Official Docs - Hooks API Reference](#content-8)
### 9. [React Hooks: Memoization](#content-9)
### 10. [Use React.memo() wisely](#content-10)


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

**[⬆ back to top](#list-of-contents)**

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


**[⬆ back to top](#list-of-contents)**

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

**[⬆ back to top](#list-of-contents)**

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


**[⬆ back to top](#list-of-contents)**

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

**[⬆ back to top](#list-of-contents)**

</br>

---

## [Official Docs - Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) <span id="content-6"><span>

### Only Call Hooks at the Top Level
- Don’t call Hooks inside loops, conditions, or nested functions. 
- Always use Hooks at the top level of your React function, before any early returns.

### Only Call Hooks from React Functions
- Don’t call Hooks from regular JavaScript functions.
  - Call Hooks from React function components.
  - Call Hooks from custom Hooks.

### Explanation
```javascript
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```
- So how does React know which state corresponds to which useState call? The answer is that React relies on the order in which Hooks are called.
- The flow of the above code: </br>
  ```javascript
  // ------------
  // First render
  // ------------
  useState('Mary')           // 1. Initialize the name state variable with 'Mary'
  useEffect(persistForm)     // 2. Add an effect for persisting the form
  useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
  useEffect(updateTitle)     // 4. Add an effect for updating the title

  // -------------
  // Second render
  // -------------
  useState('Mary')           // 1. Read the name state variable (argument is ignored)
  useEffect(persistForm)     // 2. Replace the effect for persisting the form
  useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
  useEffect(updateTitle)     // 4. Replace the effect for updating the title

  // ...
  ```
- What happen if we put the hook inside an if statement? </br>
  ```javascript
  // 🔴 We're breaking the first rule by using a Hook in a condition
    if (name !== '') {
      useEffect(function persistForm() {
        localStorage.setItem('formData', name);
      });
    }
  ```
- The logical flow changed to: </br>
  ```javascript
  useState('Mary')           // 1. Read the name state variable (argument is ignored)
  // useEffect(persistForm)  // 🔴 This Hook was skipped!
  useState('Poppins')        // 🔴 2 (but was 3). Fail to read the surname state variable
  useEffect(updateTitle)     // 🔴 3 (but was 4). Fail to replace the effect
  ```

**[⬆ back to top](#list-of-contents)**

</br>

---

## [Official Docs - Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html) <span id="content-7"><span>

### Intro
```javascript
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
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

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

Now let’s say that our chat application also has a contact list, and we want to render names of online users with a green color. We could copy and paste similar logic above into our FriendListItem component but it wouldn’t be ideal

```javascript
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
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

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

### Extracting a Custom Hook
Let's extract the NOT SO DRY code above, into something more DRY by writing a custom hook
```javascript
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
- Make sure to only call other Hooks unconditionally at the top level of your custom Hook.
- A custom Hook doesn’t need to have a specific signature. We can decide what it takes as arguments, and what, if anything, it should return. In other words, it’s just like a normal function.
- Its name should always start with use so that you can tell at a glance that the rules of Hooks apply to it.

### Using a Custom Hook
- How to use our custom hook </br>
  ```javascript
  function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id);

    if (isOnline === null) {
      return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
  }

  function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

    return (
      <li style={{ color: isOnline ? 'green' : 'black' }}>
        {props.friend.name}
      </li>
    );
  }
  ```
- **Is this code equivalent to the original examples?** Yes, it works in exactly the same way.
- **Do I have to name my custom Hooks starting with “use”?** Please do. This convention is very important.
- **Do two components using the same Hook share state?** No. Custom Hooks are a mechanism to reuse stateful logic (such as setting up a subscription and remembering the current value).
- **How does a custom Hook get isolated state?** Each call to a Hook gets isolated state. Because we call useFriendStatus directly, from React’s point of view our component just calls useState and useEffect. 


### Tip: Pass Information Between Hooks
- Since Hooks are functions, we can pass information between them.
- Code snippet: </br>
  ```javascript
  const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' },
  ];

  function ChatRecipientPicker() {
    const [recipientID, setRecipientID] = useState(1);
    const isRecipientOnline = useFriendStatus(recipientID);

    return (
      <>
        <Circle color={isRecipientOnline ? 'green' : 'red'} />
        <select
          value={recipientID}
          onChange={e => setRecipientID(Number(e.target.value))}
        >
          {friendList.map(friend => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
      </>
    );
  }
  ```
- When we select a different friend, we trigger the useEffect call, which means also trigger our custom hooks. So when the recepientID is changing, then the isRecipientOnline will change too.

**[⬆ back to top](#list-of-contents)**


</br>

---

## [Official Docs - Hooks API Reference](https://reactjs.org/docs/hooks-reference.html) <span id="content-8"><span>

### `useState`
```javascript
const [state, setState] = useState(initialState);
```
- Returns a stateful value, and a function to update it.
- During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState).
- The setState function is used to update the state. It accepts a new state value and enqueues a re-render of the component.
- During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.
- If the new state is computed using the previous state, you can pass a function to setState. </br>
  ```javascript
  function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
      <>
        Count: {count}
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      </>
    );
  }
  ```
- Unlike the setState method found in class components, useState does not automatically merge update objects.
- The initialState argument is the state used during the initial render. In subsequent renders, it is disregarded. 
- If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render: </br>
  ```javascript
  const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
  });
  ```
- If you update a State Hook to the same value as the current state, React will bail out without rendering the children or firing effects.

### `useEffect`
- Accepts a function that contains imperative, possibly effectful code.
- Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase). Doing so will lead to confusing bugs and inconsistencies in the UI.
- The function passed to useEffect will run after the render is committed to the screen.
- By default, effects run after every completed render, but you can choose to fire them only when certain values have changed.
- Cleaning up an effect </br>
  ```javascript
  useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
      // Clean up the subscription
      subscription.unsubscribe();
    };
  });
  ```
- Previous effect is cleaned up before executing the next effect.
- If we want to use effect before the component get rendered to the screen, we can use `useLayoutEffect`.
- Although useEffect is deferred until after the browser has painted, it’s guaranteed to fire before any new renders. React will always flush a previous render’s effects before starting a new update.
- The default behavior for effects is to fire the effect after every completed render.
- If we just want to re-render when some props or states changed, then we can provide the dependencies as the second argument of useEffect. </br>
  ```javascript
  useEffect(
    () => {
      const subscription = props.source.subscribe();
      return () => {
        subscription.unsubscribe();
      };
    },
    [props.source],
  );
  ```
  - Now, the effect will get called only when the props.source changes.

### `useContext`
```javascript
const value = useContext(MyContext);
```
- Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.
- The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.
- Don’t forget that the argument to useContext must be the context object itself:
  - Correct: useContext(MyContext)
  - Incorrect: useContext(MyContext.Consumer)
  - Incorrect: useContext(MyContext.Provider)
- A component calling useContext will always re-render when the context value changes.
- Putting it together with Context.Provider: </br>
  ```javascript
  const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  };

  const ThemeContext = React.createContext(themes.light);

  function App() {
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }

  function Toolbar(props) {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }

  function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
      <button style={{ background: theme.background, color: theme.foreground }}>
        I am styled by theme context!
      </button>
    );
  }
  ```

### `useReducer`
```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
- useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.
- useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
- How to use it: </br>
  ```javascript
  const initialState = {count: 0};

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </>
    );
  }
  ```
- Lazy initialization by passing init function as the third argument. </br>
  ```javascript
  function init(initialCount) {
    return {count: initialCount};
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      case 'reset':
        return init(action.payload);
      default:
        throw new Error();
    }
  }

  function Counter({initialCount}) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
      <>
        Count: {state.count}
        <button
          onClick={() => dispatch({type: 'reset', payload: initialCount})}>
          Reset
        </button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </>
    );
  }
  ```

### `useCallback`
```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
- Returns a memoized callback.
- Pass an inline callback and an array of dependencies.
- useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
- useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
- Every value referenced inside the callback should also appear in the dependencies array.


### `useMemo`
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- Returns a memoized value.
- Pass a “create” function and an array of dependencies.
- useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.
- Remember that the function passed to useMemo runs during rendering. Don’t do anything there that you wouldn’t normally do while rendering.

### `useRef`
```javascript
const refContainer = useRef(initialValue);
```
- useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). 
- The returned object will persist for the full lifetime of the component.
- Common use case: </br>
  ```javascript
  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }
  ```
- Essentially, useRef is like a “box” that can hold a mutable value in its .current property.
- If you pass a ref object to React with `<div ref={myRef} />`, React will set its .current property to the corresponding DOM node whenever that node changes.
- Keep in mind that useRef doesn’t notify you when its content changes. Mutating the .current property doesn’t cause a re-render.

### `useImperativeHandle`
```javascript
useImperativeHandle(ref, createHandle, [deps])
```
- useImperativeHandle customizes the instance value that is exposed to parent components when using ref.

### `useLayoutEffect`
- The signature is identical to useEffect, but it fires synchronously after all DOM mutations.
- Use this to read layout from the DOM and synchronously re-render.

### `useDebugValue`
- useDebugValue can be used to display a label for custom hooks in React DevTools.
- Usage: </br>
  ```javascript
  function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    // ...

    // Show a label in DevTools next to this Hook
    // e.g. "FriendStatus: Online"
    useDebugValue(isOnline ? 'Online' : 'Offline');

    return isOnline;
  }
  ```
- useDebugValue accepts a formatting function as an optional second parameter. This function is only called if the Hooks are inspected. Example: </br>
  ```javascript
  useDebugValue(date, date => date.toDateString());
  ```


**[⬆ back to top](#list-of-contents)**


</br>

---

## [React Hooks: Memoization](https://medium.com/@sdolidze/react-hooks-memoization-99a9a91c8853) <span id="content-9"><span>


### Should you memoize?
- Solving imaginary performance problems is a real thing, so before you start optimizing, make sure you are familiar with React Profiler.
- React.memo is a performance optimization tool, a higher order component.
- If your function component renders the same result given the same props, React will memoize, skip rendering the component, and reuse the last rendered result.
- By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

### No memoization
- Example where performance issue might happen:
  ```javascript
  function List({ items }) {
    log('renderList');
    return items.map((item, key) => (
      <div key={key}>item: {item.text}</div>
    ));
  }
  export default function App() {
    log('renderApp');
    const [count, setCount] = useState(0);
    const [items, setItems] = useState(getInitialItems(10));
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>
          inc
        </button>
        <List items={items} />
      </div>
    );
  }
  ```
- Above's explanation:
  - Every time inc is clicked, both renderApp and renderList are logged, even though nothing has changed for List.
  - If the tree is big enough, it can easily become performance bottleneck. We need to reduce number of renders.

### Simple memoization
- Example:
  ```javascript
  const List = React.memo(({ items }) => {
    log('renderList');
    return items.map((item, key) => (
      <div key={key}>item: {item.text}</div>
    ));
  });
  export default function App() {
    log('renderApp');
    const [count, setCount] = useState(0);
    const [items, setItems] = useState(getInitialItems(10));
    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>
          inc
        </button>
        <List items={items} />
      </div>
    );
  }
  ```
- Above's explanation:
  - In this example memoization works properly and reduces number of renders.
  - During mount renderApp and renderList are logged, but when inc is clicked, only renderApp is logged.

### Memoization & callback
- Beware, passing callback to memoized component can cause subtle bugs.
- Example:
  ```javascript
  function App() {
    log('renderApp');

    const [count, setCount] = useState(0);
    const [items, setItems] = useState(getInitialItems(10));

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <h1>{count}</h1>
          <button onClick={() => setCount(count + 1)}>
            inc
          </button>
        </div>
        <List
          items={items}
          inc={() => setCount(count + 1)}
        />
      </div>
    );
  }
  ```
- Above's explanation:
  - In this example, our memoization fails. Since we are using inline lambda, new reference is created for each render, making React.memo useless.
  - We need a way to memoize the function itself, before we can memoize the component.
  

### useCallback
- `useMemo` is useful for expensive calculations, `useCallback` is useful for passing callbacks needed for optimized child components.
- Example:
  ```javascript
  function App() {
    log('renderApp');

    const [count, setCount] = useState(0);
    const [items, setItems] = useState(getInitialItems(10));

    const inc = useCallback(() => setCount(count + 1));

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <h1>{count}</h1>
          <button onClick={inc}>inc</button>
        </div>
        <List items={items} inc={inc} />
      </div>
    );
  }
  ```
- Above's explanation:
  - In this example, our memoization fails again.renderList is called every time inc is pressed.
  - Default behavior of useCallback is to compute new value whenever new function instance is passed.
  - Since inline lambdas create new instance during every render, useCallback with default config is useless here.

### `useCallback` with input
- Basic form:
  ```javascript
  const inc = useCallback(() => setCount(count + 1), [count]);
  ```
- Explanation:
  - `useCallback` takes second argument, an array of inputs and only if those inputs change will useCallback return new value.
  - In this example, useCallback will return new reference every time count changes.
  - Since count changes during each render, useCallback will return new value during each render. This code does not memoize as well.
- Another form:
  ```javascript
  const inc = useCallback(() => setCount(count + 1), []);
  ```
- Explanation:
  - `useCallback` can take an empty array as input, which will call inner lambda only once and memoize the reference for future calls.
  - This code does memoize, one renderApp will be called when clicking any button, main inc button will work correctly, but inner inc buttons will stop working correctly.
  - Counter will increment from 0 to 1 and it will stop after that.
  - Lambda is created once, but called multiple times. Since count is 0 when lambda is created, it behaves exactly as the code below:
    ```javascript
    const inc = useCallback(() => setCount(1), []);
    ```

### useState with functional updates
- Example:
  ```javascript
  const inc = useCallback(() => setCount(c => c + 1), []);
  ```
- Explanation:
  - Setters returned by useState can take function as an argument, where you can read previous value of a given state.


### useReducer
- Example:
  ```javascript
  const [count, dispatch] = useReducer(c => c + 1, 0);
  ```
- `useReducer` memoization works exactly as useState in this case.
- Since `dispatch` is guaranteed to have same reference across renders, `useCallback` is not needed, which makes code less error-prone to memoization related bugs.


### useReducer vs useState
- `useReducer` is more suited for managing state objects that contain multiple sub-values or when the next state depends on the previous one.


**[⬆ back to top](#list-of-contents)**

</br>

---

## [Use React.memo() wisely](https://dmitripavlutin.com/use-react-memo-wisely/) <span id="content-10"><span>

### Introduction
- Users enjoy fast and responsive user interfaces (UI). A UI response delay of fewer than 100 milliseconds feels instant to the user but a delay between 100 and 300 milliseconds is already perceptible.
- To improve user interface performance, React offers a higher-order component React.memo(). When React.memo() wraps a component, React memoizes the rendered output of the wrapped component then skips unnecessary renderings.

### 1. React.memo()
- When a component is wrapped in React.memo(), React renders the component and memoizes the result. Before the next render, if the new props are the same, React reuses the memoized result skipping the next rendering.
- Example:
  ```javascript
  export function Movie({ title, releaseDate }) {
    return (
      <div>
        <div>Movie title: {title}</div>
        <div>Release date: {releaseDate}</div>
      </div>
    );
  }

  export const MemoizedMovie = React.memo(Movie);
  ```
- React reuses the memoized content as long as title and releaseDate props are the same between renderings:
  ```javascript
  // First render - MemoizedMovie IS INVOKED.
  <MemoizedMovie 
    title="Heat" 
    releaseDate="December 15, 1995" 
  />

  // Second render - MemoizedMovie IS NOT INVOKED.
  <MemoizedMovie
    title="Heat" 
    releaseDate="December 15, 1995" 
  />
  ```
- You gain a performance boost: by reusing the memoized content, React skips rendering the component and doesn’t perform a virtual DOM difference check.
- By default React.memo() does a shallow comparison of props and objects of props.
- To customize the props comparison you can use the second argument to indicate an equality check function:
  ```javascript
  React.memo(Component, [areEqual(prevProps, nextProps)]);
  ```
- `areEqual(prevProps, nextProps)` function must return true if `prevProps` and `nextProps` are equal.
- Example:
  ```javascript
  function moviePropsAreEqual(prevMovie, nextMovie) {
    return prevMovie.title === nextMovie.title
      && prevMovie.releaseDate === nextMovie.releaseDate;
  }

  const MemoizedMovie2 = React.memo(Movie, moviePropsAreEqual);
  ```

### 2. When to use React.memo()
- When... Hmm?
  ![when to use react memo](https://dmitripavlutin.com/static/c07d2ce4ede6301197b9605a75ae9b4e/5fd6b/when-to-use-react-memo-infographic.jpg)
- The best case of wrapping a component in React.memo() is when you expect the functional component to render often and usually with the same props.
- A common situation that makes a component render with the same props is being forced to render by a parent component.
- Example:
  ```javascript
  function MovieViewsRealtime({ title, releaseDate, views }) {
    return (
      <div>
        <Movie title={title} releaseDate={releaseDate} />
        Movie views: {views}
      </div>
    );
  }
  ```
  ```javascript
  // Initial render
  <MovieViewsRealtime 
    views={0} 
    title="Forrest Gump" 
    releaseDate="June 23, 1994" 
  />

  // After 1 second, views is 10
  <MovieViewsRealtime 
    views={10} 
    title="Forrest Gump" 
    releaseDate="June 23, 1994" 
  />

  // After 2 seconds, views is 25
  <MovieViewsRealtime 
    views={25} 
    title="Forrest Gump" 
    releaseDate="June 23, 1994" 
  />

  // etc
  ```
- Every time views prop is updated with a new number, MovieViewsRealtime renders. This triggers Movie rendering too, even if title and releaseDate remain the same.
- Use the memoized component:
  ```javascript
  function MovieViewsRealtime({ title, releaseDate, views }) {
    return (
      <div>
        <MemoizedMovie title={title} releaseDate={releaseDate} />
        Movie views: {views}
      </div>
    )
  }
  ```
- The more often the component renders with the same props, the heavier and the more computationally expensive the output is, the more chances are that component needs to be wrapped in React.memo().


### 3. When to avoid React.memo()
- If the component isn’t heavy and usually renders with different props, most likely you don’t need React.memo().
- Use the following rule of thumb: don’t use memoization if you can’t quantify the performance gains.
- Performance-related changes applied incorrectly can even harm performance. Use React.memo() wisely.
- Extend PureComponent class or define a custom implementation of shouldComponentUpdate() method if you need memoization for class-based components.
- If a component usually renders with different props, don't use `React.memo`.

### 4. React.memo() and callback functions
- The function object equals only to itself.
- Every time a parent component defines a callback for its child, it creates new function instances.
- A component that accepts a callback must be handled with care when applying memoization.
- Example:
  ```javascript
  function MyApp({ store, cookies }) {
    return (
      <div className="main">
        <header>
          <MemoizedLogout
            username={store.username}
            onLogout={() => cookies.clear('session')}
          />
        </header>
        {store.content}
      </div>
    );
  }
  ```
- Even if provided with the same username value, MemoizedLogout renders every time because it receives new instances of onLogout callback.
- To fix it, onLogout prop must receive the same callback instance. Let’s apply useCallback() to preserve the callback instance between renderings:
  ```javascript
  const MemoizedLogout = React.memo(Logout);

  function MyApp({ store, cookies }) {
    const onLogout = useCallback(
      () => cookies.clear('session'), 
      [cookies]
    );
    return (
      <div className="main">
        <header>
          <MemoizedLogout
            username={store.username}
            onLogout={onLogout}
          />
        </header>
        {store.content}
      </div>
    );
  }
  ```
- `useCallback(() => cookies.clear('session'), [cookies])` always returns the same function instance as long as cookies is the same.



**[⬆ back to top](#list-of-contents)**

</br>

---
## References
- https://serverless-stack.com/chapters/understanding-react-hooks.html
- https://reactjs.org/docs/hooks-intro.html
- https://reactjs.org/docs/hooks-overview.html
- https://reactjs.org/docs/hooks-state.html
- https://reactjs.org/docs/hooks-effect.html
- https://reactjs.org/docs/hooks-rules.html
- https://reactjs.org/docs/hooks-custom.html
- https://reactjs.org/docs/hooks-reference.html
- https://medium.com/@sdolidze/react-hooks-memoization-99a9a91c8853
- https://dmitripavlutin.com/use-react-memo-wisely/