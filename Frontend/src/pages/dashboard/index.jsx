import {useUser} from '@clerk/clerk-react'
import { FinancialRecordForm } from './financial-record-form';
import { FinancialRecordList } from './financial-record-list';
import { useFinancialRecords } from '../../contexts/financial-record-context';
import { useMemo } from 'react';

export const DashBoard = ()=>{
    const {user}=useUser();
    const {records} = useFinancialRecords();
    const calculateTotalSavings = useMemo(()=>{
        let res=0;
        records.forEach(element => {
            res += element.amount;
        });
        return res;
    },[records])
    return(
        <div className='dashboard-container'>
            <h1 className='welcome'>Welcome {user?.fullName}! here are your finances:</h1>
            <FinancialRecordForm/>
            <div className='totalSavings'>
                <span className='text'>Total Savings: </span>
                <span className='number'>&#x20B9;{calculateTotalSavings}</span>
            </div>
            {/* <span className='totalSavings'>Total Savings: <b>{calculateTotalSavings}</b></span> */}
            <FinancialRecordList/>
        </div>
    )
}