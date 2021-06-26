# React Clean Code

</br>

## List of Contents:
### 1. [How to Write Cleaner React Code](#content-1)
### 2. [React Clean Code](#content-2)
### 3. [Clean Code in React](#content-3)
### 4. [React Patterns — Writing Clean Code](#content-4)
### 5. [Writing Clean React Code](#content-5)
### 6. [Clean Code saves Devs. The Caffeina approach to ReactJS](#content-6)

</br>

---

## Contents

</br>

## [How to Write Cleaner React Code](https://www.freecodecamp.org/news/how-to-write-cleaner-react-code/) <span id="content-1"><span>

### 1. Make use of JSX shorthands

```javascript
// Not so good
// src/App.js

export default function App() {
  return (
    <main>
      <Navbar showTitle={true} />
    </main>
  );
}

function Navbar({ showTitle }) {
  return (
    <div>
      {showTitle && <h1>My Special App</h1>}
    </div>
  )
}

// Better
// src/App.js

export default function App() {
  return (
    <main>
      <Navbar showTitle />
    </main>
  );
}

function Navbar({ showTitle }) {
  return (
    <div>
      {showTitle && <h1>My Special App</h1>} // title shown!
    </div>
  )
}
```

The difference lies on `showTitle={true}` and `showTitle`. Since the default of boolean prop is true. Then keep it simple by using the later.

### 2. Move unrelated code into separate component
- Arguably the easiest and most important way to write cleaner React code is to get good at abstracting our code into separate React components.


```javascript
// Not so good
// src/App.js

export default function App() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <main>
      <Navbar title="My Special App" />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

// Better
// src/App.js

export default function App() {
 return (
    <main>
      <Navbar title="My Special App" />
      <FeaturedPosts />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### 3. Create separate files for each component
- Similar to how we abstract code into separate components to make our app more readable, to make our application files more readable, we can put each component that we have into a separate file.
- Additionally, by including each individual component within its own file, we avoid one file becoming too bloated


### 4. Move shared functionality into React hooks
- Assume that this fetch function would be used in several other places.
```javascript
// src/components/FeaturedPosts.js

import React from 'react';

