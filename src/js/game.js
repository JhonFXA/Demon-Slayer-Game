const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.5

const background = new SpriteScenery({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../src/imagens/game-assets/scenery1.jpg'
}, window.innerWidth, window.innerHeight)




const player1 = new Character({
    position: {
        x: 0,
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-idle.png',
    scale: 2,
    offset: {
        x: 10,
        y: 0
    },
    sprites: {
        idle: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-idle.png',
            framesMax: 8,
            framesHold: 10
        },
        idleInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-idle-inverted.png',
            framesMax: 8,
            framesHold: 10
        },
        run: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-run.png',
            framesMax: 8,
            framesHold: 10
        },
        runInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-run-inverted.png',
            framesMax: 8,
            framesHold: 10
        },
        jump: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-jump.png',
            framesMax: 2,
            framesHold: 10
        },
        jumpInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-jump-inverted.png',
            framesMax: 2,
            framesHold: 10
        },
        attack: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-attack.png',
            framesMax: 8,
            framesHold: 5
        },
        attackInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-attack-inverted.png',
            framesMax: 8,
            framesHold: 5
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 180,
        height: 50
    }
})


const player2 = new Character({
    position:{
        x: window.innerWidth - 70,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-idle.png',
    framesMax: 8,
    scale: 2,
    offset: {
        x: 10,
        y: 0
    },
    sprites: {
        idle: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-idle.png',
            framesMax: 8,
            framesHold: 10
        },
        idleInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-idle-inverted.png',
            framesMax: 8,
            framesHold: 10
        },
        run: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-run.png',
            framesMax: 8,
            framesHold: 10
        },
        runInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-run-inverted.png',
            framesMax: 8,
            framesHold: 10
        },
        jump: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-jump.png',
            framesMax: 2,
            framesHold: 10
        },
        jumpInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-jump-inverted.png',
            framesMax: 2,
            framesHold: 10
        },
        attack: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-attack.png',
            framesMax: 8,
            framesHold: 5
        },
        attackInverted: {
            imageSrc: '../src/imagens/game-assets/tanjiro/tanjiro-attack-inverted.png',
            framesMax: 8,
            framesHold: 5
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 180,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

decreaseTimer()

function isOnGround(player){
    return player.position.y + player.height + player.velocity.y >= canvas.height - 90
}


player1.direction = 1
player2.direction = -1

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0

    
    //Player 1 movement
    if(keys.a.pressed && player1.lastKey === 'a'){
        player1.velocity.x = -player1.movSpeed
        player1.direction = -1
        if(isOnGround(player1)){ player1.switchSprite('run-inverted') }

    } else if (keys.d.pressed && player1.lastKey === 'd'){
        player1.velocity.x = player1.movSpeed
        player1.direction = 1
        if(isOnGround(player1)){ player1.switchSprite('run') }
    } else if (isOnGround(player1)){
        if(player1.direction === -1){
            player1.switchSprite('idle-inverted')
        } else {
            player1.switchSprite('idle')
        }
    }

    //Player 1 jump
    if(player1.velocity.y < 0 || player1.velocity.y > 0) {
        if(player1.direction === -1){
            player1.switchSprite('jump-inverted')
        } else {
            player1.switchSprite('jump')
        }
    }

    
    //Player 2 movement
    if(keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft'){
        player2.velocity.x = -player2.movSpeed
        player2.direction = -1
        if(isOnGround(player2)){ player2.switchSprite('run-inverted') }
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight'){
        player2.velocity.x = player2.movSpeed
        player2.direction = 1
        if(isOnGround(player2)){ player2.switchSprite('run') }
    } else if (isOnGround(player2)){
        if(player2.direction === -1){
            player2.switchSprite('idle-inverted')
        } else {
            player2.switchSprite('idle')
        }
    }
    //Player 2 jump
    if(player2.velocity.y < 0 || player2.velocity.y > 0) {
        if(player2.direction === -1){
            player2.switchSprite('jump-inverted')
        } else {
            player2.switchSprite('jump')
        }
    }

    //Detect for collision
    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        }) && 
        player1.isAttacking
        ) {
            player1.isAttacking = false
            player2.color = 'yellow'
            player2.health -= 4 
            document.querySelector('.health-quantity-P2').style.width = player2.health + '%'
            setTimeout(() => {
                document.querySelector('.lose-health-P2').style.width = player2.health + '%'
            }, 1000);
    } else {
        player2.color = 'blue'
    }
    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player1
        }) && 
        player2.isAttacking
        ) {
            player2.isAttacking = false 
            player1.color = 'yellow'
            player1.health -= 4 
            document.querySelector('.health-quantity-P1').style.width = player1.health + '%'
            setTimeout(() => {
                document.querySelector('.lose-health-P1').style.width = player1.health + '%'
            }, 1000);
    } else {
        player1.color = 'red'
    }

    //Orientation collision change
    if (player1.direction === -1){
        player1.offset.x = 40
        player1.attackBox.offset.x = 30
    } else {
        player1.attackBox.offset.x = 0
        player1.offset.x = 10
    }
    if (player2.direction === -1){
        player2.offset.x = 40
        player2.attackBox.offset.x = 30
    } else {
        player2.attackBox.offset.x = 0
        player2.offset.x = 10
    }
}

animate()

window.addEventListener('keydown', (event) =>{
    //Player 1 keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player1.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player1.lastKey = 'a'
            break
        case 'w':
            if(player1.jumps>0){
                player1.velocity.y = -10
                player1.jumps--
            }
            break
        case ' ':
            if(player1.canAttack ==='true'){
                if(player1.direction === -1 && player1.position.x <= 0) return
                player1.attack()
            }
            break

    //Player 2 keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break
            case 'ArrowUp':
                if(player2.jumps>0){
                    player2.velocity.y = -10
                    player2.jumps--
                }
                break
            case 'Enter':
                if(player2.canAttack === 'true'){
                    if(player2.direction === -1 && player2.position.x <= 0) return
                    player2.attack()
                }
                break
        }
})
window.addEventListener('keyup', (event) =>{
    switch (event.key) {
        //Player 1 keys
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        //Player 2 keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }

})