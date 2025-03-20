import React from 'react'
import ListAsk from './ListAsk';

const Chapter = ({chapter}) => {
  return (
    <div className='chapter'>
      <h2>{chapter.title_chapter}</h2>
      <ListAsk questions={chapter.questions}/>
    </div>
  )
}

export default Chapter
