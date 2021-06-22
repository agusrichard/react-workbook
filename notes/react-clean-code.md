# React Clean Code

## [How to Write Cleaner React Code](https://www.freecodecamp.org/news/how-to-write-cleaner-react-code/)

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

## [React Clean Code](https://betterprogramming.pub/8-ways-to-write-clean-react-code-610c502ccf39)

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

## References:
- https://www.freecodecamp.org/news/how-to-write-cleaner-react-code/