import React from 'react'
import Ask from './Ask'


const ListAsk = ({questions}) => {

  return (
    <section>
        {
        questions.map( (question, index) =>(
            <div key={index} className='question-answer'>
                <p className='question'>{question.question}</p>
                <span className='answer'>{question.answer}</span>
            </div>
        ))}
    </section>
  )
}

export default ListAsk
