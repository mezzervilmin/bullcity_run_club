import { Poppins, Open_Sans } from "next/font/google";

export const poppinsHeavy = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

export const poppinsNormal = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});
