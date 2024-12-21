import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLoaded, setProgressBar } from '../lib/reduxSlice';

const BarLoading = () => {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('var(--color-alert)');

    const progressBarActive = useSelector((state) => state.game_setup.progressBar);

    const dispatch = useDispatch();

    // const completeRef = useRef(false);

    // Sets progress with delay starting from 0
    useEffect (() => {
        if (progress < 100) {
            const timer = setTimeout(() => { setProgress(progress + 1) }, 40);
            return () => clearTimeout(timer);
        }

        if (progress === 100) {
            setColor('var(--color-confirm)');
            const delayTimer = setTimeout(() => {
                dispatch(setProgressBar(false));
                dispatch(setLoaded());
                // completeRef.current = true;
            }, 1500);

            return () => clearTimeout(delayTimer);
        }

    }, [progress, dispatch]);

    if (!progressBarActive) { return }

    return (
        <>
            <div className="game-loading-bar">
                <div className="loading-bar-fill" style={{ width : `${progress}%`, backgroundColor : `${color}` }}>
                </div>
                <div className="loading-bar-label" >{progress}%</div>
            </div>
            
        </>
    );
};

// BarLoading.propTypes = { onGameLoaded: PropTypes.func.isRequired, };

export default BarLoading;