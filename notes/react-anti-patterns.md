# React Anti Patterns

</br>

## List of Contents:
### 1. [React antipatterns to avoid](#content-1)

</br>

---

## Contents

## [React antipatterns to avoid](https://itnext.io/react-antipatterns-to-avoid-350929bdebf0) <span id="content-1"><span>

### Putting everything in Redux
- The problem is that once new developers learn Redux, they start using it like a magic wand to solve all of their issues.
- You are code loses intent. If everything is in Redux, it’s not clear if your code is supposed to have local or global scope.
- Performance degrades when you use Redux for frequent events, like tracking form input.
- The rule of thumb: Only use Redux for truly global data, like user session or app theme.

### Storing everything as a state
- The rule of thumb: Before storing a variable in the state, ask yourself: “Can I somehow derive this variable based on other data I’m already storing?”

### Passing props using spread operator everywhere
- You pass props to a child component using {...props}. It looks neat, and you might think you're making your code more concise. But the truth is that over time your code will be less predictable and harder to understand.
- When you start passing props using spread operator everywhere, it’s not immediately clear which props your child components actually need.
- The rule of thumb: Generally avoid passing props using the spread operator. One time when it’s justified is when writing a container component or HOC that renders and enhances its children.

### Declaring components inside of components
- Writing components inside of their parents is a bad idea for two reasons:
  - Your code becomes tightly coupled. Your inner component becomes dependent on the closure scope of its parent.
  - Performance degrades. The parent component will re-create the declaration function of the child component on each render.
- The rule of thumb: Avoid declaring components inside their parents.

### Passing too much information to components
- Presentational components are components that solely output HTML. They do not hold state and are not handling any behavioral logic.
- Smart components usually handle state and provide data and behavior to presentational components by making API requests, mutating redux, etc.
- With presentational components, you should only pass data necessary for it to render. 
- Presentational components shouldn’t decide whether to render their content. That logic should be handled by the smart components instead.
- Example:
  ![Example](https://miro.medium.com/max/700/1*T4vQhStViP_yR_zlTZP5xg.png)
- Better way:
  ![Better way](https://miro.medium.com/max/700/1*Mkg2JcvkhKRhRwR5UB6C2A.png)
- When possible, pass only primitives to presentational components. Doing so simplifies optimizing their performance later on. Instead of passing the whole user object. Just It's better to write it as, firstName, lastName, and email.
- This makes it easier to reduce the number of re-renders using React.memo. The reason is that React compares object props based on the reference, while primitives are compared based on value.
- To summarize, here are the problems with passing too much information to components:
  - Harder to distinguish between smart and presentational components. The primary logic of your application should be handled by smart components, while presentational ones solely output HTML.
  - Performance worsens. When you pass too many props to the component, it will re-render each time those props change, resulting in redundant re-renders.

### Overoptimizing performance
- Sometimes developers start optimizing their code before there’s any real issue. That’s a bad practice for two simple reasons:
  - Complicated and over-engineered code. Trying to solve the problem before there is one is the surest way to overcomplicate your code.
  - Wasted time. You could be building out new features and solving the problems that matter instead.

### Huge component trees
- Usually, this problem arises when you don’t take time to properly separate the logical and presentational pieces of your code.
- Example:
  ![Example](https://miro.medium.com/max/700/1*6v_opO6l27-BXN-hbNd6lg.png)
- Yuck right? It’s very hard to decipher what’s going on here. We have several areas for improvement:
  - Refactor long conditional statements into separate variables.
  - Separate pieces of the tree into smaller presentational components.
  - Move the arrow function handlers out of the component tree.
- Better way:
  ![Better way](https://miro.medium.com/max/700/1*aqtI6Olyn9_yo9rBVUpD1Q.png)
- The rule of thumb: Keep component trees clean so that it’s easier to see what the component is supposed to be rendering and when.


**[⬆ back to top](#list-of-contents)**

</br>

---

## References:
- https://itnext.io/react-antipatterns-to-avoid-350929bdebf0