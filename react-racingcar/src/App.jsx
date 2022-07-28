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
      console.log(moreThenFiveLetters)
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

  //최종 결과를 담는 matchResult 배열을 만들고
  //라운드 결과를 담는 roundResult 객체를 만들어 라운드 수 만큼 반복한다.
  //1라운드의 경우 최초의 값을 적용한다. 그 후부터는 앞 라운드의 값을 참조하고 해당 라운드 결과를 반영한다.
  const handleRoundSubmit = (e) => {
    e.preventDefault();
    if(carsName.length===0){
      return
    }
    const matchResult = []
    //객체 초기화
    for(let i = 0; i < numberOfRounds; i++){
      const roundResult = {}
      carsName.forEach((el) => {
        if(i===0){
          if(Random.pickNumberInRange(0,9) >= 4){
            roundResult[el] = "-"
          }
          else{
            roundResult[el] = ""
          }
        }
        else{
          if(Random.pickNumberInRange(0,9) >= 4){
            roundResult[el] = matchResult[i-1][el] + "-"
          }
          else{
            roundResult[el] = matchResult[i-1][el]
          }
        }
      })
      matchResult.push(roundResult)
    }
    // 최종결과를 차트로 만들기 위해 마지막 라운드 결과를 가져온다.
    // 최종라운드에서 가장 값이 높은 값을 가진 키가 최종 우승자가된다.
    // 게임이 끝났을 경우에만 최종 우승자와 차트가 보이도록 setGameOver를 true로 만들어준다.
    const lastRound = matchResult.at(-1)
    const lastRoundValue = Object.values(lastRound)
    // lastRoundValue가 배열이므로 map을 돌리고 Math.max는 배열을 사용할 수 없음
    const highestGrade = Math.max(...lastRoundValue.map((el)=>el.length))
    const lastMan = []
    for(const key in lastRound){
      if(lastRound[key].length===highestGrade){
        lastMan.push(key)
      }
    }
    // 최종결과를 만들 차트를 만들기 위해 최종라운드의 결과를 새로운 배열에 담는다.
    const forChart = []
    for(const key in lastRound){
      forChart.push({
        label : key,
        data : lastRound[key].length
      }
      )
    }
    const lastManJoin = lastMan.join(',')
    setNewArr(forChart)
    setWinnerGrade(highestGrade)
    setGameOver(true)
    setWinner(lastManJoin)
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
      <Chart newArr={newArr} winnerGrade={winnerGrade}/> 
      {result.map((el)=><Result el={el} key={shortid.generate()} carsName={carsName}/>)}
      <div>최종 우승자 : {winner}</div>
    </div>
    : null} 
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