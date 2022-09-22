# EDA Intro to React Native Workshop

## Welcome!

Thank you for taking the time to check out our Intro to React Native Workshop. While this is a fairly large project, it is broken down into multiple checkpoints and is still in the process of being simplified into a smaller workshop format.

All of the API code, routes, and data management have been provided for you. There is not database setup, rather all data is stored in memory and clears upon every server close.

Please fork and clone this project and play around, use it as a starting point to familiarize yourself with React Native and start making great apps!

---

## Prerequisites

### Text Editor

[Visual Studio Code OSX Download](https://code.visualstudio.com/docs/?dv=osx)

### Node.js (16.17 LTS Release recommended)
[Node.js v16.17.0.pkg Download](https://nodejs.org/dist/v16.17.0/node-v16.17.0.pkg)

[Homebrew Formulae](https://formulae.brew.sh/formula/node)

> `$ brew install node@16`

### Expo Command Line Interface

[Expo Docs](https://docs.expo.dev)

> `$ npm i -g expo-cli`

### Expo Go Mobile Application

[Expo Go Docs](https://expo.dev/client)

[Apple App Store Link](https://itunes.apple.com/app/apple-store/id982107779)

[Google Play Store Link](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

### Xcode 14 (Needed to Access iOS Simulators)

[Apple Developer Web Link](https://developer.apple.com/xcode/)

---

## Checkpoints

### Checkpoint 1
- Initial navigation setup
- Landing page creation
- Sign up functionality

### Checkpoint 2
- Tab navigation setup
- Home screen
- Create new post

### Checkpoint 3
- Account screen
  - Your user
  - Other users
- Settings
  - Logout button

---

## Installation

1. Fork and clone repository to your local machine

2. Locate the **serverAddress.template.js** and the **.env.template.txt** files and make a copy of each file and paste the copy in the same file folder it is found in, except remove **.template** and **.template.txt** from the file name

3. Save your machine's local IP address into the `DEV_SERVER_ADDRESS` environment variable found in the **.env** file (prod can be left blank)

4. Run the commandd: `$ npm i` in your terminal to install all required packages and dependencies

5. After installing all packages, run the command `$ expo start` to open the client development server, and `$ npm run server` to open the provided API

6. To locally test your Expo application, scan the QR code that appeared in the terminal window that is running the Expo Server on your **mobile device** after downloading the **Expo Go App**, or click the `i` key on your keyboard to open an **iOS simulator** on your **mac**

---

## Built With

- [Axios](https://axios-http.com/docs/intro)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Expo SDK and extra Expo packages](https://docs.expo.dev/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [React Native Dotenv](https://www.npmjs.com/package/react-native-dotenv)
- [React Native Keyboard Aware Scroll View](https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view)
- [React Native Safe Area Context](https://www.npmjs.com/package/react-native-safe-area-context)
- [React Native Screens](https://www.npmjs.com/package/react-native-screens)
- [React Native Paper (Material Design)](https://www.npmjs.com/package/react-native-paper)
- [React Navigation](https://reactnavigation.org/)

---

## Support

If you have suggetions or issues, please email me at mason.leonhart@gmail.com