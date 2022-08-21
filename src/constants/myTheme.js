import {
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

export default {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  roundness: 100,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "#6fbea3",
    secondary: "#26275f",
    accent: "#767597",
  },
  fonts: {
    light: {
      fontFamily: "Montserrat-Light",
      fontWeight: "300",
    },
    medium: {
      fontFamily: "Montserrat-Medium",
      fontWeight: "500",
    },
    regular: {
      fontFamily: "Montserrat-Regular",
      fontWeight: "400",
    },
    thin: {
      fontFamily: "Montserrat-Thin",
      fontWeight: "100",
    },
    bold: {
      fontFamily: "Montserrat-Bold",
      fontWeight: "700",
    },
  },
};
