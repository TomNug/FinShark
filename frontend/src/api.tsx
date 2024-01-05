import axios from "axios"
import { CompanyProfile, CompanySearch } from "./company";

interface SearchResponse {
    data: CompanySearch[];
}
export const searchCompanies = async (query: string) => {
    // APIs can fail, need to be in a try-catch
    try{
        const data = await axios.get<SearchResponse>(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else{
            console.log("unexpected error: ", error);
            return "An unexpected error has occurred.";
        }
    }
};

// Create an API call which lets us get information about a particular company
export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
};
