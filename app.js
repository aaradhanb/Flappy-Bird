document.addEventListener('DOMContentLoaded' , () => { //wait for the HTML Document to load

  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground-moving')

  let birdLeft = 220
  let birdBottom = 100
  let gravity = 3
  let isGameOver = false
  let gap = 430


  function startGame() {
      birdBottom -= gravity
      bird.style.bottom = birdBottom + 'px' // positions bird accordingly
      bird.style.left = birdLeft + 'px'
  }
  let gameTimerId = setInterval(startGame, 20) // startGame is invoked every 20 ms

  function control(e) {
    //to jump using spacebar
      if (e.keyCode === 32) {
          jump()
      }
  }

  function jump() {
    // to make the bird jump
      if (birdBottom < 500) birdBottom += 50
      bird.style.bottom = birdBottom + 'px'
      console.log(birdBottom)
  }
  document.addEventListener('keyup', jump)


  function generateObstacle() {
      let obstacleLeft = 500
      let randomHeight = Math.random() * 60
      let obstacleBottom = randomHeight //positioning the obstacle at random heights from the ground
      const obstacle = document.createElement('div') //create an obstacle(pipe) div
      const topObstacle = document.createElement('div')
      if (!isGameOver) {
          obstacle.classList.add('obstacle')
          topObstacle.classList.add('topObstacle') // add class obstacle/topObstacle only if the game is not over
      }
      gameDisplay.appendChild(obstacle) // puts the div into the game container
      gameDisplay.appendChild(topObstacle)
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'
      obstacle.style.bottom = obstacleBottom + 'px'
      topObstacle.style.bottom = obstacleBottom + gap + 'px'

      function moveObstacle() {
        //to move the obstacle lefftwards as the game progresses
          obstacleLeft -=2
          obstacle.style.left = obstacleLeft + 'px'
          topObstacle.style.left = obstacleLeft + 'px'

          if (obstacleLeft === -60) {
            //to stop the obstaacle and make it disappear once it hits the left side of game screen
              clearInterval(timerId)
              gameDisplay.removeChild(obstacle)
              gameDisplay.removeChild(topObstacle)
          }
          if (
            obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
            (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
            birdBottom === 0 
            ) {
            gameOver()
            clearInterval(timerId)
        }
    }
      let timerId = setInterval(moveObstacle, 20) // to keep invoking the moveObstacle function every 20 ms
      if (!isGameOver) setTimeout(generateObstacle, 3000) //till game is not over, generate new obstacle every 3s

  }
  generateObstacle()


  function gameOver() {
    //the game stops
      clearInterval(gameTimerId)
      console.log('game over')
      isGameOver = true
      document.removeEventListener('keyup', jump)
      ground.classList.add('ground')
      ground.classList.remove('ground-moving')
  }


})
