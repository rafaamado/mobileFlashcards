import Database from '../services/database';

export default class CardDao {

    async createCard(card){
        const sql = `INSERT INTO cards (deckId, front, back, creationTime, lastReview, nextReview)
            VALUES (?, ?, ?, ?, ?, ?)`;

        await Database.executeSql(sql, [card.deckId, 
                                        card.front,
                                        card.back, 
                                        new Date().toISOString(), 
                                        null]);
    }

    async getAllCards(){
        const sql = `SELECT 
                id, deckId, front, back, creationTime, lastReview, nextReview, countReviews 
            FROM cards`;
        const result = await Database.executeSql(sql);
        return result.rows.raw();
    }

    async getCard(id){
        const sql = `SELECT 
                id, deckId, front, back, creationTime, lastReview, nextReview, countReviews 
            FROM cards WHERE id = ?`;
        const result = await Database.executeSql(sql, [id]);
        return result.rows.item(0);
    }

    async getCardsToStudy(deckId){
        const sql = `SELECT 
                id, deckId, front, back, creationTime, lastReview, nextReview, countReviews
            FROM cards WHERE deckId = ?
            AND (DATE(nextReview) <= DATETIME('now') OR nextReview IS NULL ) `;

        const result = await Database.executeSql(sql,[deckId]);
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

    async updateCard(card){
        const sql = `UPDATE cards 
        SET front = ?, back = ?, lastReview = ?, nextReview = ?, countReviews = ?, deckId = ? 
        WHERE id = ?`;
        
        await Database.executeSql(sql, [card.front, card.back, card.lastReview, card.nextReview, 
            card.countReviews, card.deckId, card.id]);
    }

    async delete(id){
        const sql = `DELETE FROM cards WHERE id = ? `;
        await Database.executeSql(sql,[id]);
    }

    async deleteAllCardsFromDeck(deckId){
        const sql = `DELETE FROM cards WHERE deckId = ?`;
        await Database.executeSql(sql, [deckId]);
    }
}