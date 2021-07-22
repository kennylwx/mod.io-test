# Task: Retrieve, display and test

## Running the app

View the app live [here](https://blissful-montalcini-e1af61.netlify.app/). Alternatively, download and `yarn dev` To run in dev mode, and `yarn test:unit` to run the tests.

## Post Task Reflection

Having only less than 2 nights of work time, finishing up this task proved to be a feat. Although I covered all of the use cases, I have written insufficient tests for them. Lesson to learn, tests should be written as components are developed, not when you complete an app.

### Things that still needs to be done

1. I've been having issues with mocking axios calls in my test cases. As my components relied a lot on compositional API for conditional renderings, I do not know how to stimulate them in a unit test environment, alongside with mocking axios calls. This needs to be further investigated.
   - Writing the tests after developing might not be the best option in hindsight. There's a lot of convoluted logic attached between Views and their components, and in order to test them I have to separate them out. (Really makes a good case for TDD)

3. Fix Verifiation Security Code Interface. There are multiple listeners that are overriding each other attached to the component. 
   - Once you paste, the focus goes out of wack, and you can't `backspace` appropriately.
   - After pasting, typing has some issues as well.
   - Occasionally, pasting the code does not paste all the Characters. Some are missing.
   - Pasting something else entirely (other symbols) causes it to stop working normally.

### Things that didn't worked so well

1. This is my first time using Compositional API, and it is hard to get your head around. I initially thought it was going to be similar to React Hooks, but that was an oversight. Vue3 has entirely different approaches. Especially when trying to bind data (2 way) between a child and parent, or when updating a parent state from a child, or vice versa. The syntax is uneccesarily hard to figure out, as the resources out there is muddied with different approaches (options API? composition API? why not both?). Not to mention, the added complexity, when both Vue3 and Vue2 approaches are acceptable, and the relatively limited amount of resources for Vue3. It really made me appreciate React and the backings of a large community. 

2. A lot of the tools that are available to Vue2 are not available to Vue3, or atleast they are released but at a premature stage. For instance, vue-router 4 is compatible with Vue 3. Anything below 4, is for Vue 2. Took me a long time to figure that out. For some reason, `yarn add vue-router` comes with vue-router 3.5. Vue-utils 4 and up is only available to Vue 3, however, they have yet to release the rest of their features. It just seems like Vue3 is currently at a transitional stage, which is understandable, given its release only less than a year ago. 

3. I initially took on Typescript, as I thought it would help, but it proved to be the opposite (at least in the short run). It took out a lot of my time, as I had to figure out how the types of new APIs (Vue3), which I am unfamiliar with.

4. In hindsight, I probably should have used a linter (ESLint + Airbnb). Although I am using prettier, just having a standardised JS format would be better for overall readability.

### Things that did.

1. I used Postman to test out the APIs listed on [mod.io docs](https://docs.mod.io/?javascript#get-authenticated-user) beforehand, and it was definitely a right move. It's a great tool.

2. One of the highlights was building a verification security code interface. It was interesting, as I had only come across using it. The pasting the security code mechanism still has many issues with it, and I will be solving that first.

## Task

Create an Vitejs app that allows users to sign into modio using their email. \
Once user is logged in, display games as a list of cards.

### Card to display

- Name of game.
- Date added in human readable format.
- Game logo image.
- Game's subscriber total.
- Game's download total.

Write tests to confirm code works.

Components must use Vue composition API.\
Retrieval of games must use logged in user's oauth token.\
Typescript optional.

**Timeframe:** 48 hours

### Resources

modio API documentation: https://docs.mod.io/ \
Vitejs: https://vitejs.dev/ \
API key can be generated after registering @ [mod.io](https://mod.io/)

The purpose of this code challenge is to demonstrate that the developer is able to retrieve data from an external source, format and display retrieved data and write tests to confirm their code works as intended.
