# React Design Patterns

</br>

## List of Contents:
### 1. [Presentational and Container Components](#content-1)
### 2. [React Clean Architecture](#content-2)


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

## References:
- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- https://kpiteng.medium.com/react-clean-architecture-e4144a0788b6