import { useSelector } from 'react-redux';
import { gameMessage } from '../lib/constant';

import imageLogo from '../assets/logo.png';
import imageFail from '../assets/fail.png';
import imageSuccess from '../assets/success.png';

//* Loads GameHeader and GameInfo(if caught is success or fail) components 
//  # Returns game logo only if not in Game screen 
//  # Loads Logo, GameInfo and Scoreboard */

// GameInfo component
const GameInfo = ({caught}) => {
    return (
            <>
            <div className="game-info" key={caught ? 'success' : 'fail'}> 
                <div className="game-info-image"><img src={caught ? imageSuccess : imageFail} alt="helper Image" /></div>
                <div className="game-info-speach-bubble">{caught ? gameMessage.success : gameMessage.fail}</div>
            </div>
            </>
        )
}

// GameHeader component
const GameHeader = () => {
    // console.log("GameHeader Rendering...");
    const gameStarted = useSelector((state) => state.game_setup.started);
    const progressBarActive = useSelector((state) => state.game_setup.progressBar);
    const currentScore = useSelector((state) => state.game_data.currentScore);
    const bestScore = useSelector((state) => state.game_data.bestScore);
    const caught = useSelector((state) => state.game_data.caught);

    const allHeaderActive = (gameStarted && !progressBarActive);
    const isBestScore = (currentScore === bestScore); // Sets true if score is best score

    // If game has not started and progress bar is active
    if (!allHeaderActive) {
        return (
            <div className="game-header initial">               
                <div className="game-logo">
                    <img src={imageLogo} className="img-logo" alt="catchem-all-logo" />
                </div>
            </div>
        )
    }

    return (
        <div className="game-header">               
            <div className="game-logo">
                <img src={imageLogo} className="img-logo" alt="catchem-all-logo" />
            </div>
            {(caught !== null) && <GameInfo caught={caught} />}
            <div className={`score-board ${isBestScore ? 'best' : ''}`}>
                {!isBestScore && <div>Best Score: {bestScore}</div>}
                <div>{isBestScore ? 'Top Score:' : 'Score:'} {currentScore}</div>
            </div>
        </div>
    )
}

export default GameHeader;