import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import DatePicker from "react-native-date-picker";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function VisitEditForm() {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const [dateUnderEdit, setDateUnderEdit] = useState<"start" | "end" | undefined>();

	const deriveDateForEditing = (): Date => {
		const date = dateUnderEdit === "start" ? startDate : endDate;
		return date ? date : new Date();
	};

	return (
		<>
			<ThemedView>
				<ThemedText type="title">Перебування на позиціях</ThemedText>
				<View style={styles.row}>
					<Pressable style={styles.dateWrapper} onPress={() => setDateUnderEdit("start")}>
						<ThemedText type="defaultSemiBold">заїзд</ThemedText>
						<ThemedText type="subtitle">
							{startDate ? startDate.toLocaleDateString() : "вибрати..."}
						</ThemedText>
					</Pressable>
					<Pressable style={styles.dateWrapper} onPress={() => setDateUnderEdit("end")}>
						<ThemedText type="defaultSemiBold">виїзд</ThemedText>
						<ThemedText type="subtitle">{endDate ? endDate.toLocaleDateString() : "вибрати..."}</ThemedText>
					</Pressable>
				</View>
			</ThemedView>

			<DatePicker
				modal
				open={dateUnderEdit !== undefined}
				date={deriveDateForEditing()}
				mode="date"
				locale="uk"
				title={dateUnderEdit === "start" ? "Дата заїзду" : "Дата виїзду"}
				confirmText={"Далі"}
				cancelText={"Скасувати"}
				onConfirm={(date) => {
					if (dateUnderEdit === "start") {
						setStartDate(date);
					} else {
						setEndDate(date);
					}
					setDateUnderEdit(undefined);
				}}
				onCancel={() => {
					setDateUnderEdit(undefined);
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	row: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	dateWrapper: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
});
