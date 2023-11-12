class SpriteScenery {
    constructor({position , imageSrc}, width, height){
        this.position = position
        this.height = height
        this.width = width
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}


class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x:0, y:0} }){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 1
        this.offset = offset
    }

    draw() {
        context.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )

        if(keys.Control.pressed){
            if(controlSwitch === 1){
                context.fillStyle = this.color
                context.fillRect(this.position.x, this.position.y, this.width, this.height)
                // // Attack box
                // // if(this.isAttacking){
                    context.fillStyle = 'green'
                    context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
                // // }
            } else {
                controlSwitch = 0
            }
        }

    }

    animateFrames(){
        this.framesElapsed++

        if(this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}

class Character extends Sprite {
    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = { x:0, y:0 },
        sprites,
        attackBox = { offset: {x:0, y:0}, width: undefined, height: undefined},
        direction,
        canAttack = true,
        canMove = true,
        strikedFirst
    }){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 80
        this.height = 150
        this.lastKey
        this.movSpeed = 12
        this.jumps = 2
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.direction = direction
        this.canAttack = canAttack
        this.canMove = canMove
        this.strikedFirst = strikedFirst


        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }


    update() {
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //Collision with ground
        if (isOnGround(this)) {
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
        this.strikedFirst = true

        this.canAttack = false

        setTimeout(()=>{
            this.canAttack = true
        },700)
    }

    takeHit(){
        this.switchSprite('take-hit')
        this.canMove = false
        if(this.health > 0){
            this.health -= 4
        }
    }
    
    switchSprite(sprite) {
        //overriding all other animations with the attack animation
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1  || this.image === this.sprites.attackInverted.image && this.framesCurrent < this.sprites.attackInverted.framesMax - 1) {
            return
        }
        //override when character gets hit
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1){
            return
        }



        switch(sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.strikedFirst = false
                    this.canAttack = true
                    this.canMove = true
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.idle.framesHold
                    this.scale = this.sprites.idle.scale
                    this.offset.y = this.sprites.idle.offset.y
                }
                break;
            case 'idle-inverted':
                if(this.image !== this.sprites.idleInverted.image){
                    this.strikedFirst = false
                    this.canAttack = true
                    this.canMove = true
                    this.image = this.sprites.idleInverted.image
                    this.framesMax = this.sprites.idleInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.idleInverted.framesHold
                    this.scale = this.sprites.idleInverted.scale
                    this.offset.y = this.sprites.idleInverted.offset.y
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.run.framesHold
                    this.scale = this.sprites.run.scale
                    this.offset.y = this.sprites.run.offset.y
                }
                break;
            case 'run-inverted':
                if(this.image !== this.sprites.runInverted.image){
                    this.image = this.sprites.runInverted.image
                    this.framesMax = this.sprites.runInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.runInverted.framesHold
                    this.scale = this.sprites.runInverted.scale
                    this.offset.y = this.sprites.runInverted.offset.y
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.jump.framesHold
                    this.scale = this.sprites.jump.scale
                }
                break;
            case 'jump-inverted':
                if(this.image !== this.sprites.jumpInverted.image){
                    this.image = this.sprites.jumpInverted.image
                    this.framesMax = this.sprites.jumpInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.jumpInverted.framesHold
                    this.scale = this.sprites.jumpInverted.scale
                }
                break;
            case 'attack':
                if(this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.attack.framesHold
                    this.scale = this.sprites.attack.scale
                    this.offset.y = this.sprites.attack.offset.y
                }
                break;
            case 'attack-inverted':
                if(this.image !== this.sprites.attackInverted.image){
                    this.image = this.sprites.attackInverted.image
                    this.framesMax = this.sprites.attackInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.attackInverted.framesHold
                    this.scale = this.sprites.attackInverted.scale
                    this.offset.y = this.sprites.attackInverted.offset.y
                }
                break;
            case 'take-hit':
                if(this.image !== this.sprites.takeHit.image){
                    this.canAttack = false
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.takeHit.framesHold
                    this.scale = this.sprites.takeHit.scale
                    this.offset.y = this.sprites.takeHit.offset.y
                }
                break;
        }
    }
}

