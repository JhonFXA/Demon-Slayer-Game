const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.5

class Sprite {
    constructor({position,velocity,color,offset}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.movSpeed = 6
        this.jumps = 2
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        // Attack box
        if(this.isAttacking){
            context.fillStyle = 'green'
            context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //Collision with ground
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            this.jumps = 2
        } else {
            this.velocity.y += gravity
        }

        //Collision with walls
        if(this.position.x <= 0) {
            this.position.x = 0
        } else if (this.position.x + this.width >= canvas.width){
            this.position.x = canvas.width - this.width
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}

const player1 = new Sprite({
    position:{
        x: 70,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        x: 0,
        y: 0
    }
})


const player2 = new Sprite({
    position:{
        x: 900,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
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

function rectangularCollision ({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle1.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0,0,canvas.width,canvas.height)
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0

    //Player 1 movement
    if(keys.a.pressed && player1.lastKey === 'a'){
        player1.velocity.x = -player1.movSpeed
    } else if (keys.d.pressed && player1.lastKey === 'd'){
        player1.velocity.x = player1.movSpeed
    }

    //Player 2 movement
    if(keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft'){
        player2.velocity.x = -player2.movSpeed
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight'){
        player2.velocity.x = player2.movSpeed
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
            document.querySelector('#player2Health').style.width = player2.health + '%'
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
            document.querySelector('#player1Health').style.width = player1.health + '%'
    } else {
        player1.color = 'red'
    }

    //Orientation collision change
    if (player1.position.x + player1.width > player2.position.x + player2.width){
        player1.attackBox.offset.x = -50
    } else {
        player1.attackBox.offset.x = 0
    }
    if (player2.position.x + player2.width < player1.position.x + player1.width){
        player2.attackBox.offset.x = 0
    } else {
        player2.attackBox.offset.x = -50
    }

   
}

animate()

window.addEventListener('keydown', (event) =>{
    console.log(event.key)
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
            player1.attack()
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
                player2.attack()
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