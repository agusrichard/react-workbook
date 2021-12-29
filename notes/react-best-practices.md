# React Best Practices

</br>

## List of Contents:
### 1. [15 React Best Practices You Need to Follow in 2021](#content-1)
### 2. [21 Best Practices for a Clean React Project](#content-2)
### 3. [Clean Code vs. Dirty Code: React Best Practices](#content-3)
### 4. [Handling async errors with Axios in React](#content-4)
### 5. [How to handle API errors in your web app using axios](#content-5)
### 6. [You Have to Know Closures to be a (Good) React Developer](#content-6)
### 7. [Untold practices to write better React components](#content-7)
### 8. [10 Best Practices Every React Developer Should Follow](#content-8)

</br>

---

## Contents

## [15 React Best Practices You Need to Follow in 2021](https://www.codeinwp.com/blog/react-best-practices/) <span id="content-1"><span>

### 1. Keep components small and function-specific
- Make our component small
- Small component can be reused across multiple projects

### 2. Reusability is important, so keep creation of new components to the minimum required
- Reusing component to achieve consistency
- If any component becomes huge, it's better to break it up into smaller components.

### 3. Consolidate duplicate code - DRY your code
- Keep it brief and concise as possible

### 4. Put CSS in JavaScript
- I don't particularly agree with this. But let's make some modification to this point. This point actually tells us to write our own styling in a different file (specific for which component) and use this style in our component.

### 5. Comment only where necessary
- Like Uncle Bob said, if our code is self-explained, then comments are not necessary.
- If we want to emphasize or make some process is easier to read. Then, writing comments would be a good idea.

### 6. Name the component after the function
- Component's name conveys what the component does
  
### 7. Use capitals for component names

### 8. Mind the other naming conventions

### 9. Separate stateful aspects from rendering
- Keep the operation logic separate from the rendering.
  
### 10. Code should execute as expected and be testable

### 11. All files related to any one component should be in a single folder
- Keep all files relating to any one component in a single folder, including styling files.
- Tests also reside on the same folder

### 12. Use tools like Bit (Good to have, but not necessary)

### 13. Use snippet libraries

### 14. Write tests for all code

### 15. Follow linting rules, break up lines that are too long

