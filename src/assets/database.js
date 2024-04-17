import Database from 'better-sqlite3';

const db = new Database('database.db');

const createTables = () => {
    try {
        const tablePins = `
            CREATE TABLE IF NOT EXISTS pins (
                name STRING PRIMARY KEY,
                lat DECIMAL NOT NULL,
                lon DECIMAL NOT NULL,
                rating INTEGER NOT NULL,
                picture BLOB NOT NULL,
                difficulty STRING NOT NULL
            );
            CREATE UNIQUE INDEX IF NOT EXISTS coordinates ON pins (lat, lon)
        `;
        const tableUsers = `
            CREATE TABLE IF NOT EXISTS users (
                email STRING PRIMARY KEY,
                profilepicture BLOB,
                bio STRING,
                password STRING NOT NULL
            )
        `;
        const tableEvents = `
            CREATE TABLE IF NOT EXISTS events (
                eventID STRING PRIMARY KEY,
                date STRING NOT NULL,
                time INTEGER NOT NULL,
                description STRING NOT NULL
            )
        `;
        const tableCreateEvent = `
            CREATE TABLE IF NOT EXISTS createEvent (
                eventID STRING NOT NULL REFERENCES events,
                name STRING NOT NULL REFERENCES pins
            )
        `;
        const tableInteracts = `
            CREATE TABLE IF NOT EXISTS interacts (
                name STRING NOT NULL REFERENCES pins,
                email STRING NOT NULL REFERENCES users
            )
        `;
        const tableSignUp = `
            CREATE TABLE IF NOT EXISTS signUp (
                email STRING NOT NULL REFERENCES users,
                eventID STRING NOT NULL REFERENCES events
            )
        `;

        const tableTeamScores = `
            CREATE TABLE IF NOT EXISTS team_scores (
                team_name STRING PRIMARY KEY,
                score INTEGER NOT NULL DEFAULT 0
            )
        `;

        db.exec(tablePins);
        db.exec(tableUsers);
        db.exec(tableEvents);
        db.exec(tableCreateEvent);
        db.exec(tableInteracts);
        db.exec(tableSignUp);
        db.exec(tableTeamScores);

        const insertEvents = () => {
            const events = [
                {
                    eventID: 'event1',
                    date: '2024-04-10',
                    time: 1800,
                    description: 'Event 1 description here'
                },
                {
                    eventID: 'event2',
                    date: '2024-04-15',
                    time: 1400,
                    description: 'Event 2 description here'
                },
                {
                    eventID: 'event3',
                    date: '2024-04-20',
                    time: 1600,
                    description: 'Event 3 description here'
                }
            ];

            const insertEventStmt = db.prepare('INSERT INTO events (eventID, date, time, description) VALUES (@eventID, @date, @time, @description)');

            db.transaction(() => {
                for (const event of events) {
                    insertEventStmt.run(event);
                }
            })();

            console.log("Events inserted successfully.");
        };

        insertEvents();

    } catch (error) {
        console.error("Error creating tables: ", error);
    }
};

createTables();

export default db;


// const insertPin = db.prepare('INSERT INTO pin (name, coordinates, rating, picture, description, difficulty) VALUES (?, ?, ?, ?, ?, ?)');
// data.forEach((pin) => {
//     insertPin.run(pin.name, pin.coordinates, pin.rating, pin.picture, pin.description, pin.difficulty);
// });


// const data = [
//     { name: "College", coordinates: "21335", rating: "10",
//     picture: "blob", description: "college road spot", difficulty: "easy" },
//     { name: "UNCW", coordinates: "21335", rating: "5",
//     picture: "blob", description: "spot on campus", difficulty: "medium" },
//     { name: "Wrightsville", coordinates: "21335", rating: "3",
//     picture: "blob", description: "beach spot", difficulty: "hard" }
// ];
// const insertPin = db.prepare('INSERT INTO pin (name, coordinates, rating, picture, description, difficulty) VALUES (?, ?, ?, ?, ?, ?)');
// data.forEach((pin) => {
//     insertPin.run(pin.name, pin.coordinates, pin.rating, pin.picture, pin.description, pin.difficulty);
// });
