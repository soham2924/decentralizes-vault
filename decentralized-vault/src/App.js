// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage.js'; // Adjust the path if needed
import UploadPage from 'src\components\Upload.js'; // Adjust the path if needed

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
            </Routes>
        </Router>
    );
};

export default App;
