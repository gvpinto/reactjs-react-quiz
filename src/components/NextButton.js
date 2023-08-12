function NextButton({ dispatch, answer, index, numOfQuestions }) {

    if (answer === -1) return null;

    return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: index + 1 >= numOfQuestions ? 'finish' : 'nextQuestion' })}>Next</button>
        </div>
    );
}

export default NextButton;
