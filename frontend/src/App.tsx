import { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';

function App() {
  const [search, setSearch] = useState<string>("");
  
  // 'any' allows anything to go into a function
  // Against the purpose of TypeScript
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  }


  const onClick = (e: SyntheticEvent) => {
    console.log(e);
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
