import {
  Mona_Sans,
  Playfair_Display,
  DM_Sans,
  Instrument_Serif,
  Forum,
} from "next/font/google";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font_mona",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font_playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font_dm",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font_instrument",
});

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  style: ["normal"],
  display: "swap",
  variable: "--font_forum",
});

export const fontVariables = [
  monaSans.variable,
  playfairDisplay.variable,
  dmSans.variable,
  instrumentSerif.variable,
  forum.variable,
].join(" ");
