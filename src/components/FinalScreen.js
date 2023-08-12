function FinalScreen({ dispatch, points, totalPoints, highScore }) {

    const percentage = Math.ceil((points / totalPoints) * 100);

    let emoji;
    if (percentage === 100) emoji = '🏆';
    if (percentage < 100 && percentage >= 50) emoji = '🏄🏽';
    if (percentage < 50) emoji = '😖';


    return (
        <>
            <p className="result">
                <span>{emoji}</span> Total Score <strong>{points}</strong>/{totalPoints} ({percentage} %)
            </p>
            <p className="highscore">
                High Score: {highScore} points
            </p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>Restart Quiz</button>
        </>
    );
}

export default FinalScreen;
