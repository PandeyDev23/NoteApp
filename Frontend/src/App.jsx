import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [Notes, setNotes] = useState([]);

  function fetchNotes() {
    axios
      .get("http://localhost:3000/notes")
      .then((res) => {
        setNotes(res.data.notes || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchNotes();
    // console.log()
  }, []);

  function postNote(title, Content) {
    axios
      .post("http://localhost:3000/notes", {
        title: title,
        Content: Content,
      })
      .then((res) => {
        console.log(res.data);
        setNotes(prev => [res.data.note, ...prev])

      });
  }

  // postNote("Note 7", "Note for 7")

  function handleSubmit(e) {
    e.preventDefault();
    const { title, Content } = e.target.elements;

    if (title.value !== "" && Content.value !== "") {
      postNote(title.value, Content.value);
      e.target.reset();
    }
  }

  function handleDelete(noteId){
    axios.delete(`http://localhost:3000/notes/${noteId}`)
    .then((res)=>{
      console.log(res.data);
      setNotes(prev => prev.filter(note => note._id !== noteId))
    })
  }

  return (
    <>
      <form
        className="note-create-form  flex w-full bg-black/90 text-white/95 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="bg-transparent border-b border-white/30 focus:border-indigo-500 focus:outline-none transition py-2 px-1"
        />
        <input
          name="Content"
          type="text"
          placeholder="Content"
          className="bg-transparent border-b border-white/30 focus:border-indigo-500 focus:outline-none transition py-2 px-1"
        />
        <button className="bg-indigo-500 text-white py-2 px-4 rounded-full">
          +
        </button>
      </form>

      <div className="notes bg-black/80 w-full min-h-screen p-1.5 flex flex-wrap content-start">
        {Notes.map((note) => (
          <div
            className="note w-[300px] h-[200px] border-1 bg-black/85 rounded-2xl p-3.5 relative 
    m-1.5"
            key={note._id}
          >
          <span className="absolute right-2 top-2 cursor-pointer text-red-400 font-code" onClick={()=>handleDelete(note._id)}> DEL</span>
            <h1 className="text-gray-300">{note.title}</h1>
            <p className="text-gray-400">{note.Content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
