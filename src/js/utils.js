function rectangularCollision ({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

//TIMER 
let timer = 99
function decreaseTimer() {
    if (timer > 0) {
        setTimeout(decreaseTimer, 1000)
        timer--
        document.getElementById('timer').innerHTML = timer
    } else if ( timer === 0){
        document.getElementById('winning-result').style.display = 'block'
        if(player1.health > player2.health){
            document.getElementById('winner').innerHTML = characterP1.toUpperCase()
        } else if (player1.health < player2.health){
            document.getElementById('winner').innerHTML = characterP2.toUpperCase()
        } else {
            document.getElementById('winning-result').innerHTML = "DRAW!"

        }
        setTimeout(() => {
            document.querySelector('nav').style.display = 'flex'
            document.querySelector('.match-result').style.background = 'black'
            setTimeout(() => {
               const buttons = document.querySelectorAll('#button')
               buttons[0].style.opacity = 1
               buttons[1].style.opacity = 1
            }, 1500);
        }, 1000);
    }
}

function rematch(){
    location.reload()
}

function changeCharacter(){
    window.location.href = "character-select.html"
}