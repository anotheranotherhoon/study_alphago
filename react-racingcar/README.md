## 🙌 기능 요구사항

- [ ] 주어진 횟수 동안 n 대의 자동차는 전진 또는 멈출 수 있다.
- [ ] 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- [ ] 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- [ ] 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- [ ] 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
- [ ] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- [ ] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
- [ ] 사용자가 잘못된 입력 값을 작성한 경우 alert을 이용해 메시지를 보여주고, 다시 입력할 수 있게 한다.

## ❗️ Ex) 

<p align="center">
<img src="https://github.com/usageness/javascript-racingcar-precourse/raw/main/images/result.jpg">
</p>

## 🌈 Random API 참고 사항

Random.pickNumberInRange(startInclusive, endInclusive)   
숫자 범위를 지정하면 시작 또는 끝 숫자를 포함하여 범위의 숫자를 반환한다.
```javascript
Random.pickNumberInRange(1, 10); // 1
Random.pickNumberInRange(1, 10); // 10
Random.pickNumberInRange(1, 10); // 4
Random.pickNumberInRange(1, 10); // 5
```

Random.pickNumberInList(array)   
목록에 있는 숫자 중 하나를 반환한다.
```javascript
Random.pickNumberInList([1, 3, 10]); // 1
Random.pickNumberInList([1, 3, 10]); // 10
Random.pickNumberInList([1, 3, 10]); // 3
```

Random.pickUniqueNumbersInRange(startInclusive, endInclusive, count)   
숫자 범위 내에서 지정된 개수만큼 겹치지 않는 숫자를 반환한다.
```javascript
Random.pickUniqueNumbersInRange(1, 10, 2); // [1, 2]
Random.pickUniqueNumbersInRange(1, 10, 5); // [1, 10, 7, 8, 5]
```

Random.shuffle(array)   
무작위로 섞인 새 목록을 반환한다.
```javascript
Random.shuffle([1, 2, 3, 4, 5]); // [2, 4, 1, 3, 5]
```