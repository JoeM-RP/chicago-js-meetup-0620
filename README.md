# chicago-js-meetup-0620

A little demo of some fun things with React Native for Chicago JS Meetup, 20 June 2023.

I’ll be taking a simple example of a react web component and converting it to a native mobile component in react native for the purpose of migrating a web-only app to be cross platform (iOS, Android, and Web) using a single code base. As part of the talk, I’ll also be setting up a basic React Native project using Expo

## Script

- Review React.js

- Review desired component

- Download Expo Go from your favorite App Store for Android or iOS, or play along from your browser: <https://snack.expo.dev/@git/github.com/JoeM-RP/chicago-js-meetup-0620:demo-app-native>

- Make a new expo project: `npx create-expo-app --template`
  - Choose a template: `blank (typescript)`
  - What is your app named? `demo-app-native`

- `cd demo-app-native`
- `yarn`
- `yarn ios`

- copy fetch from web:

```javascript
  const [userCard, setUserCard] = useState<User>();

  useEffect(() => {
    fetch("https://randomuser.me/api/?nat=us,fr,gb,mx,in")
      .then((response) => response.json())
      .then((json) => {
        setUserCard(json.results[0]);
      });
  }, []);
```

- copy types folder/file, import types

- Stub out `renderUserCard`

- Convert some elements:
  - `<div>` --> `<View>`
  - `<p>` --> `<Text>`
  - `<img>` --> `<Image>`

- Make a touchable opacity function

- Translate styles

- bonus - back to the web! `npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1`

- Add some platform styles

```javascript
  card: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    rowGap: 8,
    width: '100%',
    ...Platform.select({
      ios: {
        width: "100%"
      },
      android: {
        width: "100%"
      },
      web: {
        maxWidth: "50%",
      }
    }),
  },
```

- bonus bonus: media queries!!

- `yarn add @expo/match-media react-responsive`

```javascript

import { useMediaQuery } from "react-responsive";

  const isTabletOrMobileDevice = useMediaQuery({
    maxWidth: 1224,
    // alternatively...
    query: "(max-width: 1224px)"  
  });
  if (isTabletOrMobileDevice) {
    return (<Text>Hi Mobile Users 👋</Text>)
  }
  return (<Text>👋 Hello Desktop People</Text>)
```
