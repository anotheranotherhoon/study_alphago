/* 아래의 주석은 지우시면 안됩니다. */
/* global MissionUtils */

import React from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import shortid from 'shortid';
import Chart from './Chart';

/* API 호출 상수 */
const Random = MissionUtils.Random;

function App() {

    /* 코드 작성 구역 */
  const [val, setVal] = useState('')
  const [carsName, setCarsName] = useState([])
  const [numberOfRounds, setNumberOfRounds] = useState(0)
  const [result, setResult] = useState([])
  const [winner, setWinner] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [winnerGrade, setWinnerGrade] = useState(0)
  const nameInput = useRef();
  const handleChange = (e) => {
    setVal(e.target.value)
  }

  const handleNameSubmit = useCallback((e) => {
    e.preventDefault();
    //자동차이름을 , 로 구분한다. 배열로 리턴됨.
    //자동차이름들 중 길이가 5글자를 5글자를 넣는다면 moreThenFiveLetters배열이 존재하게됨
    //자동차이름들 중 아무것도 입력하지 않은 경우 ex)이름,,이름  blank배열이 존재하게됨
    const splitedVal = val.split(',');
    const moreThenFiveLetters =splitedVal.filter((el)=> el.length > 5);
    const blank = splitedVal.filter((el)=> el.length === 0);
    if(splitedVal.length > [...new Set(splitedVal)].length){
      alert("중복된 자동차 이름을 입력하셨습니다.")
      setVal("")
      nameInput.current.focus();
      return
    }
    if(blank.length){
      alert('자동차 이름에 빈값을 입력할 수 없습니다.')
      setVal("")
      nameInput.current.focus();
      return 
    }
    if(moreThenFiveLetters.length){
      alert("자동차 이름을 5글자 보다 많이 입력하셨습니다.")
      setVal("")
      nameInput.current.focus();
      return
    }
    setCarsName(splitedVal)
  },[val])
  
  const handleRoundCount = (e) => {
    setNumberOfRounds(e.target.value)
  }

  const handleRoundSubmit = (e) => {
    e.preventDefault();
    if(carsName.length===0){
      alert("자동차이름을 입력하세요!")
      nameInput.current.focus();
      return
    }
    const matchResult = []
    //객체 초기화
    for(let i = 0; i < numberOfRounds; i++){
      const roundRes = []
      carsName.forEach((name) => {
        if(i===0){
          if(Random.pickNumberInRange(0,9) >= 4){
            roundRes.push({
            label : name,
            data : "-"
          })
          }
          else{
            roundRes.push({
            label : name,
            data : ""
          })
          }
        }
        else{
          if(Random.pickNumberInRange(0,9)){
            let filtered = matchResult[i-1].filter((el)=>el.label === name)[0]
            let newData = filtered.data
            roundRes.push({
              label : name,
              data : newData + "-"
            })
          }
          else{
            let filtered = matchResult[i-1].filter((el)=>el.label === name)[0]
            let newData = filtered.data
            roundRes.push({
              label : name,
              data : newData
            })
          }
        }
      })
      matchResult.push(roundRes)
    }
    const lastRound = matchResult.at(-1)
    const highestGrade = Math.max(...lastRound.map((el)=>el.data.length))
    const lastMansData = lastRound.filter((el)=>el.data.length === highestGrade)
    const lastMansName = lastMansData.map((el)=>el.label).join(',')
    setGameOver(true)
    setWinnerGrade(highestGrade)
    setWinner(lastMansName)
    setResult(matchResult)
  }
  
  return (
    <div id="app">
    <h1>🏎️ 자동차 경주 게임</h1>
    <p>
      자동차 이름을 <strong>5자 이하로</strong> 콤마로 구분하여 입력해주세요.
      <br />
      올바른 예) east,west,south,north <br />
    </p>
    <form onSubmit={handleNameSubmit}>
      <input type="text" value={val} ref={nameInput}onChange={(e)=>handleChange(e)}/>
      <button type='submit'>확인</button>
    </form>
    <h4>시도할 횟수를 입력해주세요.</h4>
    <form onSubmit={handleRoundSubmit}>
      <input type="number" val={numberOfRounds} onChange={handleRoundCount}/>
      <button type='submit'>확인</button>
    </form>
    <h4>📄 실행 결과</h4>
    {gameOver ? 
    <div>
      <Chart newArr={result.at(-1)} winnerGrade={winnerGrade}/> 
      {result.map((el)=><Result el={el} key={shortid.generate()}/>)}
      <div>최종 우승자 : {winner}</div>
    </div>
    : null} 
  </div>
  );
}

const Result = ({el}) => {
  return (
    <div>
      {el.map((item)=><div key={shortid.generate()}>{item.label} : {item.data}</div>)}<br/>
    </div>
    
  )
}

export default App;