const sql = [
`CREATE TABLE IF NOT EXISTS decks(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(20), 
    description VARCHAR(50)
);`,

`CREATE TABLE IF NOT EXISTS cards(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deckId INTEGER NOT NULL,
    front VARCHAR(1000) NULL, 
    back VARCHAR(1000) NULL, 
    creationTime TEXT NOT NULL,
    lastReview TEXT NULL,
    nextReview TEXT NULL,
    countReviews INTEGER DEFAULT 0,
    frontImage TEXT NULL,
    backImage TEXT NULL,
    
    FOREIGN KEY (deckId)
       REFERENCES decks (id) 
);`
];

export default sql;