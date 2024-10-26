import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { ThemedText } from "../ThemedText";
import dayjs from "dayjs";
import { ThemedBlock } from "../ThemedBlock";
import { VisitEntity } from "@/database/visitsDAF";

interface Props {
	visit?: VisitEntity;
	onCancel: () => void;
	onSave: (startDate: Date, endDate?: Date) => void;
}

export default function VisitEditForm(props: Props) {
	const [startDate, setStartDate] = useState<Date | undefined>(
		props.visit ? new Date(props.visit.startDate) : undefined,
	);
	const [endDate, setEndDate] = useState<Date | undefined>(
		props.visit?.endDate ? new Date(props.visit.endDate) : undefined,
	);
	const [daysCount, setDaysCount] = useState<number | undefined>(undefined);

	const [dateUnderEdit, setDateUnderEdit] = useState<"start" | "end" | undefined>();

	useEffect(() => {
		if (startDate && endDate) {
			setDaysCount(dayjs(endDate).diff(dayjs(startDate), "day") + 1);
		}
	}, [startDate, endDate]);

	const deriveDateForEditing = (): Date => {
		const date = dateUnderEdit === "start" ? startDate : endDate;
		return date ? date : new Date();
	};

	const updateDate = (date: Date) => {
		if (dateUnderEdit === "start") {
			setStartDate(date);
		} else {
			setEndDate(date);
		}
		setDateUnderEdit(undefined);
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
			<ThemedBlock style={styles.container}>
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
				</View>
				<View style={styles.row}>
					<Pressable onPress={props.onCancel}>
						<ThemedText type="defaultSemiBold">скасувати</ThemedText>
					</Pressable>
					<Pressable onPress={saveVisit}>
						<ThemedText type="defaultSemiBold">
							{endDate ? `зберегти на ${daysCount} днів` : "зберегти як триваючий"}
						</ThemedText>
					</Pressable>
				</View>
			</ThemedBlock>

			<DatePicker
				modal
				open={dateUnderEdit !== undefined}
				date={deriveDateForEditing()}
				mode="date"
				locale="uk"
				title={dateUnderEdit === "start" ? "Дата заїзду" : "Дата виїзду"}
				confirmText={"Далі"}
				cancelText={"Скасувати"}
				onConfirm={updateDate}
				onCancel={() => {
					setDateUnderEdit(undefined);
				}}
			/>
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
		paddingTop: 16,
	},
	dateWrapper: {
		flex: 3,
		justifyContent: "space-between",
		alignItems: "center",
	},
});
