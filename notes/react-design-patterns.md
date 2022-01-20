# React Design Patterns

</br>

## List of Contents:
### 1. [Presentational and Container Components](#content-1)
### 2. [React Clean Architecture](#content-2)
### 3. [3 React Component Design Patterns You Should Know About](#content-3)


</br>

---

## Contents

## [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) <span id="content-1"><span>

> Disclaimer: This article probably outdated and just lie here for historical reason and background knowledge.

- Components are divided into two categories: Container and Presentational.
- My presentational components:
  - Are concerned with how things look.
  - May contain both presentational and container components** inside, and usually have some DOM markup and styles of their own.
  - Often allow containment via this.props.children.
  - Have no dependencies on the rest of the app, such as Flux actions or stores.
  - Don’t specify how the data is loaded or mutated.
  - Receive data and callbacks exclusively via props.
  - Rarely have their own state (when they do, it’s UI state rather than data).
  - Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.
  - Examples: Page, Sidebar, Story, UserInfo, List.

- My container components:
  - Are concerned with how things work.
  - May contain both presentational and container components** inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
  - Provide the data and behavior to presentational or other container components.
  - Call Flux actions and provide these as callbacks to the presentational components.
  - Are often stateful, as they tend to serve as data sources.
  - Are usually generated using higher order components such as connect() from React Redux, createContainer() from Relay, or Container.create() from Flux Utils, rather than written by hand.
  - Examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList.

- Stateful and Stateless. </br>
  Some components use React setState() method and some don’t. While container components tend to be stateful and presentational components tend to be stateless, this is not a hard rule. Presentational components can be stateful, and containers can be stateless too.


