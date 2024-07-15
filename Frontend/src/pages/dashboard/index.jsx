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
            <h1>Welcome {user?.fullName}! here are your finances:</h1>
            <FinancialRecordForm/>
            <div>Total Savings: {calculateTotalSavings}</div>
            <FinancialRecordList/>
        </div>
    )
}