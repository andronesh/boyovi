import { SQLiteDatabase } from "expo-sqlite";

export type VisitEntity = {
	id: number;
	startDate: number;
	endDate: number | null;
	comment: string | null;
};

export async function getAllVisits(db: SQLiteDatabase): Promise<VisitEntity[]> {
	return await db.getAllAsync<VisitEntity>("SELECT * FROM visits ORDER BY startDate");
}

export async function insertVisit(db: SQLiteDatabase, startDate: Date, endDate?: Date): Promise<number> {
	let result = await db.runAsync(
		"INSERT INTO visits (startDate, endDate) VALUES (?, ?) RETURNING id",
		startDate.getTime(),
		endDate ? endDate.getTime() : null,
	);
	return result.lastInsertRowId;
}

export async function getVisitById(db: SQLiteDatabase, id: number): Promise<VisitEntity | null> {
	return await db.getFirstAsync("SELECT * FROM visits WHERE id=?", id);
}
