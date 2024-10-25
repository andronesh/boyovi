import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedBlockProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedBlock({ style, lightColor, darkColor, ...otherProps }: ThemedBlockProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "backgroundSecond");

	return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
