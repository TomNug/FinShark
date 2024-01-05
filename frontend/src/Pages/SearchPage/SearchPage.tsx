import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { CompanySearch } from '../../company';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { searchCompanies } from '../../api';

interface Props {}

const SearchPage = (props: Props) => {
  // Store the user search
  const [search, setSearch] = useState<string>("");

  // Portfolio values
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  // Storing what we get back from the API
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  // Server error state
  const [serverError, setServerError] = useState<string | null>(null);

  // 'any' allows anything to go into a function
  // Against the purpose of TypeScript
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }





  // Event handler for clicking 'Add' on a card
  // Need to turn of TS here
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    // Checks to prevent duplicates
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if(exists) return;
    // Updating the array with the new card
    // Spread, not update
    const updatedPortfolio = [...portfolioValues, e.target[0].value]
    setPortfolioValues(updatedPortfolio);
  }


  // Difficult to pull values out, turn off TS
  const onPortfolioDelete = (e: any) => {
    e.preventDefault(); // Don't reload page when submitting and removing all data
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  }




  // Added this so log was updated after the async
  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    // Type checking
    if(typeof result == "string"){
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    // Console log wasn't waiting for the async properly
    //console.log(searchResult);
  };
  
  return (
    <>
    <Search 
      onSearchSubmit={onSearchSubmit} 
      search={search} 
      handleSearchChange={handleSearchChange}
    />
    <ListPortfolio 
      portfolioValues={portfolioValues} 
      onPortfolioDelete={onPortfolioDelete} />
    {serverError && <h1>{serverError}</h1>}
    <CardList 
      searchResults = {searchResult} 
        onPortfolioCreate={onPortfolioCreate}/>

        {serverError && <div>Unable to connect to API</div>}
  </>
  )
}

export default SearchPage