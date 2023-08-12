import Timer from "./Timer";

function Footer({ children, secsRemaining, dispatch }) {
    return (
        <div className="footer">
            <Timer secsRemaining={secsRemaining} dispatch={dispatch} />
            {children}
        </div>
    );
}

export default Footer;
