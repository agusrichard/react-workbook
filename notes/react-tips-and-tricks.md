# React Tips and Tricks

</br>

## List of Contents:
### 1. [Best React Hacks For Lazy Devs](#content-1)



</br>

---

## Contents:

## [Best React Hacks For Lazy Devs](hhttps://sean-warman.medium.com/best-react-hacks-for-lazy-devs-b44b533fa923) <span id="content-1"></span>

### 1. Adding console logs to render expressions
- If you wanna log the props to an expression style component but can’t be bothered to convert it, put the log in parentheses then add chopsticks ||:
  ![Image](https://miro.medium.com/max/1400/1*r6-vJesAFHVsWu5o0v-Osg.png)
  

### 2. Trace a function’s call with the Error object
- If you’ve no idea where a function’s being called from, log an Error object in it and you’ll get a stack trace in the console:
  ![](https://miro.medium.com/max/700/1*4sZ3raJy9FHue2dWjm9twA.png)
  ![](https://miro.medium.com/max/700/1*juD71Cp-6Kuq2TpItTV7gQ.png)


### 3. Prefix all your logs to filter out warnings
- Add a distinct string to each of your comments:
  ![](https://miro.medium.com/max/700/1*z6IubwK1xb1sk1-UIVQx5g.png)

### 4. Adding functions to the window
- Want to know what a function does without having to read all the docs? Just add it to the window then you can play with it in the console.
- I do this all the time with moment because I can never remember which functions return what:
  ![](https://miro.medium.com/max/700/1*ZMeLju3lcAaHEEW-imdeWw.png)
  ![](https://miro.medium.com/max/700/1*030i07PJHC-qezefR6hn8A.png)

### 5. Ternary question marks
- Example:
  ![](https://miro.medium.com/max/700/1*rMNsGB3KsVNGRSyx7rqR8A.png)
- This says, if state?.bookings is undefined return {}.
- Whereas || is useful for evaluating if a value is “falsy” (so anything that the if statement thinks is false) ?? only evaluates things that are null or undefined. It’s basically a bit stricter.
- Example:
  ![](https://miro.medium.com/max/700/1*b8E8Hmhulqqb9H31Z0x7Hg.png)

### 6. Optional chaining an object’s [expressed] prop
- Example:
  ![](https://miro.medium.com/max/700/1*Gq8pGp6JTvWHFJNl8fhpjA.png)

### 7. console.group
- If I log the outcome of each loop iteration I’ll get a ton of logs because not only is the loop logging each iteration but React is also calling the function over and over as the component re-renders:
- Example:
  ![](https://miro.medium.com/max/700/1*NehcAZ85vB4PIjHQuol6-A.png)
  ![](https://miro.medium.com/max/700/1*8ipM-AIEwtgcW6fhKQqo2g.png)

### 8. Force re-renders using the key prop
- Need to refresh a component. Force it to re-render by adding a key to it.
  ![](https://miro.medium.com/max/700/1*c0Ij1UH_4YiDb80nhj2uZQ.png)
- Technically you can do it with any prop but key is on every React component so you can use this on a component from a module you’re not in control of.

**[⬆ back to top](#list-of-contents)**

</br>

---
## References
- https://sean-warman.medium.com/best-react-hacks-for-lazy-devs-b44b533fa923