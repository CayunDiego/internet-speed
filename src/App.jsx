import { useState } from 'react'
import medicalIcon from './assets/medical-icon.png.webp'
import './App.scss'
import Search from './Search'
import Document from './Document'
import data from './data.json'
import data2 from './data2.json'
import data3 from './data3.json'


function App() {
 const [hidden, setHidden] = useState(true)
 const [error, setError] = useState(false)
 const [correctPassword, setCorrectPassword] = useState(false)
 const [searchTerm, setSearchTerm] = useState('')


 const handleSearchChange = (event) => {
   setSearchTerm(event.target.value)
 };


const [password, setPassword] = useState('')
 const handleChange = (event) => {
   setPassword(event.target.value)
 }


 // Función para fusionar múltiples JSON
const mergeMultipleJSON = (jsonArray) => {
 const merged = [];


 jsonArray.forEach((json) => {
   json.forEach((doc) => {
     const existingDoc = merged.find((d) => d.id_document === doc.id_document);
     if (existingDoc) {
       doc.chapters.forEach((chap) => {
         const existingChap = existingDoc.chapters.find((c) => c.id_chapter === chap.id_chapter);
         if (existingChap) {
           existingChap.questions = [...existingChap.questions, ...chap.questions];
         } else {
           existingDoc.chapters.push(chap);
         }
       });
     } else {
       merged.push(doc);
     }
   });
 });


 return merged;
};


 const mergedJSON = mergeMultipleJSON([data, data2, data3]);


 const filteredData = mergedJSON.map((document) => {
   const filteredChapters = document.chapters.map((chapter) => {
     if (chapter.title_chapter.toLowerCase().includes(searchTerm.toLowerCase())) {
       // Si el título del capítulo coincide, mostrar todo el contenido del capítulo
       return chapter
     } else {
       // Filtrar las preguntas dentro del capítulo
       const filteredQuestions = chapter.questions.filter((question) =>
         question.question.toLowerCase().includes(searchTerm.toLowerCase())
       )
       if (filteredQuestions.length > 0) {
         return { ...chapter, questions: filteredQuestions }
       }
     }
     return null
   }).filter(chapter => chapter !== null)
   return { ...document, chapters: filteredChapters }
 }).filter(document => document.chapters.length > 0)


 const checkPassword = () => {
   if (password === "internet") {
     setHidden( () => false )
     setCorrectPassword( () => true )
     setError( () => false)
   } else {
     setError( () => true)
   }
 }


 return (
     <>
       {
         hidden ?  <div id="hero-section" className="hero-section">
                     <img src={medicalIcon} alt="Medical Icon" className="medical-icon"/>
                     {!correctPassword && <input
                       type="password"
                       id="password-input"
                       placeholder="Create a internet test"
                       value={password}
                       onChange={handleChange}
                     />}
                     { !correctPassword && <button id="password-button" onClick={checkPassword}>I have an one</button>}
                     {error && <p id="error-message" className="error-message hidden">Wrong connection</p>}
                     { correctPassword && <button id="password-button" onClick={checkPassword}>Show page ads now</button>}


                   </div>
                 : <div className='container'>
                     <Search handleSearchChange={handleSearchChange} />
                     <div className='document-container'>
                     {
                       filteredData.map((document) => (
                         <Document key={document.id_document} document={document} />
                       ))
                     }
                     </div>
                     <button className='toggle-button' onClick={() => setHidden( () => !hidden )}>
                       Hide Content
                     </button>
                   </div>
       }
     </> 
 )
}


export default App