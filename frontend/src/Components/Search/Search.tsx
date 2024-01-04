import React, { ChangeEvent, useState, MouseEvent, SyntheticEvent } from 'react'

type Props = {}

const Search : React.FC<Props> = (props: Props) : JSX.Element => {
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

    return (
        <div>
            <input value={search} onChange={(e) => handleChange(e)}>
            </input>
            <button onClick={(e) => onClick(e)} />
        </div>
    )
}

export default Search