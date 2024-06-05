import React, { useState, useEffect } from 'react';
import { MdEdit, MdDeleteForever, MdCheckBoxOutlineBlank } from 'react-icons/md';

const AddNote = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCategoryChange = (index, newCategory) => {
    const updatedNotes = [...notes];
    updatedNotes[index].category = newCategory;
    setNotes(updatedNotes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const currentDate = new Date().toLocaleDateString();
    const newNote = { text, category: 'Business', date: currentDate };
    onAdd(newNote);
    setNotes([...notes, newNote]);
    setText('');
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setText(notes[index].text);
  };

  const handleSaveEdit = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
    setEditIndex(null);
    setText('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setText('');
  };

  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handleCheckBoxClick = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].checked = !updatedNotes[index].checked;
    setNotes(updatedNotes);
  };

  const filteredNotes = activeTab === 'All' ? notes : notes.filter(note => note.category === activeTab);

  return (
    <div className="m-4">
      <h2 className="text-xl font-bold mb-2">Add Note</h2>
      <form onSubmit={handleSubmit} className="flex mb-2">
        <input
          type="text"
          placeholder="Enter your note"
          value={text}
          onChange={handleChange}
          className="border border-gray-300 rounded-l px-4 py-2 flex-grow mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </form>
      <div className="flex mb-2">
        <button
          className={`category-tab ${activeTab === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} `}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        <button
          className={`category-tab ${activeTab === 'Business' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ml-2`}
          onClick={() => setActiveTab('Business')}
        >
          Business
        </button>
        <button
          className={`category-tab ${activeTab === 'Home' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ml-2`}
          onClick={() => setActiveTab('Home')}
        >
          Home
        </button>
        <button
          className={`category-tab ${activeTab === 'Personal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ml-2`}
          onClick={() => setActiveTab('Personal')}
        >
          Personal
        </button>
      </div>

      <div className="flex flex-wrap ml-9">
        {filteredNotes.map((note, index) => (
          <div key={index} className={`relative bg-gray-200 p-4 m-2 ${note.checked ? 'bg-green-200' : ''}`} style={{ minWidth: '300px', maxWidth: '100%', height: '250px', paddingTop: '30px' }}>
            <button
              className={`absolute top-0 left-0 px-2 py-1 rounded ${note.category === 'Business' ? 'bg-blue-500 text-white' : (note.category === 'Home' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white')} ${activeTab === note.category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(index, note.category === 'Business' ? 'Home' : (note.category === 'Home' ? 'Personal' : 'Business'))}
            >
              {note.category}
              {activeTab === note.category && (
                <div className="w-full h-1  absolute bottom-0 left-0"></div>
              )}
            </button>
            <div className="absolute top-0 right-0 flex">
              <MdEdit
                className="text-gray-500 cursor-pointer mr-2"
                onClick={() => handleEditClick(index)}
              />
              <MdCheckBoxOutlineBlank
                className="text-gray-500 cursor-pointer mr-2"
                onClick={() => handleCheckBoxClick(index)}
              />
              <MdDeleteForever
                className="text-gray-500 cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>

            {editIndex === index ? (
              <div>
                <textarea
                  value={text}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 mb-2"
                />
                <button
                  className="bg-white-100 text-blue-500 px-4 py-2 mr-2"
                  onClick={() => handleSaveEdit(index, text)}>
                  Save
                </button>

                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ marginTop: '30px' }}>
                <p className="text-sm">{note.text}</p>
                <p className="text-xs text-gray-500 absolute bottom-2 right-2">{note.date}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNote;
