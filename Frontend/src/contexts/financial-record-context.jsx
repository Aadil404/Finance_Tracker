import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react" 

export const FinancialRecordsContext = createContext(undefined)

export const FinancialRecordsProvider = ({children}) => {
    const [records, setRecords] = useState([])
    const {user} = useUser()
    const url="https://finance-tracker-backend-7f5d.onrender.com";

    const fetchRecords = async() => {
        if(!user) return;
        const response = await fetch(`${url}/financial-records/getAllByUserID/${user.id}`);

        if(response.ok){
            const records= await response.json();
            // console.log(records);
            setRecords(records);
        }
    }

    useEffect(()=>{
        fetchRecords();
    },[user]);

    const addRecord = async (record) => {
        const response = await fetch(`${url}/financial-records`,{
            method:"POST", 
            body: JSON.stringify(record),
            headers:{
                "Content-Type": "application/json",
            }
        })

        try{
            if(response.ok){
                const newRecord = await response.json();
                setRecords((prev) => [...prev,newRecord])
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const updateRecord = async (id, newRecord) => {
        // console.log(id, newRecord)
        const response = await fetch(`${url}/financial-records/${id}`,{
            method:"PUT", 
            body: JSON.stringify(newRecord),
            headers:{
                "Content-Type": "application/json",
            }
        })

        try{
            if(response.ok){
                const updatedRecord = await response.json();
                setRecords((prev) => 
                    prev.map((record)=>{
                        if(record._id === id) return updatedRecord;
                        else return record;
                    })
                )
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const deleteRecord = async (id) => {
        const flag = confirm("do you really want to delete this record");
        if(!flag) return;
        const response = await fetch(`${url}/financial-records/${id}`,{
            method:"DELETE", 
        })

        try{
            if (response.ok) {
                setRecords((prev) => 
                    prev.filter((record) => record._id !== id)
                );
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <FinancialRecordsContext.Provider value={{records, addRecord, updateRecord, deleteRecord}}>
            {children}
        </FinancialRecordsContext.Provider>
    )
}

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext);

    if(!context){
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider")
    }

    return context;
}
