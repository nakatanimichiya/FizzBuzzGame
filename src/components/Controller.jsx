import React from 'react';

const Controller = ({count, onChange, increment}) => {

    const onFizzBuzz = () => onChange('fizzbuzz')
    const onFizz = () => onChange('fizz')
    const onBuzz = () => onChange('buzz')
    const onNumber = () => onChange('number')

    
    return (
        <div className="controller">
            {/* 条件付きレンタリング */}
            <p>{count % 3 === 0 && count % 5 === 0 ? "FizzBuzz" : count % 3 === 0 ? "Fizz" : count % 5 === 0 ? "Buzz" : count}：：fieldタグに移行</p>
            <button onClick={increment} onClick ={onFizzBuzz}>Fizz</button>
            <button onClick={increment} onClick ={onFizz}>Buzz</button>
            <button onClick={increment} onClick ={onBuzz}>FizzBuzz</button>
            <button onClick={increment} onClick ={onNumber}>Number</button>
        </div>
    );
}

export default Controller;