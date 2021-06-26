# React Best Practices

</br>

## List of Contents:
### 1. [15 React Best Practices You Need to Follow in 2021](#content-1)
### 2. [21 Best Practices for a Clean React Project](#content-2)
### 3. [Clean Code vs. Dirty Code: React Best Practices](#content-3)

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

</br>

---

## References:
- https://www.codeinwp.com/blog/react-best-practices/
- https://betterprogramming.pub/21-best-practices-for-a-clean-react-project-df788a682fb
- https://americanexpress.io/clean-code-dirty-code/