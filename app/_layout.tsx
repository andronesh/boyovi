import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

export default function RootLayout() {
	return (
		<SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
			<Stack>
				<Stack.Screen name="index" options={{ title: "", headerShown: false }} />
			</Stack>
		</SQLiteProvider>
	);
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
	const DATABASE_VERSION = 1;
	let versionResult = await db.getFirstAsync<{ db_schema_version: number }>("PRAGMA db_schema_version");
	let currentDbVersion = versionResult ? versionResult.db_schema_version : 0;
	console.info("--- currentDbVersion: " + currentDbVersion);
	if (currentDbVersion >= DATABASE_VERSION) {
		return;
	}
	if (currentDbVersion === 0) {
		await db.execAsync(`
      PRAGMA journal_mode = 'wal';
	    CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY NOT NULL, startDate INTEGER NOT NULL, endDate INTEGER, comment TEXT);
	    `);
		console.info("--- table VISITS was created");
		currentDbVersion = 1;
	}
	// if (currentDbVersion === 1) {
	//   Add more migrations
	// }
	await db.execAsync(`PRAGMA db_schema_version = ${DATABASE_VERSION}`); // this doesn't work, use separate table for such info
}
