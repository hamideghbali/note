// src/App.js
import React, { useState } from 'react';
import AddNote from '../src/components/AddNote';
import "./index.css"




const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Perform search logic here
    // For now, let's just log the search query
    console.log("Search query:", searchQuery);
  };

  return (
    <div>
      <AddNote onAdd={handleAddNote} />
      
    </div>
  );
};

export default App;
