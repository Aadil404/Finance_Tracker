import { useState } from "react"
import {useUser} from "@clerk/clerk-react"
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm=()=>{

    const [description,setDescription]=useState("");
    const [amount,setAmount]=useState("");
    const [category,setCategory]=useState("");
    const [paymentMethod,setPaymentMethod]=useState("");
    const {addRecord} = useFinancialRecords()

    const {user} = useUser()
    // console.log(user?.id)

    const handleSubmit = (event) =>{
        event.preventDefault();

        const newRecord = {
            userId:user?.id ?? "",   //if we are not logged in
            date:new Date().toLocaleString(),
            description:description,
            amount:parseFloat(amount),
            category:category,
            paymentMethod:paymentMethod
        };

        // console.log(newRecord)

        addRecord(newRecord)

        setDescription("");
        setAmount("")
        setCategory("")
        setPaymentMethod("")

    }

    return(
        <div className="form-container">

            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Description:</label>
                    <input type="text" required className="input" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                </div>
                <div className="form-field">
                    <label>Amount:</label>
                    <input type="number" required className="input"  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                </div>
                <div className="form-field">
                    <label>Category:</label>
                    <select required className="input" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                        <option value="">Select a Category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Payment Method:</label>
                    <select required className="input" value={paymentMethod} onChange={(e)=>{setPaymentMethod(e.target.value)}}>
                        <option value="">Select a Payment Method</option>
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button className="button" type="submit">Add Record</button>
            </form>

        </div>
    )
}