**[⬆ back to top](#list-of-contents)**

</br>

---


## [React Clean Architecture](https://kpiteng.medium.com/react-clean-architecture-e4144a0788b6) <span id="content-2"><span>

### Pattern
![Pattern](https://miro.medium.com/max/700/1*PS_Tmt6a8VAPAra_-N1Pew.jpeg)

### React Clean Architecture Covered
- Structure:
  ```shell
  react-clean-architecture
  ├── android
  ├── ios
  ├── src
  │   ├── application
  │   │   ├── common
  │   │   ├── filters
  │   │   ├── logger
  │   │   ├── models
  │   │   ├── persist
  │   │   ├── plugins
  │   │   ├── store
  │   ├── infrastructure
  │   │   ├── api(services)
  │   │   ├── components (common components)
  │   ├── presentation
  │   │   ├── container
  │   │   ├── component
  ├── index.js
  ├── package.json
  └── README.md
  ```

### Application
- Application directory contains the State Management and Common utilities functions and constants.
- Store:
  ```javascript
  // Store/index.js 

  import { init } from '@rematch/core';
  import logger from 'redux-logger';

  import * as models from '../models';
  import { loadingPlugin } from '../plugins';
  import { persistPlugin } from '../persist';

  export default init({
    models,
    plugins: [loadingPlugin, persistPlugin],
    redux: {
      middlewares: [logger],
    },
  });
  ```
- PlugIns: PlugIns itself means to add some value to Redux Store.Here, we are using Loading PlugIns means it will show loading indicator while API is fetching data.
  ```javascript
  import createLoadingPlugin from '@rematch/loading';

  export const loadingPlugin = createLoadingPlugin({
    whitelist: ['ToDo/fetchTasks'],
  });
  ```
- Persist: Persist itself means to Persist something, Here, it will persist Rematch Store. To create persist store it will take few argument, key, whitelist (model — save in persist store), blacklist (model — not saved in persist store), version — help while upgrading application, storage — AsyncStorage (store persist store in AsyncStorage), transform — contains — filters which applied while persist store.
  ```javascript
  import AsyncStorage from '@react-native-community/async-storage';
  import createRematchPersist from '@rematch/persist';
  import { AllFilters } from '../filters';

  export const persistPlugin = createRematchPersist({
    key: 'root',
    whitelist: ['ToDo'],
    version: 1,
    storage: AsyncStorage,
    transforms: AllFilters,
  });
  ```
- Models:
  ```javascript
  import { List } from '../../infrastructure/api/api';
  export const ToDo = {
    state: {
      arrTasks: [],
      arrAPITasks: [],
      totalTasks: 3,
    },
    reducers: {
      setTasks(state, payload) {
        return {
          ...state,
          arrTasks: payload,
        };
      },
      setAPITasks(state, payload) {
        return {
          ...state,
          arrAPITasks: payload,
        };
      },
      clear() {
        return {
          arrBeneficiary: [],
        };
      },
    },
    effects: (dispatch) => ({
      async fetchTasks() {
        try {
          dispatch.ToDo.setTasks([
              {
                  taskID: 1,
                  taskName: 'Task #1',
              }
          ]);
        } catch (error) {
        }
      },
      async fetchTasksFromServer() {
        try {
          const response = await List.getListData().toPromise();
          dispatch.ToDo.setAPITasks(response);
        } catch (error) {
        }
      },
    }),
  };
  ```
- Filters:
  ```javascript
  import { createBlacklistFilter } from 'redux-persist-transform-filter';

  const toDoFilter = createBlacklistFilter('ToDo', ['totalTasks']);

  export const AllFilters = [toDoFilter];
  ```
- Common:
  ```javascript
  exports.globalVars = {
    userSalt: 'TOHV7eOQRAXmbe433BilgtJeCkugs1rgvZ',
    currentCountryCode: '',
  };
  export const BaseURL = "https://jsonplaceholder.typicode.com/";
  export const TaskList = 'todos/';
  export const apiVersion = 'events/';
  export const Authsecret = '';
  export const timeoutDuration = 30000;

  // Error Messages
  export const errorEncountered = 'Error was encountered processing this request';
  export const timeoutMessage =
    "We are unable to fetch data at this time, kindly check your internet connection and we'll reconnect you.";

  ```


### Infrastructure
- Infrastructure contains API (Services) Files, API Handlers, Common Components like Loader, Common TextField, Buttons, etc. Here, I have used AXIOS, you can use JavaScript Fetch and create your API Wrapper class here.
- API (Services):
  ```javascript
  // api/api/List.js

  import APIHandler from '../APIHandler';
  import * as Globals from '../../../application/common/Globals';

  export default {
    getListData: () => APIHandler.get(Globals.TaskList),
  };
  ```
  ```javascript
  // api/APIHandler.js

  import { Alert } from 'react-native';
  import { Observable, throwError, from } from 'rxjs';
  import {
    mergeMap, retryWhen, take, delay, catchError, map,
  } from 'rxjs/operators';
  import axios, { AxiosPromise } from 'axios';
  import * as Globals from '../../application/common/Globals';

  async function handleRequest(req) {
    const ts = new Date().getTime();
    req.headers.Accept = 'application/json';
    req.headers.timestamp = ts;
    return req;
  }

  export default {
    post: (url: string, data: any, options?: any) => processApiRequest(
      axios.post(
        options && options.fullPath ? url : Globals.BaseURL + url,
        data,
        { timeout: Globals.timeoutDuration },
        options && { headers: options },
      ),
    ),
    get: (url: string, options?: any, data?: any) => {
      data = data ? (data instanceof Object && !Object.keys(data).length ? null : data) : null;
      const config = data
        ? { headers: options, data, timeout: Globals.timeoutDuration }
        : { headers: options, data: '', timeout: Globals.timeoutDuration };
      return processApiRequest(
        axios.get(options && options.fullPath ? url : Globals.BaseURL + url, config),
      );
    },
  };
  ```
- Components (Common Components):
  ```javascript
  // components/Loader/index.js

  import React, { Component } from 'react';
  import { View, ActivityIndicator } from 'react-native';
  import Styles from './Styles';

  function Loader(props)  {
      const { loading } = props;
      if (loading) {
          return (
              <View style={Styles.loaderWrapper}>
                  <ActivityIndicator size="large" />
              </View>
          ) 
      } else {
          <View />
      }    
  }

  export default Loader;
  ```

### Presentation
- Presentation contains Component/Container. Component return design of your component, While Container contain wrapper of Component, HOC Wrapper Of Connect (Redux) to use Redux Store | Props into Components.
- Component/Container:
  ```javascript
  // component/ToDo/index.js

  import React from 'react';
  import { SafeAreaView } from 'react-native';
  import TaskListContainer from '../../container/ToDo/TaskListContainer';
  import Styles from './Styles';

  function ToDoManagement() {
      return (
          <SafeAreaView style={Styles.container}>
              <TaskListContainer />
          </SafeAreaView>
      );
  }

  export default ToDoManagement;
  ```
  ```javascript
  // container/ToDo/TaskListContainer.js

  import { connect } from 'react-redux';
  import TaskListComponent from '../../component/ToDo/TaskListComponent';

  const mapStateToProps = ({ ToDo, loading }) => ({
      arrTasks: ToDo.arrTasks,
      loading: loading.effects.ToDo.fetchTasks,
    });
    
    const mapDispatchToProps = ({ 
        ToDo: { 
          fetchTasks,
          fetchTasksFromServer,
        } 
      }) => ({
          fetchTasks: () => fetchTasks(),
          fetchTasksFromServer: () => fetchTasksFromServer()
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
  ```
  ```javascript
  // component/ToDo/TaskListComponent.js

  import React, { useEffect } from 'react';
  import { SafeAreaView, FlatList } from 'react-native';
  import TaskItemContainer from '../../container/ToDo/TaskItemContainer';

  function TaskListComponent(props) {
      useEffect(() => {
          props.fetchTasks();
          props.fetchTasksFromServer();
      }, [])
      return (
          <FlatList
              data={props.arrTasks}
              renderItem={({ item, index }) =>
                  <TaskItemContainer
                      {...item}
                  />}
          />
      );
  }

  export default TaskListComponent;
  view raw
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---

## [3 React Component Design Patterns You Should Know About](https://blog.openreplay.com/3-react-component-design-patterns-you-should-know-about) <span id="content-3"><span>

### 1. Presentational and Container Component Pattern
- In this pattern, components are divided into:
  - Presentation Components: These are components that are responsible for how the UI looks. They don’t have any dependencies with any part of the application and are used to display data.
    ```javascript
    const ItemsList = (props) => {
        return (
        <ul>
            {props.items.map((item) => (
            <li key={item.id}>
                <a href={item.url}>{item.name}</a>
            </li>
            ))}
        </ul>
        );
    };
    ```
- In the example above, our ItemsList component is only responsible for displaying the data passed as props on the User interface
- Presentational components are also called Stateless functional components but can also be written as class components and can contain state that relates to the UI.
- As class component:
  ```javascript
  class TextInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ""
      };
    }
    render() {
      return (
        <input
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })}
        />
      );
    }
  }
  ```
- Container Components: Unlike presentational components, Container components are more responsible for how things work.
- They are usually class components that contain lifecycle methods and Presentational components. It is also where data fetching happens.
  ```javascript
  class TvShowsContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        shows: [],
        loading: false,
        error: ""
      };
    }
    componentDidMount() {
      this.setState({ loading: true, error: "" });
      fetch("https://api.tvmaze.com/schedule/web?date=2020-05-29")
        .then((res) => res.json())
        .then((data) => this.setState({ loading: false, shows: data }))
        .catch((error) =>
          this.setState({ loading: false, error: error.message || error })
        );
    }
    render() {
      const { loading, error, shows } = this.state;
      return (
        <div>
          <h1> Tv Shows </h1>
          {loading && <p>Loading...</p>}
          {!loading && shows && <ItemsList items={shows} />}
          {!loading && error && <p>{error}</p>}
        </div>
      );
    }
  }
  ```
- Do note that Dan also mentions that he’s no longer promoting this pattern as he’s changed his view on the matter since he originally coined it. However, you might find it useful for your particular use case which is why I thought it relevant to be mentioned on this list.

### 2. Provider Pattern
- One major problem faced by React developers is Prop drilling. Prop drilling is a scenario in which data(props) is passed down to different components until it gets to the component where the prop is needed.
- Snippet:
  ```javascript
  import { createContext } from "react";
  const ThemeContext = createContext({
    theme: "light",
    setTheme: () => {}
  });
  export default ThemeContext;
  ```
- Wrapping component inside context provider:
  ```javascript
  import React, { useState, useMemo } from "react";
  import Header from "./Header";
  import Main from "./Main";
  import ThemeContext from "./context";
  import "./styles.css";
  export default function App() {
    const [theme, setTheme] = useState("");
    const value = useMemo(() => ({ theme, setTheme }), [theme]);
    return (
      <ThemeContext.Provider value={value}>
        <div className="container">
          <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    );
  }
  ```
- Mutate and retrieve data using context:
  ```javascript
  import { useContext } from "react";
  import ThemeContext from "./context";
  const Header = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
      if (theme === "dark") {
        setTheme("");
        return;
      }
      setTheme("dark");
      return;
    };
    return (
      <header className={theme === "dark" && "dark"}>
        <h1> Tv Shows </h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </header>
    );
  };
  export default Header;
  import { useContext } from "react";
  import ThemeContext from "./context";
  const Main = () => {
    const { theme } = useContext(ThemeContext);
    return (
      <main className={theme === "dark" && "dark"}>
        <h2>
          {" "}
          {theme === "dark" ? "Dark theme enabled" : "Light theme enabled"}
        </h2>
      </main>
    );
  };
  export default Main;
  ```
- Open Source Session Replay: Use this to debug a web application in project. It allows you to monitor and replya everything your users do and shows how your app behaves for every issue.

### 3. Compound Components Pattern
- Compound components are components that share a state and work together to achieve a common goal.
- Implementation of the Menu component in Material UI:
  ```javascript
  import * as React from 'react';
  import Menu from '@mui/material/Menu';
  import MenuItem from '@mui/material/MenuItem';

  export default function MaterialMenu() {
    return (
      <div>
        <Button> Menu </Button>
        <Menu>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
  ```
- Implementation of this design patter:
  ```javascript
  import {
    createContext,
    useState,
    useCallback,
    useMemo,
    useContext
  } from "react";
  import "./styles.css";
  const MenuContext = createContext();
  const Menu = ({ children, defaultSelected }) => {
    const [selectedItem, setSelectedItem] = useState(defaultSelected);
    const toggleSelectedItem = useCallback(
      (item) => {
        if (item !== selectedItem) {
          setSelectedItem(item);
          return;
        }
        selectedItem("");
      },
      [selectedItem, setSelectedItem]
    );
    const value = useMemo(
      () => ({
        toggleSelectedItem,
        selectedItem
      }),
      [toggleSelectedItem, selectedItem]
    );
    return (
      <MenuContext.Provider value={value}>
        <menu className="menu">{children}</menu>
      </MenuContext.Provider>
    );
  };
  ```
- We’ve created a context object, MenuContext, for the Menu component using the createContext function provided by the React Context API. This will hold the shared state for the Menu and MenuItem components.
- We’ve also created a state for a selected menu item. This will allow us to update the context similar to what we did in the Provider Pattern since the Context API is stateless by design.
- Snippet:
  ```javascript
  const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
      throw new Error(
        "Menu item component cannot be used outside the Menu component."
      );
    }
    return context;
  };
  const MenuItem = ({ value, children }) => {
    const { toggleSelectedItem, selectedItem } = useMenuContext();
    return (
      <button
        onClick={() => toggleSelectedItem(value)}
        id={`${value}-menu-item`}
        className={`menu__item ${selectedItem === value && "active"}`}
      >
        {children}
      </button>
    );
  };
  ```
- Building MenuItem component:
  ```javascript
  const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
      throw new Error(
        "Menu item component cannot be used outside the Menu component."
      );
    }
    return context;
  };
  const MenuItem = ({ value, children }) => {
    const { toggleSelectedItem, selectedItem } = useMenuContext();
    return (
      <button
        onClick={() => toggleSelectedItem(value)}
        id={`${value}-menu-item`}
        className={`menu__item ${selectedItem === value && "active"}`}
      >
        {children}
      </button>
    );
  };
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---

## References:
- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- https://kpiteng.medium.com/react-clean-architecture-e4144a0788b6
- https://blog.openreplay.com/3-react-component-design-patterns-you-should-know-about