**[⬆ back to top](#list-of-contents)**

</br>

---


## [21 Best Practices for a Clean React Project](https://betterprogramming.pub/21-best-practices-for-a-clean-react-project-df788a682fb) <span id="content-2"><span>

### 1. Use JSX ShortHand
```javascript
// Bad
return (
  <Navbar showTitle={true} />
);

// Good
return(
  <Navbar showTitle />  
)
```

### 2. Use Ternary Operators
- If we need to write extensive conditions, it's better to use if-else statement.
- Other than that, use ternary operator
```javascript
// Bad
const { role } = user;

if(role === ADMIN) {
  return <AdminUser />
}else{
  return <NormalUser />
} 

// Good

const { role } = user;

return role === ADMIN ? <AdminUser /> : <NormalUser />
```


### 3. Take Advantage of Object Literals
```javascript
// Bad
const {role} = user

switch(role){
  case ADMIN:
    return <AdminUser />
  case EMPLOYEE:
    return <EmployeeUser />
  case USER:
    return <NormalUser />
}

// Good
const {role} = user

const components = {
  ADMIN: AdminUser,
  EMPLOYEE: EmployeeUser,
  USER: NormalUser
};

const Component = components[role];

return <Componenent />;
```

### 4. Use Fragments

```javascript
// bad
return (
  <div>
     <Component1 />
     <Component2 />
     <Component3 />
  </div>  
)

// Good
return (
  <>
     <Component1 />
     <Component2 />
     <Component3 />
  </>  
)
```

### 5. Don't Define a Function Inside Render
- Keep the logic outside the render

```javascript
// Bad
return (
    <button onClick={() => dispatch(ACTION_TO_SEND_DATA)}>    // NOTICE HERE
      This is a bad example 
    </button>  
)

// Good
const submitData = () => dispatch(ACTION_TO_SEND_DATA)

return (
  <button onClick={submitData}>  
    This is a good example 
  </button>  
)
```

### 6. Use Memo
- It's better to use React.memo if we have a stateless component
```javascript
// Bad

import React, { useState } from "react";

export const TestMemo = () => {
  const [userName, setUserName] = useState("faisal");
  const [count, setCount] = useState(0);
  
  const increment = () => setCount((count) => count + 1);
  
  return (
    <>
      <ChildrenComponent userName={userName} />
      <button onClick={increment}> Increment </button>
    </>
  );
};

const ChildrenComponent =({ userName }) => {
  console.log("rendered", userName);
  return <div> {userName} </div>;
};

// Good
import React ,{useState} from "react";

const ChildrenComponent = React.memo(({userName}) => {
    console.log('rendered')
    return <div> {userName}</div>
})
```

### 7. Put CSS in JavaScript
- It's harder to organize js rather than css


### 8. Use Object Destructuring
```javascript
// Bad
return (
  <>
    <div> {user.name} </div>
    <div> {user.age} </div>
    <div> {user.profession} </div>
  </>  
)

// Good
const { name, age, profession } = user;

return (
  <>
    <div> {name} </div>
    <div> {age} </div>
    <div> {profession} </div>
  </>  
)
```

### 9. String Props Don’t Need Curly Braces

### 10. Remove JS Code From JSX
- Remove any javascript logic out of the jsx
```javascript
// Bad
return (
  <ul>
    {posts.map((post) => (
      <li onClick={event => {
        console.log(event.target, 'clicked!'); // <- THIS IS BAD
        }} key={post.id}>{post.title}
      </li>
    ))}
  </ul>
);

// Good
const onClickHandler = (event) => {
   console.log(event.target, 'clicked!'); 
}

return (
  <ul>
    {posts.map((post) => (
      <li onClick={onClickHandler} key={post.id}> {post.title} </li>
    ))}
  </ul>
);
```

### 11. Use Template Literals
- Use template literals to build large strings

### 12. Import in Order
- The rule of thumb of import would be like this:
  - Build-in
  - External
  - Internal

```javascript
// Bad

import React from 'react';
import ErrorImg from '../../assets/images/error.png';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { PropTypes } from 'prop-types';

// Good

import React from 'react';

import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';

import ErrorImg from '../../assets/images/error.png';
import colors from '../../styles/colors';
```

### 13. Use Implicit return
```javascript
// Bad
const add = (a, b) => {
  return a + b;
}

// Good
const add = (a, b) => a + b;
```

### 14. Component Naming
```javascript
// Bad
import reservationCard from './ReservationCard';

const ReservationItem = <ReservationCard />;

// Good
import ReservationCard from './ReservationCard';

const reservationItem = <ReservationCard />;
```

### 15. Reserved Prop Naming
```javascript
// Bad

<MyComponent style="dark" />

<MyComponent className="dark" />

// Good
<MyComponent variant="fancy" />
```

### 16. Quotes
- Use double quotes from JSX attributes and single quotes for all other JS

```javascript
// Bad
<Foo bar='bar' />

<Foo style={{ left: "20px" }} />

// Good
<Foo bar="bar" />

<Foo style={{ left: '20px' }} />
```

### 17. Prop Naming
- Always use camelCase for prop names or PascalCase if the prop value is a React component.

```javascript
// Bad
<Component
  UserName="hello"
  phone_number={12345678}
/>

// Good

<MyComponent
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```

### 18. JSX in Parentheses
```javascript

return (
    <MyComponent variant="long">
      <MyChild />
    </MyComponent>
);
```


### 19. Self-Closing Tags
- If your component doesn’t have any children, then use self-closing tags. It improves readability.

### 20. Underscore in Method Name
- Do not use underscores in any internal React method.
```javascript
// Bad
const _onClickHandler = () => {
  // do stuff
}

// Good
const onClickHandler = () => {
  // do stuff
}
```

### 21. Alt Prop
- Always include alt prop for `<img/>` tags.

**[⬆ back to top](#list-of-contents)**

</br>

---

## [Clean Code vs. Dirty Code: React Best Practices](https://americanexpress.io/clean-code-dirty-code/) <span id="content-3"><span>

### Theory

- If it isn't feel right, it probably isn't
- If it feels like you’re trying to fit a square peg into a round hole, then pause, step back, and take a break. Nine times out of 10, you’ll come up with a better solution.
- DRYing your code may actually increase code size. However, DRYing your code also generally improves maintainability.
- Clean code is predictable and testable
- Clean code is self-commenting
- Self-commenting code will prevent us to have self-inflicting code and comments. For example, we write some code and its comment. If in another time we find bug, it means that we have to change the comment too.
- Naming things
  - Boolean variables, or functions that return a boolean value, should start with “is,” “has” or “should.”
  - A boolean variable should be a yes-no question
    ```javascript
    // Dirty
    const done = current >= goal;
    // Clean
    const isComplete = current >= goal;
    ```
  - Functions should be named for what they do, not how they do it. Because how you do it may change some day, and you shouldn’t need to refactor your consuming code because of it.
    ```javascript
    // Dirty
    const loadConfigFromServer = () => {
      ...
    };

    // Clean
    const loadConfig = () => {
      ...
    };
    ```
- Clean code follows proven design patterns and best practices
  - Use small functions, each with a single responsibility. This is called the single responsibility principle.
  - Breaking up complex components into smaller ones. This is better for testability.
- Clean code doesn’t (necessarily) take longer to write

### Practical Examples
- DRY up some code
  ```javascript
  // Dirty
  import Title from './Title';
  export const Thingie = ({ description }) => (
    <div class="thingie">
      <div class="description-wrapper">
        <Description value={description} />
      </div>
    </div>
  );
  export const ThingieWithTitle = ({ title, description }) => (
    <div>
      <Title value={title} />
      <div class="description-wrapper">
        <Description value={description} />
      </div>
    </div>
  );

  // Clean
  import Title from './Title';
  export const Thingie = ({ description, children }) => (
    <div class="thingie">
      {children}
      <div class="description-wrapper">
        <Description value={description} />
      </div>
    </div>
  );
  export const ThingieWithTitle = ({ title, ...others }) => (
    <Thingie {...others}>
      <Title value={title} />
    </Thingie>
  );
  ```
- Default values
  ```javascript
  // Dirty
  const Icon = ({ className, onClick }) => {
    const additionalClasses = className || 'icon-large';
    return (
      <span
        className={`icon-hover ${additionalClasses}`}
        onClick={onClick}>
      </span>
    );
  };

  // Clean
  const Icon = ({ className = 'icon-large', onClick }) => (
    <span className={`icon-hover ${className}`} onClick={onClick} />
  );

  // Cleaner
  const Icon = ({ className, onClick }) => (
    <span className={`icon-hover ${className}`} onClick={onClick} />
  );
  Icon.defaultProps = {
    className: 'icon-large',
  };
  ```

- Separate stateful aspects from rendering
  - Data logic and presentation (rendering) should be separated.
  - Instead, write a stateful container component whose single responsibility is to load the data. Then write another component whose sole responsibility is to display the data. This is called the Container Pattern.
  - Separate stateful and stateless components.
  ```javascript
  // Dirty
  class User extends Component {
    state = { loading: true };

    render() {
      const { loading, user } = this.state;
      return loading
        ? <div>Loading...</div>
        : <div>
            <div>
              First name: {user.firstName}
            </div>
            <div>
              First name: {user.lastName}
            </div>
            ...
          </div>;
    }

    componentDidMount() {
      fetchUser(this.props.id)
        .then((user) => { this.setState({ loading: false, user })})
    }
  }

  // Clean
  import RenderUser from './RenderUser';
  class User extends Component {
    state = { loading: true };

    render() {
      const { loading, user } = this.state;
      return loading ? <Loading /> : <RenderUser user={user} />;
    }

    componentDidMount() {
      fetchUser(this.props.id)
        .then(user => { this.setState({ loading: false, user })})
    }
  }
  ```
- Use stateless functional components
  ```javascript
  // Dirty
  class TableRowWrapper extends Component {
    render() {
      return (
        <tr>
          {this.props.children}
        </tr>
      );
    }
  }
  // Clean
  const TableRowWrapper = ({ children }) => (
    <tr>
      {children}
    </tr>
  );
  ```
- Rest/spread
  ```javascript
  // Dirty
  const MyComponent = (props) => {
    const others = Object.assign({}, props);
    delete others.className;
    return (
      <div className={props.className}>
        {React.createElement(MyOtherComponent, others)}
      </div>
    );
  };

  // Clean
  const MyComponent = ({ className, ...others }) => (
    <div className={className}>
      <MyOtherComponent {...others} />
    </div>
  );
  ```

- Destructure when applicable
  - Object destructuring
    ```javascript
    // Dirty
    componentWillReceiveProps(newProps) {
      this.setState({
        active: newProps.active
      });
    }

    // Clean
    componentWillReceiveProps({ active }) {
      this.setState({ active });
    }
    ```
  - Array destructuring
  ```javascript
  // Dirty
  const splitLocale = locale.split('-');
  const language = splitLocale[0];
  const country = splitLocale[1];

  // Clean
  const [language, country] = locale.split('-');
  ```

**[⬆ back to top](#list-of-contents)**

</br>

---


## [React Best Practices](https://dev.to/awedis/react-best-practices-4l4m)

### Separate logic from JSX

Instead of writing the javascript logic inline, it's better to put it somewhere else before the return statement

```javascript
import React from 'react';

function Todo() {
  let condition = true;

  const addHandler = () => {
    if (condition) {
      //do api call
    }
  }

  return (
    <div>
      <button
        onClick={() => addHandler()}
      >Add</button>
    </div>
  )
}

export default Todo;
```

### Split into small components and make the reusable

This is obviously a self-explained statement

### Hooks and Functional Components

- No more 'this'
- Fewer lines of code
- Easier to debug, test and refactor

### Styled-Components
```javascript
// The component
import React from 'react';
import { Text } from './SubTitle.styled';

function SubTitle() {
  return (
    <Text>Hello</Text>
  )
}
export default SubTitle;

// The styling
import styled from "styled-components";

export const Text = styled.span`
  color: #AAA;
  font-size: 20px;
`;
```

**[⬆ back to top](#list-of-contents)**

</br>

---


## [Handling async errors with Axios in React](https://www.intricatecloud.io/2021/06/handling-async-errors-with-axios-in-react/) <span id="content-4"><span>

### Introduction
- 4 scenarios we should handle when working with APIs using axios and react:
  - Handling requests that sometimes take longer than usual and leave the user looking at an empty page
  - Handling requests that have errored and you want to give the user a way out
  - Handling a possible timeout where the request is taking significantly longer than usual and giving the user an updated loading message so they see the page isn't frozen
  - Handling a definite timeout where you want to abort the request to give the user a more specific error message
- Example:
  ```javascript
  const ResultsList = () => {
    const [results, setResults] = useState([])

    // run on load
    useEffect(() => {
      axios.get(apiUrl).then(response => {
        setResults(response.data)
      }).catch(err => {
        console.log(err)
      })
    }, [])

    return (
      <ul>
        { results.map(result => {
            return <li>{result.name}</li>
          })
        }
      </ul>
    )
  }
  ```
- `results` started with as an empty list. Then it catched the result from the API call. Can you find the bugs?


### 1. Handling long response times
- If to get a response took a longer amount of time, probably the user will ask "Am I supposed to see something?". To prevent this sort of question, we can solve it using this:
  ```javascript
  const ResultsList = () => {
  +  const [results, setResults] = useState(null)

  ...

  +  const getListItems = () => {
  +    if(results) {
  +      return results.map(result => {
  +        return <li>{result.name}</li>
  +    })
  +    } else {
  +      return (
  +        <div>
  +          <i class="fas fa-spinner fa-spin"></i>
  +          Results are loading...
  +       </div>
  +      )
  +    }
  +   }
  +
  +  return (
  +    <div>
  +      <ul>{getListItems()}</ul>
  +    </div>
  +    )
    }
  ```
- There are 2 changes
  - Rather than initialize results to an empty array [], its initialized to null.
  - I can then check if I should show a loading message, or if I should show the list with data.


### 2. Handling errors
- Example:
  ```javascript
  const ResultsList = () => {
  const [results, setResults] = useState(null)
  + const [error, setError] = useState(null)

  + const loadData = () => {
  +   return axios.get(apiUrl).then(response => {
  +     setResults(response.data)
  +     setError(null)
  +   }).catch(err => {
  +     setError(err)
  +   })
  + }

    // run on load
    useEffect(() => {
  +   loadData()
  -    ...
    }, [])

  + const getErrorView = () => {
  +   return (
  +     <div>
  +       Oh no! Something went wrong.
  +       <button onClick={() => loadData()}>
  +         Try again
  +.      </button>
  +     </div>
  +   )
  + }

    return (
      <div>
  +    <ul>
  +      {  error ? 
  +        getListItems() : getErrorView() 
  +      }
  +    </ul>
  -    <ul>{getListItems()}</ul>
      </div>
      )
    }
  ```


### 3. Handling a possible timeout
- Every once in awhile, a user will come across a loading spinner, and they'll wonder - "Is it frozen and the icon is just spinning or does it really take this long?"
- If a request is taking awhile, you can give the user a little feedback in the form of, "This is taking longer than usual..."
- Example:
  ```javascript
  + const TIMEOUT_INTERVAL = 60 * 1000

  const loadData = () => {
  +   if (results) setResults(null)

      // make the request
      axios.get(apiUrl).then(response => {
        setResults(response.data)
        setError(null)
      }).catch(err => {
        setError(err)
      })

  +   // show an update after a timeout period
  +   setTimeout(() => {
  +     if (!results && !error) {
  +       setError(new Error('Timeout'))
  +     }
  +   }, TIMEOUT_INTERVAL)
  }

  const getErrorView = () => {
  +   if (error.message === 'Timeout') {
  +     <div>This is taking longer than usual</div>
  +   } else {
        return (
          <div>
            Oh no! Something went wrong.
            <button onClick={() => loadData()}>
             Try again
            </button>
          </div>
        )
  +    }
  }
  ```

### 4. Handling a definite timeout
- Example:
  ```javascript
  const getErrorView = () => {
      if (error.message === 'Timeout') {
        <div>This is taking longer than usual</div>
  +    } else if (error.message.includes('timeout')) {
  +      <div>This is taking too long. Something is wrong - try again later.</div>
  +    } else {
        return ...
      }
  }
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---


## [How to handle API errors in your web app using axios](https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/) <span id="content-5"><span>

### Introduction
- Example:
  ```javascript
  axios.get('/my-highly-available-api').then(response => {
      // do stuff
  })
  .catch(err => {
      // what now?
      console.log(err);
  })
  ```

### Catching axios errors
- If your error object contains a response field, that means your server responded with a 4xx/5xx error.
- Do things like a show a 404 Not Found page/error message if your API returns a 404. Show a different error message if your backend is returning a 5xx or not returning anything at all.
- Due to security constraints on JS in the browser, if you make an API request, and it fails due to crappy networks, the only error you'll see is "Network Error" which is incredibly unhelpful.

### How do you fix it?
- For example, if the request fails, and the page is useless without that data, then we have a bigger error page that will appear and offer users a way out - which sometimes is only a "Refresh the page" button.
- Another example, if a request fails for a profile picture in a social media stream, we can show a placeholder image and disable profile picture changes, along with a toaster message explaining why the "update profile picture" button is disabled.


**[⬆ back to top](#list-of-contents)**

</br>

---


## [You Have to Know Closures to be a (Good) React Developer](https://javascript.plainenglish.io/you-have-to-know-closures-to-be-a-good-react-developer-104fc2f6cd70) <span id="content-6"><span>

### What is a closure?
- A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.
- Closure means, that when JavaScript runs your code, it looks for all variables in your functions, and if it sees a variable in a function that has no declaration (- let, const) inside of it, but in an outer scope (where the function is nested in) it “locks” the value for that variable inside that given function.
- Example:
  ```javascript
  const myOuterFunction = () => {
    let variableInOuterFunction = 'Hello World';
    const myNestedFunction = () => {
      console.log(variableInOuterFunction);
    };
    myNestedFunction();
  };
  myOuterFunction();
  ```
- Notice how we use “variableInOuterFunction” (which is declared in myOuterFunction) inside “myNestedFunction”. That’s a closure. The value “Hello World” is now “closed” (locked) in the nested function.

### Closures in React
- Example:
  ```javascript
  import React, { useEffect, useState } from 'react';
  const ClosuresInReact = () => {
    const [count, setCount] = useState('1');
    const incrementCount = () => {
      setCount(prevCount => +prevCount + 1);
    };
    useEffect(() => {
      const timer = setTimeout(() => {
        incrementCount();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }, [incrementCount]);
    return <div>{`Timer started: ${count}`}</div>;
  };
  export default ClosuresInReact;
  ```
- Using useCallback:
  ```javascript
  import React, { useCallback, useEffect, useState } from 'react';
  const ClosuresInReact = () => {
    const [count, setCount] = useState('1');
    const incrementCount = useCallback(() => {
      setCount(prevCount => +prevCount + 1);
    }, []);
    useEffect(() => {
      const timer = setTimeout(() => {
        incrementCount();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }, [incrementCount]);
    return <div>{`Timer started: ${count}`}</div>;
  };
  export default ClosuresInReact;
  ```

### How to fix the closure issue in React
- React: I have a useEffect hook that has incrementCount as a dependency. It means I should only re-render when incrementCount changes.
- React: I have incrementCount wrapped with the useCallback hook. It means I should memorize the first closure of it (when it ran first) and even if a re-render happens I should not run the function with the refreshed environment (when count is now 2) but with its good old first closure I captured (when count is 1).
- React: useEffect tells me that incrementCount is not changing, so I should not trigger a new render.
- Example:
  ```javascript
  import React, { useCallback, useEffect, useState } from 'react';
  const ClosuresInReact = () => {
    const [count, setCount] = useState('1');
    const incrementCount = useCallback(() => {
      setCount(prevCount => +prevCount + 1);
    }, [count]);
    useEffect(() => {
      console.log('useEffect');
      const timer = setTimeout(() => {
        incrementCount();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }, [incrementCount]);
    return <div>{`Timer started: ${count}`}</div>;
  };
  export default ClosuresInReact;
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---

## [Untold practices to write better React components](https://medium.com/geekculture/untold-practices-to-write-better-react-components-5593122802ec) <span id="content-7"><span>

### Flags
- Example:
  ![](https://miro.medium.com/max/700/1*OJ5AOoXmjG2sBX1jq2VocQ.png)
- Did you see something wrong? yeah, multiple flags are being managed for one API call.
- This is a very simple example with one API call and all three flags are being reset at every effect.
- Now let’s see a better version of this:
  ![](https://miro.medium.com/max/700/1*BigHYirFF5rf_dgku1eVMw.png)
- Management of multiple flags has been reduced to a single flag which is status and the code has become cleaner and more readable. And in the real world, you don't have to worry about checking multiple flags to determine the final state of the component or achieve some functionality.

### useEffect
- We use useEffect hook in function components for side effects.
- Ideally, a component should do only one thing.
- Example:
  ![](https://miro.medium.com/max/605/1*G-ZFlZfdZN_y8bYJoDZsOw.png)
- As you can see the problem, multiple things are being done in a single useEffectcall.
- Though it is readable but harder to understand and manageable.
- Smaller useEffect:
  ![](https://miro.medium.com/max/658/1*gZmoo-PbCsGeKCXIAAwYQg.png)
- If you cant make the component do one thing only, at least make theuseEffect to do one thing only.
- For every new side effect, use new useEffect .

### When to go for separate Component or Hook
- If a component is doing more than one thing then its time to divide it.
- If a thing is being used at more than one place then it is time to take it out and make it a separate entity.


**[⬆ back to top](#list-of-contents)**

</br>

---

## [10 Best Practices Every React Developer Should Follow](https://medium.com/dhiwise/10-best-practices-every-react-developer-should-follow-eb0df653c9) <span id="content-8"><span>

### 1. Break larger components into smaller ones
- That means instead of putting multiple functionalities in one component create one component that will be responsible for single functionality, the principle is called as “single responsibility principle”.
  
### 2. Use Functional Components instead of classes
- Functional components are the stateless component that simply accepts data and display the output in some form, while Class components are stateful components that implement logic and state.
- If you are writing the presentational component which doesn’t need to access the lifecycle method or have its own component state then you should use a functional component.
- On the other hand, if you need to manage the state then use the class component.

### 3. Choose styled-component over other CSS-in-JS libraries
- It enables developers to write CSS which is nicely isolated per component while preserving the full power of cascading.

### 4. Follow React way to Create separate folders for all files related to each component
- Organize files according to components, if there are several small components used by another big component, keep all the related components within that another component folder only and maintain the same hierarchy in the entire project.
- For example, the Form component has small components such as CSS files, icons, images, tests, and other sub-components all these should be placed in one folder.

### 5. Avoid using Indexes as a Key Props
- React uses key props to determine what to render or re-render, as react doesn’t waste time in rerendering duplicates. Thus, when the two elements have the same key one will be omitted by the React.
- Another thing to worry about is, React also re-renders elements whose key has changed for a specific element content though the actual content hasn’t been changed.


### 6. Use default props and prop types

### 7. Avoid using props at initial state components
- When you make the changes to the props next time on the component, it remains unchanged because the previous value will not be updated. The problem can be solved by avoiding the use of props at the initial state.

### 8. Isolate stateful aspects from rendering
- React components can be stateful or stateless. The stateful components keep track of changing data while the stateless components always render the same data.

### 9. Always follow naming conventions
- In react, there are mainly three naming conventions,
  - The component should be PascalCase
  - Elements that need key should be unique
  - Methods should be written in camelCase and not be application-specific

### 10. Write tests for the entire code
- Testing ensures code integrity

**[⬆ back to top](#list-of-contents)**

</br>

---

I should learn something
## References:
- https://www.codeinwp.com/blog/react-best-practices/
- https://betterprogramming.pub/21-best-practices-for-a-clean-react-project-df788a682fb
- https://americanexpress.io/clean-code-dirty-code/
- https://dev.to/awedis/react-best-practices-4l4m
- https://www.intricatecloud.io/2021/06/handling-async-errors-with-axios-in-react/
- https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
- https://javascript.plainenglish.io/you-have-to-know-closures-to-be-a-good-react-developer-104fc2f6cd70
- https://javascript.plainenglish.io/you-have-to-know-closures-to-be-a-good-react-developer-104fc2f6cd70
- https://medium.com/geekculture/untold-practices-to-write-better-react-components-5593122802ec