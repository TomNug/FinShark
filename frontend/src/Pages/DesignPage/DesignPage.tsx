import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'

type Props = {}

const DesignPage = (props: Props) => {
  return (
    <>
        <h1>FinShark Design Page</h1>
        <h2>This is FinShark's design page. Design aspects of the app will be stored here</h2>
        <RatioList />
        <Table />
    </>
  )
}

export default DesignPage