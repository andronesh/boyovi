import { useState } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface Props {
	onCancel: () => void;
	onSave: (startDate: Date, endDate?: Date) => void;
}

export default function VisitEditForm(props: Props) {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	const [dateUnderEdit, setDateUnderEdit] = useState<"start" | "end" | undefined>();

	const deriveDateForEditing = (): Date => {
		const date = dateUnderEdit === "start" ? startDate : endDate;
		return date ? date : new Date();
	};

	const saveVisit = () => {
		if (startDate === undefined) {
			Alert.alert("Дату заїзду потрібно обов'язково вказати!");
			return;
		}
		props.onSave(startDate, endDate);
	};

	return (
		<>
			<ThemedView>
				<View style={styles.row}>
					<ThemedText type="subtitle">час перебування на позиціях:</ThemedText>
				</View>
				<View style={styles.row}>
					<Pressable style={styles.dateWrapper} onPress={() => setDateUnderEdit("start")}>
						<ThemedText type="defaultSemiBold">заїзд</ThemedText>
						<ThemedText type="subtitle">
							{startDate ? startDate.toLocaleDateString("uk") : "вибрати..."}
						</ThemedText>
					</Pressable>
					<Pressable style={styles.dateWrapper} onPress={() => setDateUnderEdit("end")}>
						<ThemedText type="defaultSemiBold">виїзд</ThemedText>
						<ThemedText type="subtitle">
							{endDate ? endDate.toLocaleDateString("uk") : "вибрати..."}
						</ThemedText>
					</Pressable>
					<View style={styles.counterWrapper}>
						<ThemedText type="defaultSemiBold">днів</ThemedText>
						<ThemedText type="subtitle">{"12"}</ThemedText>
					</View>
				</View>
				<View style={styles.row}>
					<Pressable onPress={props.onCancel}>
						<ThemedText type="defaultSemiBold">скасувати</ThemedText>
					</Pressable>
					<Pressable onPress={saveVisit}>
						<ThemedText type="defaultSemiBold">зберегти</ThemedText>
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
		paddingTop: 16,
	},
	dateWrapper: {
		flex: 3,
		justifyContent: "space-between",
		alignItems: "center",
	},
	counterWrapper: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
});
