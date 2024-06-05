// src/NoteList.js
import React from 'react';

const NoteList = ({ notes }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index} className="bg-gray-100 p-2 mb-2 rounded">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
