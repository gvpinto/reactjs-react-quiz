import { useEffect, useReducer } from 'react';
import StartScreen from '../StartScreen';
import Error from './Error';
import FinalScreen from './FinalScreen';
import Footer from './Footer';
import Header from './Header';
import Loader from './Loader';
import Main from './Main';
import NextButton from './NextButton';
import Progress from './Progress';
import Questions from './Questions';

const SECS_PER_QUESTION = 5;

const initialState = {
    questions: [],
    // loading, error, ready active, finished
    status: 'loading',
    // Question #
    index: 0,
    answer: -1,
    points: 0,
    highScore: 0,
    secsRemaining: 10
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
                status: 'active',
                secsRemaining: state.questions.length * SECS_PER_QUESTION
            };

        case 'newAnswer':
            const question = state.questions[state.index];
            const points = action.payload === question.correctOption ? state.points + question.points : state.points;
            state.highScore = points > state.highScore ? points : state.highScore;
            return {
                ...state,
                answer: action.payload,
                points: points
            };
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: -1
            };

        case 'finish':
            return {
                ...state,
                status: 'finished'
            };

        case 'restart':
            // return {
            //     ...state,
            //     answer: -1,
            //     points: 0,
            //     status: 'ready',
            //     index: 0
            // };

            return {
                ...initialState,
                status: 'ready',
                questions: state.questions,
                highScore: state.highScore
            };

        case 'tick':
            return {
                ...state,
                secsRemaining: state.secsRemaining - 1,
                status: (state.secsRemaining) === 0 ? 'finished' : state.status
            };

        default:
            throw new Error('Action unknown');
    }
}

function App() {

    const [{ questions, status, index, answer, points, highScore, secsRemaining }, dispatch] = useReducer(reducer, initialState);

    const numOfQuestions = status === 'error' ? 0 : questions.length;

    const totalPoints = questions.reduce((prev, curr) => prev += curr.points, 0);

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'dataReceived', payload: data }))
            .catch((error) => dispatch({ type: 'dataFailed' }));
    }, []);


    return (
        <div className='app'>
            <Header />

            <Main>

                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />}
                {status === 'active' &&
                    <>
                        <Progress
                            points={points}
                            numOfQuestions={numOfQuestions}
                            index={index}
                            totalPoints={totalPoints}
                            answer={answer} />
                        <Questions question={questions[index]} answer={answer} dispatch={dispatch} />
                        <Footer dispatch={dispatch} secsRemaining={secsRemaining}>
                            <NextButton answer={answer} dispatch={dispatch} index={index} numOfQuestions={numOfQuestions} />
                        </Footer>
                    </>
                }
                {status === 'finished' &&
                    <FinalScreen points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch} />
                }
            </Main>
        </div >
    );
}

export default App;
