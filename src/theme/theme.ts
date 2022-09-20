import { INewTheme } from "./new-theme";

export const lightTheme: INewTheme = {
  background: "#FFFFFF",
  nav: "",
  donation:"",
  primary: "#512DA8",
  accent1: "",
  accent2: "",
  accent3: "",
  accent4: "",
  accent5: "",
  text1: "#E2EFE6", // #121212
  text2: "#E2EFE6", // #121212
  text3: "", // #121212
  border: "",
  borderHover: "",
  modal: "",
  error: "#D32F2F",
  warn: "#D32F2F",
  dark: false,
};

export const darkTheme: INewTheme = {
  background: "linear-gradient(180deg, #292A31 -12.63%, #000000 100%)",
  donation: "#fff0f0",
  nav: "#6A6E80",
  primary: "#262B3D",
  accent1: "#262b3d",
  accent2: "#C1C8D8",
  accent3: "#719EC4",
  accent4: "#ff5e5e ",
  accent5: "#191a21 ",
  text1: "#ffffff",
  text2: "#366500",
  text3: "#bbc0d0",
  border: "#4D5464",
  borderHover: "#008DED",
  modal: "#262b3d",
  error: "#EF9A9A",
  warn: "#ff5555", //"#FF6363",
  dark: true,
};

export type ThemeType = typeof lightTheme;
