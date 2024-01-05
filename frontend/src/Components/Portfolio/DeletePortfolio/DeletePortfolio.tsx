import React, { SyntheticEvent } from 'react'

type Props = {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
}

const DeletePortfolio = ({onPortfolioDelete, portfolioValue}: Props) => {
  return (
    <div>
        <form onSubmit={onPortfolioDelete}>
            <input readOnly hidden={true} value={portfolioValue} />
            <button>x</button>
        </form>
    </div>
  );
};

export default DeletePortfolio