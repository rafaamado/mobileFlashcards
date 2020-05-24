import axios from 'axios';

const apiKey = "16710378-dd8150fb542d7226054a00e37";

export default {
    async searchImages(searchTxt){
        const url = "https://pixabay.com/api/";
        const response = await axios.get(url, { params: {key: apiKey, q: searchTxt}});
        return response.data;
    }
}
