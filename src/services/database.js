let  SQLite = require('react-native-sqlite-storage');
const DB = SQLite.openDatabase({ name: 'Flashcards.db' });
import scripts from './scriptsDb';

console.log('Initializing database...');
scripts.forEach( sql => {
    DB.transaction((tx) => {
        tx.executeSql(sql, [], (tx, results) => {});
    });
});

class Database{
    constructor(db){
        this.db = db;
    }
    // working with promises makes the code cleaner 
    // once allows to use await and async
    executeSql(sql,params=[]) {
        return new Promise ( (resolve, reject) => {
            this.db.transaction(
                (tx) => {
                    tx.executeSql(sql, params, 
                        (tx, results) => {
                            resolve(results);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                }
            );
        });  
    }
}
export default (new Database(DB));