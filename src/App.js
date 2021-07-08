import React from 'react'
import { useGlobalContext } from './context'
import { motion } from 'framer-motion'
import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    nextQuestion,
    prevQuestion,
    checkAnswer,
  } = useGlobalContext()
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  const { question, incorrect_answers, correct_answer } = questions[index]
  let answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <motion.div className='btns'>
          {index > 0 && (
            <button className='prev-question' onClick={prevQuestion}>
              Prev Question
            </button>
          )}
          <button className='next-question' onClick={nextQuestion}>
            Next question
          </button>
        </motion.div>
      </section>
    </main>
  )
}

export default App
