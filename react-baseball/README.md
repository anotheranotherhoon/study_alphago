## π κΈ°λ₯ μκ΅¬μ¬ν­

- [x] κΈ°λ³Έμ μΌλ‘ 1λΆν° 9κΉμ§ μλ‘ λ€λ₯Έ μλ‘ μ΄λ£¨μ΄μ§ 3μλ¦¬μ μλ₯Ό λ§μΆλ κ²μμ΄λ€.
- [x] κ°μ μκ° κ°μ μλ¦¬μ μμΌλ©΄ μ€νΈλΌμ΄ν¬, λ€λ₯Έ μλ¦¬μ μμΌλ©΄ λ³Ό, κ°μ μκ° μ ν μμΌλ©΄ λ«μ±μ΄λ ννΈλ₯Ό μ»κ³ , κ·Έ ννΈλ₯Ό μ΄μ©ν΄μ λ¨Όμ  μλλ°©(μ»΄ν¨ν°)μ μλ₯Ό λ§μΆλ©΄ μΉλ¦¬νλ€.
- [x] μ μ«μ μΌκ΅¬κ²μμμ μλλ°©μ μ­ν μ μ»΄ν¨ν°κ° νλ€. μ»΄ν¨ν°λ 1μμ 9κΉμ§ μλ‘ λ€λ₯Έ μμμ μ 3κ°λ₯Ό μ ννλ€. κ²μ νλ μ΄μ΄λ μ»΄ν¨ν°κ° μκ°νκ³  μλ 3κ°μ μ«μλ₯Ό μλ ₯νκ³ , μ»΄ν¨ν°λ μλ ₯ν μ«μμ λν κ²°κ³Όλ₯Ό μΆλ ₯νλ€.
- [x] μ΄ κ°μ κ³Όμ μ λ°λ³΅ν΄ μ»΄ν¨ν°κ° μ νν 3κ°μ μ«μλ₯Ό λͺ¨λ λ§νλ©΄ κ²μμ΄ μ’λ£λκ³ , μ¬μμ λ²νΌμ΄ λΈμΆλλ€.
- [x] κ²μμ΄ μ’λ£λ ν μ¬μμ λ²νΌμ ν΄λ¦­ν΄ κ²μμ λ€μ μμν  μ μλ€.
- [x] μ¬μ©μκ° μλͺ»λ κ°μ μλ ₯ν κ²½μ° alertμΌλ‘ μλ¬ λ©μμ§λ₯Ό λ³΄μ¬μ£Όκ³ , λ€μ μλ ₯ν  μ μκ² νλ€.

## βοΈ Ex) 
- μλλ°©(μ»΄ν¨ν°)μ μκ° 425μΌ λ
- 123μ μ μν κ²½μ° : 1μ€νΈλΌμ΄ν¬
- 456μ μ μν κ²½μ° : 1λ³Ό 1μ€νΈλΌμ΄ν¬
- 789λ₯Ό μ μν κ²½μ° : λ«μ±

<p align="center">
<img src="https://raw.githubusercontent.com/woowacourse/javascript-baseball-precourse/main/images/baseball_demo.gif">
</p>

## π Random API μ°Έκ³  μ¬ν­

Random.pickNumberInRange(startInclusive, endInclusive)   
μ«μ λ²μλ₯Ό μ§μ νλ©΄ μμ λλ λ μ«μλ₯Ό ν¬ν¨νμ¬ λ²μμ μ«μλ₯Ό λ°ννλ€.
```javascript
Random.pickNumberInRange(1, 10); // 1
Random.pickNumberInRange(1, 10); // 10
Random.pickNumberInRange(1, 10); // 4
Random.pickNumberInRange(1, 10); // 5
```

Random.pickNumberInList(array)   
λͺ©λ‘μ μλ μ«μ μ€ νλλ₯Ό λ°ννλ€.
```javascript
Random.pickNumberInList([1, 3, 10]); // 1
Random.pickNumberInList([1, 3, 10]); // 10
Random.pickNumberInList([1, 3, 10]); // 3
```

Random.pickUniqueNumbersInRange(startInclusive, endInclusive, count)   
μ«μ λ²μ λ΄μμ μ§μ λ κ°μλ§νΌ κ²ΉμΉμ§ μλ μ«μλ₯Ό λ°ννλ€.
```javascript
Random.pickUniqueNumbersInRange(1, 10, 2); // [1, 2]
Random.pickUniqueNumbersInRange(1, 10, 5); // [1, 10, 7, 8, 5]
```

Random.shuffle(array)   
λ¬΄μμλ‘ μμΈ μ λͺ©λ‘μ λ°ννλ€.
```javascript
Random.shuffle([1, 2, 3, 4, 5]); // [2, 4, 1, 3, 5]
```