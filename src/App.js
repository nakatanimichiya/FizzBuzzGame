import React, { useCallback, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Field from './components/Field';
import Button from './components/Button';
import Controller from './components/Controller';
import './App.css';


//ゲームの状態
const GameStatus = Object.freeze({
  init:'init',
  playing:'playing',
  gameover:'gameover'
})

//コントロールボタン
const CountBtn = Object.freeze({
  fizzbuzz:'fizzbuzz',
  fizz:'fizz',
  buzz:'buzz',
  number:'number',
})

//keyとvalueで反対の方向をマッピングしているオブジェクト 　　？必要なのか？
const OppositeCountBtn = Object.freeze({
  fizzbuzz:'fizzbuzz',
  fizz:'fizz',
  buzz:'buzz',
  number:'number',
})


// ゲームレベル：初期値レベル
const defaultDifficulty = 1

//レベルに応じた制限時間
const defaultInterval = 5000;
const Difficulty = [5000,3000,1000]

//ボタンを押した後の制限時間のリセット
let timer = undefined;
const unsubscribe = () => {
  if(!timer){
    return
  }
  clearInterval(timer);
} 


function App() {
  
  const [status,setStatus]=useState(GameStatus.init);　　　　　　　　//ゲーム状態
  const [difficulty,setDifficulty] = useState(defaultDifficulty)  //難易度
  const [countBtn, setCountBtn] = useState(CountBtn.number)       //ボタン
  const [tick,setTick] = useState(0);                             //conutの更新
  const [count, setCount] = useState(1);                          //stateを宣言
  
  const increment = () => setCount(count + 1) //incrementボタンが押された時の関数
  
  const Delta = Object.freeze({
    fizzbuzz: increment,
    fizz:increment,
    buzz:increment,
    number:increment,
  })
  
  
  //ゲームのルールを条件分岐を用いて実装
  const gamingRule = (count, newCountBtn) =>{
    console.log(count)
    console.log(newCountBtn)
    if(count % 3 === 0 && count % 5 === 0){
      if(newCountBtn === CountBtn.fizzbuzz){
        return true
      }else{
        alert("15の倍数でした...")
        return false
      }
    }else if(count % 3 === 0){
      if(newCountBtn === CountBtn.fizz){
        return true
      }else{
        alert("3の倍数でした...")
        return false
      }
    }else if(count % 5 === 0){
      if(newCountBtn === CountBtn.buzz){
        return true
      }else{
        alert("5の倍数でした...")
        return false
      }
    }else if(count % 3 !== 0 && count % 5 !== 0){
      if(newCountBtn === CountBtn.number){
        return true
      }else{
        alert("Numberでした...")
        return false
      }
    } 
  }

  // 難易度選択
  const onChangeDifficulty = useCallback((difficulty) => {
    if(status !== GameStatus.init){
      return
    }
    if(difficulty < 1 || difficulty > Difficulty.length){
      return
    } 
    setDifficulty(difficulty)
  },[status,difficulty])
  
  const handleCounting=(count)=>{
    //const 現時点の数値を取得する変数
    const delta = Delta[countBtn]
    const newCountNum = {
    　
    }
  }
  
  useEffect(()=>{
    const interval = Difficulty[difficulty - 1]
    timer = setInterval(() =>{
      setTick(tick => tick + 1)
    },interval)
    return unsubscribe
  },[difficulty])
  
  useEffect(()=>{
    if(status !== GameStatus.playing){
      // ボタンを押せないようにする
      return 
    }
    const canContinue = handleCounting()
    if(!canContinue){
      setStatus(GameStatus.gameover)
    }
  }, [tick])
  
  // スタートボタン
  const onStart  = () => setStatus(GameStatus.playing)
  

  //ゲームオーバー後のスタートボタン
  const onRestart = () => {
    timer = setInterval(() => {
      setTick(tick => tick +1)
    },defaultInterval)
    // 初期状態に戻す　＝　数を1に戻す
    setStatus(GameStatus.init)
    setCountBtn(CountBtn.number)
  }
  
  const onChangeCountBtn = (newCountBtn)=>{
    increment();
    gamingRule(count + 1,newCountBtn);
    // console.log(count)
    console.log(count)
    console.log(count + 1)
    if(status !== GameStatus.playing){
      return countBtn
    }
    if(OppositeCountBtn[countBtn] === newCountBtn){
      return
    }
    setCountBtn(newCountBtn);
  }


  return (
    <div className="App">
      <header className="header">
        <Navigation difficulty={difficulty} onChangeDifficulty={onChangeDifficulty}/>
      </header>
      <main className="main">
        <Field/>
      </main>
      <footer className="footer">
        <Button status={status} onStart={onStart} onRestart={onRestart}/>
        <Controller  onChange={onChangeCountBtn} count={count}/>
      </footer>
    </div>
  );
}

export default App;
