# React Hooks


</br>

## List of Contents:
### 1. [Understanding React Hooks](#content-1)


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


## References
- https://serverless-stack.com/chapters/understanding-react-hooks.html