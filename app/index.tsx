import { ThemedView } from "@/components/ThemedView";
import VisitEditForm from "@/components/visits/VisitEditForm";
import Constants from "expo-constants";

export default function Index() {
	return (
		<ThemedView
			style={{
				flex: 1,
				paddingHorizontal: 16,
				paddingTop: Constants.statusBarHeight + 8,
			}}
		>
			<VisitEditForm />
		</ThemedView>
	);
}