export default function FeaturedPosts() {
  const [posts, setPosts] = React.useState([]);  	
    
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
- To remove all the copy-paste activity and code duplication we need to do. It's better to create custom react hooks and use it anywhere we need it.
```javascript
// src/hooks/useFetchPosts.js

import React from 'react';

export default function useFetchPosts() {
  const [posts, setPosts] = React.useState([]);  	
    
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return posts;
}
```

### 5. Remove as much JavaScript from your JSX as possible
- Another very helpful, but often neglected way to clean up our components is to remove as much JavaScript from our JSX as possible.

```javascript
// Not so good, because we obscure the jsx by put a literal javascript there.
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li onClick={event => {
          console.log(event.target, 'clicked!');
        }} key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// Better
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()
  
  function handlePostClick(event) {
    console.log(event.target, 'clicked!');   
  }

  return (
    <ul>
      {posts.map((post) => (
        <li onClick={handlePostClick} key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```


### 6. Format inline styles for less bloated code
- Remove inline styles from jsx component
```javascript
// Not so good
// src/App.js

export default function App() {
  return (
    <main style={{ textAlign: 'center' }}>
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h1 style={{ fontWeight: 'bold' }}>{title}</h1>
    </div>
  )
}

// Better
// src/App.js

export default function App() {
  const styles = {
    main: { textAlign: "center" }
  };

  return (
    <main style={styles.main}>
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  const styles = {
    div: { marginTop: "20px" },
    h1: { fontWeight: "bold" }
  };

  return (
    <div style={styles.div}>
      <h1 style={styles.h1}>{title}</h1>
    </div>
  );
}
```

### 7. Reduce prop drilling with React context
- Another essential pattern to employ for your React projects (especially if you have common properties that you want to reuse across your components, and you find yourself writing lots of duplicate props) is to use React Context.
- For example, if we wanted to share user data across multiple components, instead of multiple repeat props (a pattern called props drilling), we could use the context feature that's built into the React library.

</br>

---

## [React Clean Code](https://betterprogramming.pub/8-ways-to-write-clean-react-code-610c502ccf39) <span id="content-2"><span>

This is basically a suggesstion that we need to follow consciously.

### 1. Conditional Rendering Only for One Condition


```javascript
// Bad
import React, { useState } from 'react'

export const ConditionalRenderingWhenTrueBad = () => {
  const [showConditionalText, setShowConditionalText] = useState(false)

  const handleClick = () =>
    setShowConditionalText(showConditionalText => !showConditionalText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionalText ? <p>The condition must be true!</p> : null}
    </div>
  )
}

// Good
import React, { useState } from 'react'

export const ConditionalRenderingWhenTrueGood = () => {
  const [showConditionalText, setShowConditionalText] = useState(false)

  const handleClick = () =>
    setShowConditionalText(showConditionalText => !showConditionalText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionalText && <p>The condition must be true!</p>}
    </div>
  )
}
```
- Don't use ternary operator when we want to return null. It's better to use && operator.

### 2. Conditional Rendering on Either Condition
- If you need to conditionally render one thing when a condition is true and render a different thing when the condition is false, use a ternary operator.

```javascript
// Bad
import React, { useState } from 'react'

export const ConditionalRenderingBad = () => {
  const [showConditionOneText, setShowConditionOneText] = useState(false)

  const handleClick = () =>
    setShowConditionOneText(showConditionOneText => !showConditionOneText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionOneText && <p>The condition must be true!</p>}
      {!showConditionOneText && <p>The condition must be false!</p>}
    </div>
  )
}

// Better
import React, { useState } from 'react'

export const ConditionalRenderingGood = () => {
  const [showConditionOneText, setShowConditionOneText] = useState(false)

  const handleClick = () =>
    setShowConditionOneText(showConditionOneText => !showConditionOneText)

  return (
    <div>
      <button onClick={handleClick}>Toggle the text</button>
      {showConditionOneText ? (
        <p>The condition must be true!</p>
      ) : (
        <p>The condition must be false!</p>
      )}
    </div>
  )
```

### 3. Boolean Props
- If our component need boolean prop it's better to just use the short version. Example, `showModal={true}` to `showModal`.

### 4. String Props
- Don't use curly braces to give a component a string prop. Just give it the literal string itself.

### 5. Event Handler Functions
```javascript
// Bad

import React, { useState } from 'react'

export const UnnecessaryAnonymousFunctionsBad = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <label htmlFor="name">Name: </label>
      <input id="name" value={inputValue} onChange={e => handleChange(e)} />
    </>
  )
}

// Better
import React, { useState } from 'react'

export const UnnecessaryAnonymousFunctionsGood = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <label htmlFor="name">Name: </label>
      <input id="name" value={inputValue} onChange={handleChange} />
    </>
  )
}
```

### 6. Passing Components As Props
```javascript
// Bad
import React from 'react'

const CircleIcon = () => (
  <svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
)

const ComponentThatAcceptsAnIcon = ({ IconComponent }) => (
  <div>
    <p>Below is the icon component prop I was given:</p>
    <IconComponent />
  </div>
)

export const UnnecessaryAnonymousFunctionComponentsBad = () => (
  <ComponentThatAcceptsAnIcon IconComponent={() => <CircleIcon />} />
)

// Better
import React from 'react'

const CircleIcon = () => (
  <svg height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
)

const ComponentThatAcceptsAnIcon = ({ IconComponent }) => (
  <div>
    <p>Below is the icon component prop I was given:</p>
    <IconComponent />
  </div>
)

export const UnnecessaryAnonymousFunctionComponentsGood = () => (
  <ComponentThatAcceptsAnIcon IconComponent={CircleIcon} />
)
```

### 7. Undefined Props
- Undefined props are excluded, so don’t worry about providing an undefined fallback if it's OK for the prop to be undefined.

### 8. Setting State That Relies on the Previous State
```javascript
// Bad
const toggleButton = () => setIsDisabled(!isDisabled)

// Better
const toggleButton = () => setIsDisabled(isDisabled => !isDisabled)
```

</br>

---

## [Clean Code in React](https://davidfeng.us/2019/01/clean-code/) <span id="content-3"><span>

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

An example of refactoring by the author (David Fend)

- Before refactoring (certainly is dirty)
```javascript
import React from 'react';
import { fetchFeaturedBusinesses } from '../../util/business_api_util';

import HomeBarContainer from './home_bar_container';
import SearchBar from '../header/search_bar';
import HomeLinks from './home_links';
import { FeaturedBusinesses, Categories } from './home_util';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultBackground: true,
      loading: true,
      businesses: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleClick();
  }

  handleClick() {
    fetchFeaturedBusinesses().then((businesses) => {
      this.setState((prevState) => ({
        loading: false,
        businesses,
        defaultBackground: !prevState.defaultBackground,
      }));
    });
  }

  homeHero() {
    let homeHeroContent = (
      <div>
        <HomeBarContainer />
        <div className="logo" onClick={this.handleClick}>
          <img src={window.staticImages.homeLogo} />
        </div>
        <div className="home-search">
          <SearchBar />
        </div>
        <HomeLinks />
      </div>
    );
    return (
      <div
        className={
          this.state.defaultBackground ? 'home-header-1' : 'home-header-2'
        }
      >
        {homeHeroContent}
      </div>
    );
  }

  featuredBusinesses() {
    return this.state.loading ? (
      <img className="spinner" src={window.staticImages.spinner} />
    ) : (
      <FeaturedBusinesses businesses={this.state.businesses} />
    );
  }

  render() {
    return (
      <div>
        {this.homeHero()}
        <div className="center">{this.featuredBusinesses()}</div>
        <Categories />
      </div>
    );
  }
}
```

- After clean up the code
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import HomeHero from './HomeHero';
import FeaturedBusinesses from './FeaturedBusinesses';
import Categories from './Categories';

const Home = ({
  handleHomeLogoClick,
  hasDefaultBackground,
  featuredBusinesses,
  isLoading,
}) => (
  <div>
    <HomeHero
      handleHomeLogoClick={handleHomeLogoClick}
      hasDefaultBackground={hasDefaultBackground}
    />
    <FeaturedBusinesses
      featuredBusinesses={featuredBusinesses}
      isLoading={isLoading}
    />
    <Categories />
  </div>
);

export default Home;

Home.propTypes = {
  handleHomeLogoClick: PropTypes.func.isRequired,
  hasDefaultBackground: PropTypes.bool.isRequired,
  featuredBusinesses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
```

### Split the container and presentational components
- Container component handles all the logic
- Presentational component handles the display only
- This will result in having more files, but smaller
- If the logic is straightforward enough and simple, we may not separate these two

### Eslint is your friend
- Recommendation: use eslint-config-airbnb
- Use propTypes

### Break down the component: only one level of abstraction per component
- One component only has to do one thing, and do it well (Single Responsibility Principle)

### Break down the function: only one level of abstraction per function
- The same as the previous point. But this time, it applies to function

### Use more descriptive names

</br>

---

## [React Patterns — Writing Clean Code](https://javascript.plainenglish.io/react-patterns-writing-clean-code-9535f211a6a9) <span id="content-4"><span>

> Disclaimer: After I read this article, it seems like the author is a Vue developer and want to implement the same thing to React, which is not that good in my opinion. So use this summary with caution

### Multi-Properties

If a component has many properties, it's better to write them on their own line.
```javascript
<Content
 foo="bar"
 anotherProp="baz"
 onClick={this.handleClick}
/>
```


### Conditionals
- When involving a question to render a component or not based on some boolean variable, better to use this
  ```javascript
  <div>
   {isLoggedIn && <LogoutLink />}
  </div>
  ```
- When involving a yes-no to render two components, use this
  ```javascript
  <div>
    {isLoggedIn ? <LogoutLink /> : <LoginLink />}
  </div>
  ```

### Loops
- Use map to render a list of objects

</br>

---

## [Writing Clean React Code](https://levelup.gitconnected.com/writing-clean-react-code-74b42f9cc70c) <span id="content-5"><span>

### Make React Components as Short as Possible
- Short component will lead to easier to read and maintain
```javascript
import React, { useState, useEffect } from "react";
const getPerson = async () => {
  const res = await fetch("https://api.agify.io?name=michael");
  return res.json();
};
const Person = () => {
  const [person, setPerson] = useState({});
  const getData = async () => {
    const p = await getPerson();
    setPerson(p);
  };
  useEffect(() => {
    getData();
  }, []);
  return <p>{person.name}</p>;
};
export default function App() {
  return (
    <div className="App">
      <Person />
    </div>
  );
}
```

### Components Which are at the Same Level of Abstraction Should be Together
- This point basically tells us that there is a place to gather all smaller components. All this smaller components are at the same level.
```javascript
import React from "react";
const Menu = () => {
  return (
    <div>
      <button>Save</button>
      <button>Close</button>
    </div>
  );
};
const TextEditor = () => {
  return <textarea />;
};
export default function App() {
  return (
    <div className="App">
      <Menu />
      <TextEditor />
    </div>
  );
}
```

### Reduce the Number of Props to a Minimum
- Just like any functions, we should keep the number of parameters to as small as possible.
```javascript
// Not Good
import React from "react";
const Greeting = ({ greeting, firstName, lastName }) => {
  return (
    <div>
      {greeting}, {firstName} {lastName}
    </div>
  );
};
export default function App() {
  return (
    <div className="App">
      <Greeting greeting="hello" firstName="jane" lastName="smith" />
    </div>
  );
}

// Better
import React from "react";
const Greeting = ({ greeting, firstName, lastName }) => {
  return (
    <div>
      {greeting}, {firstName} {lastName}
    </div>
  );
};
export default function App() {
  return (
    <div className="App">
      <Greeting greeting="hello" firstName="jane" lastName="smith" />
    </div>
  );
}
```

</br>

---

## [Clean Code saves Devs. The Caffeina approach to ReactJS](https://developers.caffeina.com/clean-code-saves-devs-the-caffeina-approach-to-reactjs-1b56ad15aa64) <span id="content-6"></span>


Questions to be asked before doing the pull requestL
- Have I removed all the zombie code?
- Will anyone else be able to understand this code in six months?
- Is it necessary a refactoring that I can not do for reasons of time / information and I have to declare it?

> In simpler terms, write code that you would be proud to take home and show your mother.

### Clean code is self-commenting
- Self-commenting code leads us to have some necessity to write comments. Since our code is self-commenting, why would we have to bother to write comments.
- Naming boolean variables, should start with 'is', 'has', or 'should'
- Make functions as small as possible. It's easier to read, maintain, and test.
- We have to name our functions by what they do, not how they do it
- Event function should have the name of the event
  ```javascript
  // Bad
  const goToNextPage = () => {...}
  <Button onClick={goToNextPage} />

  // Better
  const onNextClick = () => {...}
  <Button onClick={onNextClick} />
  ```
- Declare prop types to make us understand what went wrong
  ```javascript
  const Box = () => {...}

  Box.propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.object
  }
  ```

### Clean code is DRY
- DRY code removes redundancy and repetition

```javascript
// Bad
const BadComponent = () => {
  return (
    <div>
      <input type="text" className="input" />
      <input type="number" className="input" />
    <div>
  )
}


// Good
const Input = ({ type }) => (
  <input type={type} className="input" />
)

const GoodComponent = () => {
  return (
    <div>
      <input type="text" className="input" />
      <input type="number" className="input" />
    <div>
  )
}
```

### Clean code have default values
```javascript
// Bad
const Input = ({ type }) => (
  <input type={type} className="input" />
)

// Good
const Input = ({ type = 'text' }) => (
  <input type={type} className="input" />
)

// Awesome
const Input = ({ type }) => (
  <input type={type} className="input" />
)

Input.defaultProps = {
  type: 'text'
}

```

### Clean code is small and declarative
- Destructuring would be a handy to handle indexing object and array

```javascript
// Rest/Spread
const Component = ({ className, ...others }) => (
  <div className={className}>
    <OtherComponent {...others}>  
  </div>
)

// Array destructuring
const [language, country] = locale.split('-')
```

### Clean code respect a logic
- Respect React life cycle by understanding how to use it properly
- This is the example using class-based components
  ![React life cycle](https://miro.medium.com/max/700/1*tJndnmiNMKGdRFKYHkrvGw.png)

### Clean code avoid side effects
- In JavaScript, primitives are passed by values and object/arrays are passed by reference
- State in JS should be immutable, and only should be changed with setState

### Clean code is isolable and testable
- Each component must be able to be used alone and can be tested independently.


An intermezzo (eventhough this is the last part of the article)
![An intermezzo](https://miro.medium.com/max/500/1*5RhyUqWmrXugwrjchoA5rA.jpeg)

</br>

---


## References:
- https://www.freecodecamp.org/news/how-to-write-cleaner-react-code/
- https://betterprogramming.pub/8-ways-to-write-clean-react-code-610c502ccf39
- https://davidfeng.us/2019/01/clean-code/
- https://javascript.plainenglish.io/react-patterns-writing-clean-code-9535f211a6a9
- https://levelup.gitconnected.com/writing-clean-react-code-74b42f9cc70c
- https://developers.caffeina.com/clean-code-saves-devs-the-caffeina-approach-to-reactjs-1b56ad15aa64