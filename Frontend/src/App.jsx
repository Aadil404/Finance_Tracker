import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import { DashBoard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedOut,SignedIn } from "@clerk/clerk-react";
import "./pages/dashboard/financial-record.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
        <SignedOut>
          <Navigate to="/auth" />
        </SignedOut>
      
        <Routes>
        <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <div className="app-container">
                <SignedIn>
              <FinancialRecordsProvider>
                <Navbar/>
                <DashBoard />
                <Footer/>
              </FinancialRecordsProvider>
              </SignedIn>
              </div>
            }
          />
        </Routes>
      
    </Router>
  );
}

export default App;
