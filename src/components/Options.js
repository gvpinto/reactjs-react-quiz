function Options({ question, dispatch, answer }) {
    console.log(question);
    console.log(answer);
    return (
        <div className="options">
            {
                question.options.map((option, index) => {
                    return (
                        <button
                            key={option}
                            className={`btn btn-option ${answer !== -1 ? index === question.correctOption ? "correct" : "wrong" : ""} ${index === answer ? "answer" : ""}`}
                            disabled={answer !== -1}
                            onClick={() => dispatch({ type: "newAnswer", payload: index })}
                        >
                            {option}
                        </button>
                    );
                })
            }
        </div>
    );
}

export default Options;
