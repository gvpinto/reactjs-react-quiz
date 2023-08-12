import { useEffect } from "react";

function Timer({ secsRemaining, dispatch }) {

    const mins = Math.floor(secsRemaining / 60);
    const secs = secsRemaining % 60;

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'tick' });
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className="timer">
            {mins < 10 ? "0" : ""}{mins}:{secs < 10 ? "0" : ""}{secs}
        </div>
    );
}

export default Timer;
