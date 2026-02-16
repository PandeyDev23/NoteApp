import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  const [Notes, setNotes] = useState([
    {
      id: 1,
      title: "First Note",
      content: "This is the content of the first note."
    },
    {
      id: 2,
      title: "Second Note",
      content: "This is the content of the second note."
    }
  ])

  useEffect(() => {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })

    return () => {
      setNotes([])
    }
  }, [])
  
  return (
   <>
    <div className='notes bg-black/80 w-full h-screen p-1.5'>
   {Notes.map((note)=>(
     <div className="note w-[300px] h-[200px] border-1 bg-black/85 rounded-2xl p-3.5
    m-1.5" key={note.id}>
      <h1 className='text-gray-300'>{note.title}</h1>
      <p className='text-gray-400'>{note.Content}</p>
    </div>
   ))}
    </div>
   </>
  )
}

export default App