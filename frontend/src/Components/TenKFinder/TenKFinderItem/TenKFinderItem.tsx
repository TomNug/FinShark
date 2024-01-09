import React from 'react'
import { CompanyTenK } from '../../../company';
import { Link } from 'react-router-dom';

type Props = {
    tenK: CompanyTenK;
}

const TenKFinderItem = ({tenK}: Props) => {
    const filingDate = new Date(tenK.fillingDate).getFullYear();
  return (
    <Link
        reloadDocument
        to={tenK.finalLink}
        type="button"
        className="inline-flex items-center p-4 text-md text-white bg-lightGreen rounded-md">10K - {tenK.symbol} - {filingDate}</Link>
  )
}

export default TenKFinderItem