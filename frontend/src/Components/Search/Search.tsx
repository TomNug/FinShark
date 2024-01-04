import React, { ChangeEvent, useState, MouseEvent, SyntheticEvent } from 'react'

interface Props {
    onClick: (e: SyntheticEvent) => void;
    search: string | undefined; // anticipating that state can be undefined
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search : React.FC<Props> = ({onClick, search, handleChange}: Props) : JSX.Element => {


    return (
        <div>
            <input value={search} onChange={(e) => handleChange(e)}>
            </input>
            <button onClick={(e) => onClick(e)} />
        </div>
    )
}

export default Search