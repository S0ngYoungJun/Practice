
    document.addEventListener('DOMContentLoaded', ()=> {
      const squares = document.querySelectorAll('.grid div')
      const scoreDisplay = document.querySelector('span')
      const startbtn = document.querySelector('.start')
      const width = 10
      let currentIndex = 0 ;
      let appleIndex = 0 ;
      let currentSnake = [2,1,0]
      let direction = 1
      let score = 0
      let speed = 0.6
      let intervalTime = 0;
      let interval = 0

      function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score=0
        randomApple()
        direction=1
        scoreDisplay.innerText= score
        intervalTime= 1000
        currentSnake= [2,1,0]
        currentIndex=0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcoms, intervalTime)
      }

      function moveOutcoms(){
        if(
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <0 && direction === -width) ||
        squares[currentSnake[0]+ direction].classList.contains('snake')
        ) {
          return clearInterval(interval)
        }
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        if(squares[currentSnake[0]].classList.contains('apple')){
          squares[currentSnake[0]].classList.remove('apple')
          squares[tail].classList.add('snake')
          currentSnake.push(tail)
          randomApple()
          score++
          scoreDisplay.textContent=score
          clearInterval(interval)
          intervalTime=intervalTime * speed
          interval = setInterval(moveOutcoms, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')



      }
    
      function randomApple() {
    
        //처음 한번 실행해야 되서, do {} while 반복문을 사용
        do {
          
          //div의 길이(100개)와 0~1의 랜덤숫자를 곱하고, Math.floor로 내림해준다.
          //그래서 나올 수 있는 수는 0~99
          appleIndex = Math.floor(Math.random() * squares.length);
          
          //사과 인덱스가 snake 클래스를 가지고 있으면 또 실행된다.
          //결국 snake 클래스를 가지고 있지않은 div를 찾기 위함이다
        } while(squares[appleIndex].classList.contains('snake'));
        
        //나온 위치에 사과를 표시
        squares[appleIndex].classList.add('apple');
      }







      function control(e){
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode ===39){
          direction = 1
        }else if (e.keyCode === 38){
          direction = -width
        }else if (e.keyCode === 37){
          direction = -1
        }else if (e.keyCode === 40){
          direction = +width
        }
      }
      document.addEventListener('keyup',control)
      startbtn.addEventListener('click', startGame)

    })
