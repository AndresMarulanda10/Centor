// Import font families from next/font/google
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

// Configure the Sans font (Inter) with Latin subset and CSS variable
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Configure the Monospace font (Fira Code) with Latin subset and CSS variable
export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
