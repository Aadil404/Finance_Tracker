import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import { DashBoard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import "./pages/dashboard/financial-record.css";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from '@clerk/clerk-react'

function App() {
  return (
    <Router>
      <div className="app-container">
      <div className="navbar">
          <Link to="/">Dashboard</Link>
          <SignedIn>
                <UserButton/>
          </SignedIn>
          <SignedOut>
            <Navigate to="/auth"/>
          </SignedOut>
      </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <DashBoard />
              </FinancialRecordsProvider>
            }
          />

          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
