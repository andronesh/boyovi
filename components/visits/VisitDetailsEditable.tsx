import { useState } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { ThemedText } from "../ThemedText";
import { deleteVisit, updateVisit, VisitEntity } from "@/database/visitsDAF";
import { useSQLiteContext } from "expo-sqlite";
import VisitEditForm from "./VisitEditForm";
import ButtonOutlined from "../common/ButtonOutlined";

interface Props {
	visit: VisitEntity;
	onUpdated?: (visit: VisitEntity) => void;
	onDeleted?: (id: number) => void;
}

export default function VisitDetailsEditable(props: Props) {
	const db = useSQLiteContext();
	const [collapsed, setCollapsed] = useState(true);
	const [editFormVisible, setEditFormVisible] = useState(false);

	const saveVisit = async (startDate: Date, endDate?: Date) => {
		await updateVisit(db, props.visit.id, startDate, endDate);
		setEditFormVisible(false);
		setCollapsed(true);
		if (props.onUpdated) {
			props.onUpdated(props.visit); // TODO pass updated entity if needed
		}
	};

	const removeVisit = async () => {
		Alert.alert("Точно видалити?", "Ця дія безповоротна.", [
			{ text: "ні, най буде", style: "cancel", onPress: () => {} },
			{
				text: "так, видалити",
				style: "destructive",
				onPress: async () => {
					await deleteVisit(db, props.visit.id);
					setEditFormVisible(false);
					if (props.onDeleted) {
						props.onDeleted(props.visit.id);
					}
				},
			},
		]);
	};

	const showEditForm = () => {
		setEditFormVisible(true);
	};

	const hideEditForm = () => {
		setEditFormVisible(false);
	};

	return (
		<>
			<Pressable onPress={() => setCollapsed(!collapsed)}>
				<ThemedText type="subtitle" style={{ padding: 6 }}>
					{`${new Date(props.visit.startDate).toLocaleDateString("uk")} - ${
						props.visit.endDate ? new Date(props.visit.endDate).toLocaleDateString("uk") : "сьогодні"
					}`}
				</ThemedText>
			</Pressable>
			{!collapsed && !editFormVisible && (
				<View style={styles.row}>
					<ButtonOutlined title="видалити" onPress={removeVisit} />
					<ButtonOutlined title="редагувати" onPress={showEditForm} />
				</View>
			)}
			{editFormVisible && <VisitEditForm visit={props.visit} onCancel={hideEditForm} onSave={saveVisit} />}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 9,
		paddingBottom: 12,
	},
	row: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	dateWrapper: {
		flex: 3,
		justifyContent: "space-between",
		alignItems: "center",
	},
});
