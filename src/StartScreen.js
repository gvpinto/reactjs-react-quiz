function StartScreen({ numOfQuestions = 0, dispatch }) {


    return (
        <div className="start">
            <h2>Welcome to the React QUIZ!</h2>
            <h3>{numOfQuestions} number of questions to test your React Skills</h3>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'start' })}>Let's Start</button>
        </div>
    );
}

export default StartScreen;
