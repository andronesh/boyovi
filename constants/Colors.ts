/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "#11181C",
		background: "#f3f2f8",
		backgroundSecond: "#fff",
		backgroundThird: "#eeeeee",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#ECEDEE",
		background: "#000",
		// background: '#151718',
		backgroundSecond: "#1c1c1e",
		backgroundThird: "#323137",
		// backgroundFourth: "#6a696f",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
};
