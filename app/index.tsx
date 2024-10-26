import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import VisitDetailsEditable from "@/components/visits/VisitDetailsEditable";
import VisitEditForm from "@/components/visits/VisitEditForm";
import { getAllVisits, insertVisit, VisitEntity } from "@/database/visitsDAF";
import Constants from "expo-constants";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, Pressable } from "react-native";

export default function Index() {
	const db = useSQLiteContext();
	const [visits, setVisits] = useState<VisitEntity[]>([]);
	const [editFormVisible, setEditFormVisible] = useState(false);

	const saveVisit = (startDate: Date, endDate?: Date) => {
		insertVisit(db, startDate, endDate);
		setEditFormVisible(false);
		fetchVisits();
	};

	const fetchVisits = () => {
		if (db) {
			getAllVisits(db)
				.then(setVisits)
				.catch((error) => {
					console.error("Failed to fetch visits from DB", error);
					Alert.alert("Не вдалось дістати дати перебування з бази", JSON.stringify(error));
				});
		}
	};

	useEffect(() => {
		fetchVisits();
	}, [db]);

	return (
		<ThemedView
			style={{
				flex: 1,
				paddingHorizontal: 16,
				paddingTop: Constants.statusBarHeight + 8,
				alignItems: "center",
			}}
		>
			{visits &&
				visits.map((visit) => (
					<VisitDetailsEditable key={visit.id} visit={visit} onDeleted={fetchVisits} onUpdated={fetchVisits} />
				))}
			{!editFormVisible && (
				<Pressable onPress={() => setEditFormVisible(true)}>
					<ThemedText type="title">додати заїзд</ThemedText>
				</Pressable>
			)}
			{editFormVisible && <VisitEditForm onCancel={() => setEditFormVisible(false)} onSave={saveVisit} />}
		</ThemedView>
	);
}
