import React from 'react';

// {/* 難易度レベルに応じて、制限時間を変える　＋　プレイヤー数も変える */}
const Navigation = ({difficulty = 1 , onChangeDifficulty}) => {
    const upVisibility = difficulty < 4 ? '' : 'is-hidden'
    const downVisibility = difficulty > 1 ? '' : 'is-hidden'
    const onUpDifficulty = () => onChangeDifficulty(difficulty + 1)
    const onDownDifficulty = () => onChangeDifficulty(difficulty - 1)
    return (
    <div className="navigation">
      <div className="title-container">
        <h1 className="title">🧠Fizz Buzz Game🧠</h1>
      </div>
      <div className="navigation-item">
          <span className="navigation-label">Difficulty:</span>
          <div className="navigaiton-item-number-container">
              <span className="num-board">{difficulty}</span>
              <div className="difficulty-button-container">
                  <div 
                  className={`difficulty-button difficulty-up ${upVisibility}`} 
                  onClick={onUpDifficulty}
                  >
                  </div>
                  <div 
                  className={`difficulty-button difficulty-down ${downVisibility}`} 
                  onClick={onDownDifficulty}
                  ></div>
              </div>
          </div>
      </div>
    </div>
    );
}

export default Navigation;