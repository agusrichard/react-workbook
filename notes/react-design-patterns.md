# React Design Patterns

</br>

## List of Contents:
### 1. [Presentational and Container Components](#content-1)


</br>
</br>

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


## References:
- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0