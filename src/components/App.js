import { useEffect, useReducer } from 'react';
import Header from './Header';
import Loader from './Loader';
import NextButton from './NextButton';
import Error from './Error';
import StartScreen from '../StartScreen';
import Questions from './Questions';
import Main from './Main';


const initialState = {
    questions: [],
    // loading, error, ready active, finished
    status: 'loading',
    // Question #
    index: 0,
    answer: -1,
    points: 0
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            };
        case 'start':
            return {
                ...state,
                status: 'active'
            };

        case 'newAnswer':
            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            };
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: -1
            };

        default:
            throw new Error('Action unknown');
    }
}

function App() {

    const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

    const numOfQuestions = status === 'error' ? 0 : questions.length;

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'dataReceived', payload: data }))
            .catch((error) => dispatch({ type: 'dataFailed' }));
    }, []);


    return (
        <div className='app'>
            <Header />
            <h4>Points: {points}</h4>
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />}
                {status === 'active' &&
                    <>
                        <Questions question={questions[index]} answer={answer} dispatch={dispatch} />
                        <NextButton answer={answer} dispatch={dispatch} />
                    </>
                }
            </Main>
        </div >
    );
}

export default App;
