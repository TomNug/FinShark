import { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import { searchCompanies } from './api';
import { CompanySearch } from './company';

function App() {
  // Store the user search
  const [search, setSearch] = useState<string>("");
  // Storing what we get back from the API
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  // Server error state
  const [serverError, setServerError] = useState<string>("");

  // 'any' allows anything to go into a function
  // Against the purpose of TypeScript
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  }


  const onClick = async (e: SyntheticEvent) => {
    const result = await searchCompanies(search);
    // Type checking
    if(typeof result == "string"){
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    console.log(searchResult);
  };
  
  // Now data is generated in the app
  // Need to pass it down to the components
  return (
    <div className="App">
      
      <Search onClick={onClick} search={search} handleChange={handleChange}/>
      <CardList />
    </div>
  );
}

export default App;
