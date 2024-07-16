import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import "./auth.css"

export const Auth = () =>{
    return (
        <div className='sign-in-container'>
            <div className='greeting'>Welcome To Your Personal Finance Tracker</div>
            <SignedOut>
                <div>
                <SignInButton className="button" mode='modal'/>
                <SignUpButton className="button" mode='modal'/>
                </div>
            </SignedOut>
            <SignedIn>
                <Navigate to="/"/>
            </SignedIn>
        </div>
    )
}