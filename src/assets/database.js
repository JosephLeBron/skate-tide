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
            CREATE UNIQUE INDEX IF NOT EXISTS coordinates ON pins (lat, lon);
        `;
        //addition of chosen team for each user
        const tableUsers = `
            CREATE TABLE IF NOT EXISTS users (
                email STRING PRIMARY KEY,
                profilepicture BLOB,
                bio STRING,
                password STRING NOT NULL,
                chosen_team TEXT DEFAULT NULL
            );
        `;
        const tableEvents = `
            CREATE TABLE IF NOT EXISTS events (
                eventID STRING PRIMARY KEY,
                date STRING NOT NULL,
                time INTEGER NOT NULL,
                description STRING NOT NULL
            );
        `;
        const tableCreateEvent = `
            CREATE TABLE IF NOT EXISTS createEvent (
                eventID STRING NOT NULL REFERENCES events,
                name STRING NOT NULL REFERENCES pins
            );
        `;
        const tableInteracts = `
            CREATE TABLE IF NOT EXISTS interacts (
                name STRING NOT NULL REFERENCES pins,
                email STRING NOT NULL REFERENCES users
            );
        `;
        const tableSignUp = `
            CREATE TABLE IF NOT EXISTS signUp (
                email STRING NOT NULL REFERENCES users,
                eventID STRING NOT NULL REFERENCES events
            );
        `;
        //keeps track of team scores in bounty
        const tableTeamScores = `
            CREATE TABLE IF NOT EXISTS team_scores (
                team TEXT PRIMARY KEY,
                score INTEGER NOT NULL DEFAULT 0
            );
        `;

        db.exec(tablePins);
        db.exec(tableUsers);
        db.exec(tableEvents); 
        db.exec(tableCreateEvent); 
        db.exec(tableInteracts); 
        db.exec(tableSignUp); 
        db.exec(tableTeamScores);
        console.log("Tables created.");
        
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
