import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";

interface Props {
	title: string;
	onPress: () => void;
}

export default function ButtonOutlined(props: Props) {
	return (
		<Pressable onPress={props.onPress}>
			<ThemedText type="defaultSemiBold">{props.title}</ThemedText>
		</Pressable>
	);
}
