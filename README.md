# Task: Retrieve, display and test

## Running the app

`yarn dev` To run in dev mode.

## Post Task Reflection

Having only less than 2 nights of work time, I was unable to finish up the project as intended.

### Things that I couldn't complete in tiime

1. Cover my edge cases. Treating the server as a blackbox. The test cases, would ideally be **Major**
   - Stimulating inputing values, and checking to see if the popup works when success, and not when fails.
   - Check upon putting in security code in popup, the home page is seen, the access token is stored.
   - Write test cases to verify the game objects are being retrieved onMount.
   - Validate diffent use cases during Login, and Verify.
2. Fix Verifiation Security Code Interface. A lot of work can still be done. **Minor**
   - Once you paste, the focus goes out of wack, and you can't `backspace` appropriately.
   - After pasting, typing has some issues as well.
   - Occasionally, pasting the code does not paste all the Characters. Some are missing.
   - Pasting something else entirely (other symbols) causes it to hang.

### Things that I have learned

1. This is my first time using Compositional API, and it is hard to get your head around, especially when trying to bind data (2 way) between a child and parent, or when updating a parent state from a child, or vice versa. The syntax is uneccesarily hard to figure out, as the resources out there is muddied with different approaches. Not to mention, the added complexity, when both Vue3 and Vue2 approaches are acceptable. This just blurs the "right" approach even further. In comparison, React Hooks is way cleaner.

2. vue-router 4 is compatible with Vue 3. Anything below 4, is for Vue 2. Took me a long time to figure that out. For some reason, `yarn add vue-router` comes with vue-router 3.5.

3. I initially took on Typescript, as I thought it would help, but it proved to be the opposite (at least in the short run). It took out a lot of my time, as I had to figure out how the types of new APIs (Vue3), which I am unfamiliar with.

### Things that I have liked

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
