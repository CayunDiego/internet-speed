import React from 'react'
import Chapter from './Chapter';

const Listchapters = ( { chapters } ) => {

  return (
    <>
      {
        chapters.map((chapter) => (
          <Chapter key={chapter.id_chapter} chapter={chapter}/>
        ))
      }
    </>
  )
}

export default Listchapters
