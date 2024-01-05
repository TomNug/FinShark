import React, { SyntheticEvent } from 'react'
import "./Card.css"; 
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate
}: Props) : JSX.Element => {
  return (
    <div className="card">
        <img 
            src="https://media.istockphoto.com/id/475676448/photo/shark-fin-above-ocean-water.jpg?s=612x612&w=0&k=20&c=DsszV0Hi_fTf1zrcI-BW19dv-81lcgXojvQ8R5KWg9U="
            alt="image"
        />

        <div className="details">
            <h2>{searchResult.name} ({searchResult.symbol})</h2>
            <p>{searchResult.currency}</p>
        </div>
        <p className="info">
            {searchResult.exchangeShortName} - {searchResult.stockExchange}
        </p>
        <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol}/>
    </div>
  )
}

export default Card