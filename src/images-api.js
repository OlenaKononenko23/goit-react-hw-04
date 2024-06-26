import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "EyCe1h1iMwQNkJ8PYkXDO2Xrq3waFGdNhx--YoI6tEA"

export const getImages = async (topic,currentPage) => {
    const response = await axios.get("/search/photos", {
        params: {
            query: topic,
            page: currentPage,
            per_page: 20,
            client_id: API_KEY,
        }, 
    });
    
    const images = response.data.results;
    const total_pages = response.data.total_pages; 

    return { images, total_pages };
     
};