import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router';
import { getCashFlowStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';

type Props = {}

const config = [
    {
      label: "Date",
      render: (company: CompanyCashFlow) => company.date,
    },
    {
      label: "Operating Cashflow",
      render: (company: CompanyCashFlow) => company.operatingCashFlow,
    },
    {
      label: "Investing Cashflow",
      render: (company: CompanyCashFlow) =>
        company.netCashUsedForInvestingActivites,
    },
    {
      label: "Financing Cashflow",
      render: (company: CompanyCashFlow) =>
        company.netCashUsedProvidedByFinancingActivities,
    },
    {
      label: "Cash At End of Period",
      render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
    },
    {
      label: "CapEX",
      render: (company: CompanyCashFlow) => company.capitalExpenditure,
    },
    {
      label: "Issuance Of Stock",
      render: (company: CompanyCashFlow) => company.commonStockIssued,
    },
    {
      label: "Free Cash Flow",
      render: (company: CompanyCashFlow) => company.freeCashFlow,
    },
  ];

  
const CashFlowStatement = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [cashFlowData, setCashFlow] = useState<CompanyCashFlow[]>();
    useEffect(() => {
        // Can't make useEffect directly async
        // Roundabout way is creating a function within
        const fetchCashFlow = async () => {
            const result = await getCashFlowStatement(ticker!);
            setCashFlow(result!.data);
        };
        fetchCashFlow();
    }, []);
    return (
        <>
            {cashFlowData ? (
                <Table config={config} data={cashFlowData} />    
            ) : (
                <Spinner />
            )}
        </>
    );
}

export default CashFlowStatement