import axios from "axios"
import { CompanyBalanceSheet, CompanyCashFlow, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company";

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

// Create an API call which lets us get information about a particular T
export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
};



// Create an API call which lets us get information for an income statement
export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
};


// Create an API call which lets us get information for a balance sheet
export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
};


// Create an API call which lets us get information for chasflow statement
export const getCashFlowStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
};


// Create an API call which lets us get information for chasflow statement
export const getTenK = async (query: string) => {
    try {
        const data = await axios.get<CompanyTenK[]>(
            `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-k&page=0&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error: any) {
        console.log("Error message from API: ", error.message);
    }
};