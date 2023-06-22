import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import IndexPage from "./IndexPage";
import TrainDetails from "./TrainDetails";
import Header from "./Header";


function App() {
 return (
   <div>
    <Header/>
    <Routes>
       <Route path="/" element={<IndexPage />} />
       <Route path="/trains" element={<HomePage/> } />
       <Route path="/train/:id" element={<TrainDetails/> } />
       <Route path="*" element={<Navigate to={{pathname: "/notfound"}} />} />
     </Routes>
   </div>
 );
}

export default App;
