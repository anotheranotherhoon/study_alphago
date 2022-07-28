/* 아래의 주석은 지우시면 안됩니다. */
/* global MissionUtils */

import React from 'react';
import { useState } from 'react';
import shortid from 'shortid';
import Chart from './Chart';

/* API 호출 상수 */
const Random = MissionUtils.Random;

function App() {

    /* API 예시 입니다. 확인하시고 지우시면 됩니다. */
    // const randomNumber = Random.pickNumberInRange(1, 10);
  
    /* 코드 작성 구역 */
  const [val, setVal] = useState('')
  const [carsName, setCarsName] = useState([])
  const [numberOfRounds, setNumberOfRounds] = useState(0)
  const [result, setResult] = useState([])
  const [winner, setWinner] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [newArr,setNewArr] = useState([])
  const [winnerGrade, setWinnerGrade] = useState(0)
  const handleChange = (e) => {
    setVal(e.target.value)
  }

  const handleNameSubmit = (e) => {
    e.preventDefault();
    let splitedVar = val.split(',');
    const moreThenFiveLetters =splitedVar.filter((el)=> el.length > 5);
    let blank = splitedVar.filter((el)=> el.length === 0);
    if(splitedVar.length > [...new Set(splitedVar)].length){
      alert("중복된 자동차 이름을 입력하셨습니다.")
      setVal("")
      return
    }
    if(blank.length){
      alert('자동차이름에 빈값을 입력할 수 없습니다.')
      return 
    }
    if(moreThenFiveLetters.length){
      alert("no")
      return
    }
    setCarsName(splitedVar)
  }
  
  const handleRoundCount = (e) => {
    setNumberOfRounds(e.target.value)
  }

  const handleRoundSubmit = (e) => {
    e.preventDefault();
    const MatchResult = []
    //객체 초기화
    for(let i = 0; i < numberOfRounds; i++){
      const newObj = {}
      carsName.forEach((el) => {
        if(i===0){
          if(Random.pickNumberInRange(0,9) >= 4){
            newObj[el] = "-"
          }
          else{
            newObj[el] = ""
          }
        }
        else{
          if(Random.pickNumberInRange(0,9) >= 4){
            newObj[el] = MatchResult[i-1][el] + "-"
          }
          else{
            newObj[el] = MatchResult[i-1][el]
          }
        }
      })
      MatchResult.push(newObj)
    }
    const lastRound = MatchResult.at(-1)
    const lastRoundValue = Object.values(lastRound)
    // lastRoundValue가 배열이므로 map을 돌리고 Math.max는 배열을 사용할 수 없음
    const highestGrade = Math.max(...lastRoundValue.map((el)=>el.length))
    const lastMan = []
    for(const key in lastRound){
      if(lastRound[key].length===highestGrade){
        lastMan.push(key)
      }
    }
    const forChart = []
    for(const key in lastRound){
      forChart.push({
        label : key,
        data : lastRound[key].length
      }
      )
    }
    console.log(forChart)
    const lastManJoin = lastMan.join(',')
    setNewArr(forChart)
    setWinnerGrade(highestGrade)
    setGameOver(true)
    setWinner(lastManJoin)
    setResult(MatchResult)
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
      <input type="text" value={val} onChange={(e)=>handleChange(e)}/>
      <button type='submit'>확인</button>
    </form>
    <h4>시도할 횟수를 입력해주세요.</h4>
    <form onSubmit={handleRoundSubmit}>
      <input type="number" val={numberOfRounds} onChange={handleRoundCount}/>
      <button type='submit'>확인</button>
    </form>
    <h4>📄 실행 결과</h4>
    {/* {carsName.map((el,idx) =><Result el={el} idx={idx} result={result}/>)} */}
    {result.map((el)=><Result el={el} key={shortid.generate()} carsName={carsName}/>)}<br/>
    
    {gameOver ? <><div>최종 우승자 : {winner}</div> <Chart newArr={newArr} winnerGrade={winnerGrade}/> </>: null} 
  </div>
  );
}

const Result = ({el, carsName}) => {
return(
    <div>
      {carsName.map((item) =><div key={shortid.generate()}> {item} : {el[item]}</div> )}<br/>
    </div>
  )
}

export default App;