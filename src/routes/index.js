import React from "react";
import { Routes, Route } from "react-router-dom";
import CompaniesTable from "../components/companiesTable";
import CompanyChart from "../components/companyChart";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CompaniesTable />} />
            <Route path="/charts" element={<CompanyChart />} />
            <Route path="/charts/:symbol" element={<CompanyChart />} />
            <Route path="*" element={
                <main style={{ padding: "1rem", textAlign: 'center' }}>
                    <h3>There's nothing here!</h3>
                </main>
            }/>
      </Routes>
    );
};

export default AppRoutes;