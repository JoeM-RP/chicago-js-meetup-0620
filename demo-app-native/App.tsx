import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, Platform } from "react-native";
import { User } from "./types";

/* BONUS */
import { useMediaQuery } from "react-responsive";

export default function App() {
  const [userCard, setUserCard] = useState<User>();

  useEffect(() => {
    fetch("https://randomuser.me/api/?nat=us,fr,gb,mx,in")
      .then((response) => response.json())
      .then((json) => {
        setUserCard(json.results[0]);
      });
  }, []);

  /* BONUS */
  const isTabletOrMobile = useMediaQuery({
    maxWidth: 1224,
    // alternatively...
    query: "(max-width: 1224px)",
    // other fun things...
    // maxDeviceWidth: 1224,
    // query: "(max-device-width: 1224px)",
    // aspectRatio: "16:9",
  });

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  console.info("isBigScreen: " + isBigScreen)
  console.info("isTabletOrMobile: " + isTabletOrMobile)
  console.info("isPortrait:" + isPortrait)
  console.info("isRetina:" + isRetina)

  const renderMediaQuery = () => {
    if (!isDesktopOrLaptop) {
      return (<Text>Hi Mobile Users 👋</Text>)
    }
    return (<Text>👋 Hello Desktop People</Text>)
  }

  let stylesDesktop = StyleSheet.create({})
  // don't forget to merge styles in renderUserCard!
  if (isDesktopOrLaptop)
    stylesDesktop = StyleSheet.create({
      cardDesktop: {
        maxWidth: 750,
      },
    });
  /* End BONUS */

  const openLink = async (link: string) => {
    if (await Linking.canOpenURL(link)) Linking.openURL(link);
    else {
      console.warn("Not a valid link or device/simulator cannot open: " + link);
    }
  }

  const renderTouchable = (prefix: string, displayText: string) => {
    return (
      <TouchableOpacity onPress={async () => await openLink(prefix + displayText)}>
        <Text style={[styles.cardBody, styles.cardLink]}>{displayText}</Text>
      </TouchableOpacity>
    );
  }

  const renderUserCard = () => {
    if(!userCard) return

    const { location, email, name, phone, picture, login } = userCard
    return (
      <View style={[styles.card, stylesDesktop.cardDesktop]}>
        <View style={{ flexDirection: "row", columnGap: 10, marginBottom: 10 }}>
          <Text style={styles.cardTitle}>
            {name.first} {name.last}
          </Text>
          <Text style={[styles.cardTitle, {opacity: .5}]}>
            @{login?.username}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            <Text style={styles.cardBody}>
              {renderTouchable("mailto:", email)}
            </Text>
            <Text style={styles.cardBody}>
              {renderTouchable("tel:", phone)}
            </Text>
          </View>
          <Text style={styles.cardBody}>
            {location?.street?.number} {location?.street?.name}
          </Text>
          <Text style={styles.cardBody}>
            {location?.city}, {location?.state} {location?.postcode}
          </Text>
          <Text style={styles.cardBody}>
            {location?.country}
          </Text>
          <View style={styles.spacer} />
          {renderTouchable('', 'https://randomuser.me/')}
        </View>
        <View style={styles.cardImage}>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
          source={{ uri: picture?.large }}
        />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#E5EAEF"}}>
      <View style={styles.container}>
        {renderMediaQuery()}
        <Text>Open up App.tsx to start working on your app!</Text>
        <View style={styles.spacer} />
        {renderUserCard()}
        <StatusBar style="auto" />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EAEF",
    alignItems: "center",
    padding: 10,
  },
  spacer: {
    height: 20,
  },
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
        // maxWidth: "750px",
      }
    }),
  },
  cardContainer: {
    rowGap: 4,
    columnGap: 4,
  },
  cardTitle: {
    fontWeight: "500",
  },
  cardBody: {
    fontStyle: "italic",
    fontSize: 12,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLink: {
    color: "blue",
  },
  cardImage: {
    borderRadius: 100,
    position: "absolute",
    right: 10,
    bottom: -50,
    borderWidth: 1,
    borderColor: "black",
    padding: 3,
    backgroundColor: 'white'
  },
});

