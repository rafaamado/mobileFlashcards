import Database from '../services/database';

export default class CardDao {

    async createCard(card){
        const sql = `INSERT INTO cards (deckId, front, back, creationTime, lastReview, nextReview)
            VALUES (?, ?, ?, DATETIME('now'), ?, ?)`;

        await Database.executeSql(sql, [card.deckId, 
                                        card.front,
                                        card.back, 
                                        null, 
                                        null]);
    }

    async getAllCards(){
        const sql = `SELECT 
                id, deckId, front, back, creationTime, lastReview, nextReview, countReviews 
            FROM cards`;
        const result = await Database.executeSql(sql);
        return result.rows.raw();
    }

    async selectCardsAndDeck(text){
        let sql = `SELECT decks.name, cards.id, cards.front, cards.back 
            FROM cards 
            INNER JOIN decks
                ON cards.deckId = decks.id `;
        
        if(text){
            sql = sql.concat(` WHERE front LIKE ? 
                                  OR back LIKE ? 
                                  OR name LIKE ?`);
            text = `%${text}%`;
            const result = await Database.executeSql(sql, [text, text, text]);
            return result.rows.raw();
        }
        const result = await Database.executeSql(sql);
        return result.rows.raw();
    }


    updateCard(card){
    }
}