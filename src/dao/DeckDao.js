import Database from '../services/database';
import CardDao from './CardDao';

export default class DeckDao {

    async createDeck(params){
        const sql = "INSERT INTO decks(name, description) VALUES (?,?)";
        await Database.executeSql(sql, [params.name, params.description]);
    }

    async getDeck(id){
        return {};
    }

    async getAllDecks(){
        const sql = "SELECT id, name, description FROM decks";
        const result = await Database.executeSql(sql);
        return result.rows.raw();
    }

    async deleteDeck(id){
        await new CardDao().deleteAllCardsFromDeck(id);
        
        const sql = "DELETE FROM decks WHERE id = ?";
        await Database.executeSql(sql, [id]);
    }

    async getDecksCardsInfo(){
        const sql = `SELECT decks.id, decks.name,
            SUM(CASE 
                WHEN cards.id IS NOT NULL THEN 1 
                ELSE 0 END
            ) totalCards, 
            SUM(CASE 
                WHEN cards.id IS NOT NULL 
                    AND (DATE(cards.nextReview) <= DATETIME('now') OR cards.nextReview IS NULL) THEN 1 
                ELSE 0 END
            ) cardsToStudy 
        FROM decks
        LEFT JOIN cards 
            ON decks.id = cards.deckId
        GROUP BY decks.id, decks.name 
        ORDER BY decks.name`;

        const result = await Database.executeSql(sql);
        return result.rows.raw();
    }
}