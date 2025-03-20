import { useEffect } from 'react';
import Listchapters from './Listchapters';

const Document = ( {document} ) => {  
 
  return (
    <div className='document'>
      <h1>{document.title_document}</h1>
      <Listchapters chapters={document.chapters}/>
    </div>
  )
}

export default Document
