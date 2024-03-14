import Database from 'better-sqlite3';
// const Database = require('better-sqlite3');
const db = new Database('database.db');
// Using better-sqlite3 package to implement the Database API

//create table
const table = `
    CREATE TABLE pins (
        name STRING PRIMARY KEY,
        lat DECIMAL NOT NULL,
        lon DECIMAL NOT NULL,
        rating INTEGER NOT NULL,
        picture BLOB NOT NULL,
        difficulty STRING NOT NULL
    );
    CREATE UNIQUE INDEX coordinates On pins (lat, lon)
`;
const table1 = `
    CREATE TABLE users (
        email STRING PRIMARY KEY,
        profilepicture BLOB,
        bio STRING,
        password STRING NOT NULL
    )
`;
const table2 = `
    CREATE TABLE events (
        eventID STRING PRIMARY KEY,
        signedup BOOLEAN NOT NULL,
        date STRING NOT NULL,
        time INTEGER NOT NULL,
        description STRING NOT NULL
    )
`;
const table3 = `
    CREATE TABLE createEvent (
        eventID STRING NOT NULL REFERENCES events,
        name STRING NOT NULL REFERENCES pins
    )
`;
const table4 = `
    CREATE TABLE interacts (
        name STRING NOT NULL REFERENCES pins,
        email STRING NOT NULL REFERENCES users
    )
`;
const table5 = `
    CREATE TABLE signUp (
        email STRING NOT NULL REFERENCES users,
        eventID STRING NOT NULL REFERENCES events
    )
`;


// execute query
db.exec(table);
db.exec(table1);
db.exec(table2); 
db.exec(table3); 
db.exec(table4); 
db.exec(table5); 


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

db.close(); 

