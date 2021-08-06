import React, { useCallback, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Field from './components/Field';
import Button from './components/Button';
import Controller from './components/Controller';
import './App.css';

const defaultDifficulty = 1

const Difficulty = [5000,3000,1000]

const GameStatus = Object.freeze({
  init:'init',
  playing:'playing',
  gameover:'gameover'
})

const CountBtn = Object.freeze({
  fizzbuzz:'fizzbuzz',
  fizz:'fizz',
  buzz:'buzz',
  number:'number',
})

const OppositeCountBtn = Object.freeze({
  fizzbuzz:'fizzbuzz',
  fizz:'fizz',
  buzz:'buzz',
  number:'number',
})

const Delta = Object.freeze({
  fizzbuzz: {increment},
  fizz:{increment},
  buzz:{increment},
  number:{increment},
})

const defaultInterval = 5000;
let timer = undefined;
const unsubscribe = () => {
  if(!timer){
    return
  }
  clearInterval(timer);
} 

const gamingRule = (count) =>{
 if(count % 3 === 0 && count % 5 === 0){
   if(CountBtn.fizzbuzz){
     increment();
   }else{
     alert("15の倍数でした...")
   }
 }else if(count % 3 === 0){
   if(CountBtn.fizz){
     increment();
   }else{
     alert("3の倍数でした...")
   }
 }else if(count % 5 === 0){
   if(CountBtn.buzz){
     increment();
   }else{
     alert("5の倍数でした...")
   }
 }else{
   if(CountBtn.number){
     increment();
   }else{
     alert("Numberでした...")
   }
 } 
}

function App() {
  
  const [status,setStatus]=useState(GameStatus.init);
  const [difficulty,setDifficulty] = useState(defaultDifficulty)
  const [countBtn, setCountBtn] = useState(CountBtn.number)
  const [tick,setTick] = useState(0);
  
  const onChangeDifficulty = useCallback((difficulty) => {
    if(status !== GameStatus.init){
      return
    }
    if(difficulty < 1 || difficulty > Difficulty.length){
      return
    } 
    setDifficulty(difficulty)
  },[status,difficulty])

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
  
  const onStart  = () => setStatus(GameStatus.playing)

  const onRestart = () => {
    timer = setInterval(() => {
      setTick(tick => tick +1)
    },defaultInterval)
    // 初期状態に戻す　＝　数を1に戻す
    setStatus(GameStatus.init)
    setCountBtn(CountBtn.number)
  }

  const onChangeCountBtn = (newCountBtn)=>{
    if(status !== GameStatus.playing){
      return countBtn
    }
    if(OppositeCountBtn[countBtn] === newCountBtn){
      return
    }
    setCountBtn(newCountBtn)
  }

  const handleCounting=()=>{
    //const 現時点の数値を取得する変数
    const delta = Delta[countBtn]
    const newCountNum = {
    　//新たな数値
    }
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
        <Controller onChange={onChangeCountBtn}/>
      </footer>
    </div>
  );
}

export default App;
