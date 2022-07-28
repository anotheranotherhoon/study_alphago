import React, { useState } from 'react';

function App() {
  const Random = global.MissionUtils.Random;
  // API 예시 입니다. 확인하시고 지우시면 됩니다. README.md파일에 API 사용법을 확인해주세요.

  const [answer, setAnswer] = useState(
    Random.pickUniqueNumbersInRange(1, 9, 3)
  ); // 컴퓨터가 뽑은 세자리 수의 배열인 answer 선언
  console.log(answer);
  // input태그의 value 속성에 player 상태를 넣어주세요.
  const [player, setPlayer] = useState('');

  // 재시작 버튼 state
  const [isAnswer, setIsAnswer] = useState(false);
  const [result, setResult] = useState('');
  /* 코드 작성 구역 */
  // player의 state
  // * 스트라이크 : if answer[i] === player[i] (자릿수 동일, 숫자도 동일) 면 strike++
  // * 볼 : if player.includes(answer[i]) 면 ball++
  // * 낫싱 : 반복문 종료하고 if strike === 0 && ball === 0 이면 낫싱

  // * input 이벤트 핸들러

  const handleInputChange = e => {
    // * e.target.value는 바로 바뀌는데 state는 바뀌는데 딜레이가 있는거 왜????

    if (e.target.value.length === 4) {
      e.target.value = '';
      setPlayer('');
      console.log(player);
      alert('3자리의 숫자만 입력하세요');
    }
    if (isNaN(e.target.value)) {
      e.target.value = '';
      alert('올바른 값이 아닙니다');

      setPlayer('');
    }
    if (e.target.value.length !== [...new Set(e.target.value)].length) {
      e.target.value = '';
      alert('중복된 숫자입니다');
      setPlayer('');
    }
    setPlayer(e.target.value);
  };

  // * buttonClick 이벤트 핸들러
  const handleButtonClick = e => {
    e.preventDefault();
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === Number(player[i])) {
        strike += 1;
      } else if (player.includes(String(answer[i]))) {
        ball += 1;
      }
    }

    // 반복문 종료 후 비교하기
    // 1. 낫싱
    if (strike === 0 && ball === 0) {
      setResult('낫싱');
      return;
    }
    // 2. 스트라이크
    if (strike === 3 && result === '') {
      setResult('승리');
      setIsAnswer(true);

      return;
    }

    if (!ball) {
      setResult(`${strike}스트라이크`);
      return;
    }
    if (!strike) {
      setResult(`${ball}볼`);
      return;
    }

    // 그 외의 경우
    setResult(`${ball}볼 ${strike}스트라이크`);
  };

  const handleRestart = () => {
    if (window.confirm('재시작하시겠습니까?')) {
      window.location.reload();
    }
  };

  return (
    <div id="app">
      <h1>⚾ 숫자 야구 게임</h1>
      <p>
        <strong>1~9까지의 수</strong>를 중복없이
        <strong>3개</strong> 입력해주세요. <br />
        올바른 예) 139 <br />
        틀린 예) 122
      </p>
      {/* input과 button에 핸들러를 만들어서 넣어주세요. */}
      <form>
        <input
          type="text"
          id="user-input"
          value={player}
          onChange={e => {
            handleInputChange(e);
          }}
        />
        <button id="submit" onClick={handleButtonClick}>
          확인
        </button>
      </form>
      <h3>📄 결과</h3>
      <div id="result">{result}</div>
      {isAnswer ? (
        <button id="game-restart-button" onClick={handleRestart}>
          재시작
        </button>
      ) : null}
    </div>
  );
}

export default App;