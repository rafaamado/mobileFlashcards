import Database from '../services/database';

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
        const sql = "DELETE FROM decks WHERE id = ?";
        await Database.executeSql(sql, [id]);
    }
}