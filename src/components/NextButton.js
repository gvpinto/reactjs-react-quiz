function NextButton({ dispatch, answer }) {

    if (answer === -1) return null;

    return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>
        </div>
    );
}

export default NextButton;
