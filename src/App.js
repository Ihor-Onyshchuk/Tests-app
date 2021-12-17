import { useEffect, useState } from 'react';
import { questionsData } from './data';

const App = () => {
  const [ questions, setQuestions ] = useState([]);
  const [ answersState, setAnswersState ] = useState([]);
  const [ testResult, setTestResult ] = useState(0);
  const [ testMode, setTestMode ] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleChooseAnswer = (answer, questionId) => {
    setAnswersState([
      ...answersState.filter(a => a.questionId !== questionId),
      { questionId, answer }
    ])
  }

  const handleTestStart = () => {
    setTestMode('start')
    setTestResult(0)
  }

  const handleTestEnd = () => {
    if (answersState.length) {
      const score = answersState.reduce((acc, { questionId, answer }) => (
        questions.some(q => q.id === questionId && q.answers.includes(answer)) 
          ? acc + 1 
          : acc
      ), 0)
      
      setTestResult(score)
      setAnswersState([])
    }

    setStep(0)
    setTestMode('end')
  }

  const onSwitchNextQuestion = () => {
    if (step !== questions.length - 1) {
      setStep(step + 1);
    }
  }

  const onSwitchPrevQuestion = () => {
    if (step !== 0) {
      setStep(step - 1);
    }
  }

  // Also, we could split this component into small, standalone, reusable components!
  return (
    <div className="app">
      <h1>Welcome to the `Tests App`!</h1>

      <button onClick={handleTestStart}>Start Test</button>
      <button onClick={handleTestEnd}>End Test</button>

      {!!questions.length &&  (
        <div className="test-container">
          {!testMode && <h2>Click to `Start Test` button for starting the test!</h2>}

          {testMode === 'start' && (
            <div>
              <div>{`Question ${step + 1} / ${questions.length}`}</div>
              <h2>{questions[step].content}</h2>

              <div className='answers'>
                {questions[step].answers.map((answer, i) => (
                  <div
                    key={i}
                    className={
                      `answer ${answersState.find(a => a.questionId === questions[step].id && a.answer === answer) ? 'selected' : '' }`
                    }
                    onClick={() => handleChooseAnswer(answer, questions[step].id)}
                  >
                    {answer}
                  </div>
                ))}
              </div>

              <div>
                <button
                  onClick={onSwitchPrevQuestion}
                  disabled={step === 0}
                >
                  prev
                </button>
                <button
                  onClick={onSwitchNextQuestion}
                  disabled={step === questions.length - 1}
                >
                  next
                </button>
              </div>
            </div>
          )}

          {testMode === 'end' && (
            <h2>{`Your score is ${testResult} from ${questions.length}!`}</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
