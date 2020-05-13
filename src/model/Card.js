export default class Card{

    constructor(){
        this.id = null;
        this.front= "";
        this.back= "";
        this.creationTime = new Date();
        this.lastReview = null;
        this.nextReview = null;
        this.countReviews = 0;
        this.deckId = null;
    }
};