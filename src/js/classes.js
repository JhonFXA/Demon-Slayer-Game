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

        if (this.image === this.sprites.fall.image) {
            if (this.framesCurrent >= this.sprites.fall.framesMax - 1) {
                // Aqui, ao atingir o último quadro, você pode interromper a animação.
                return;

            }
        }
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
        gotHit = false,
        leftClickCount = 0,
        rightClickCount = 0
        
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
        this.movSpeed = speed
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
        this.gotHit = gotHit
        this.leftClickCount = leftClickCount
        this.rightClickCount = rightClickCount
        
        


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

        // Defeat checker
        if(this.health === 0){
            this.switchSprite('fall')
            this.canMove = false
        }



        
        
        // Dash 
        if(this.leftClickCount === 2 || this.rightClickCount === 2){
            if(this.direction > 0){
                this.position.x += 20
                this.switchSprite('dash')
            } else {
                this.position.x -= 20
                this.switchSprite('dash-inverted')
            }
            // setTimeout(() => {
            //     this.leftClickCount = 0
            //     this.rightClickCount = 0
            // }, 300);
        }
        
        
    }
    

    attack() {
        this.isAttacking = true
        this.canAttack = false
        setTimeout(()=>{
            this.canAttack = true
        },700)
    }

    takeHit(){
        if(this.health > 0){
            this.gotHit = true
            this.isAttacking = false
            this.switchSprite('take-hit')
            this.canMove = false
            this.health -= 4
        }
    }
    
    switchSprite(sprite) {
        //overriding all other animations with the attack animation
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1  && this.gotHit === false || this.image === this.sprites.attackInverted.image && this.framesCurrent < this.sprites.attackInverted.framesMax - 1 && this.gotHit === false ) {
            return
        }
        
        //overriding all other animations with the defeat animation
        if(this.image === this.sprites.fall.image && this.framesCurrent < this.sprites.fall.framesMax){
            return
        }
        //override when character gets hit
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1){
            return
        }
        
        //overriding all other animations with the dash animation
        if(this.image === this.sprites.dash.image && this.framesCurrent < this.sprites.dash.framesMax - 1 && !this.isAttacking || this.image === this.sprites.dashInverted.image && this.framesCurrent < this.sprites.dashInverted.framesMax - 1 && !this.isAttacking){
            return
        }


        switch(sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.canAttack = true
                    this.canMove = true
                    this.gotHit = false
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.idle.framesHold
                    this.scale = this.sprites.idle.scale
                    this.offset.y = this.sprites.idle.offset.y
                }
                break
            case 'idle-inverted':
                if(this.image !== this.sprites.idleInverted.image){
                    this.canAttack = true
                    this.canMove = true
                    this.gotHit = false
                    this.image = this.sprites.idleInverted.image
                    this.framesMax = this.sprites.idleInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.idleInverted.framesHold
                    this.scale = this.sprites.idleInverted.scale
                    this.offset.y = this.sprites.idleInverted.offset.y
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.canAttack = true
                    this.canMove = true
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.run.framesHold
                    this.scale = this.sprites.run.scale
                    this.offset.y = this.sprites.run.offset.y
                }
                break
            case 'run-inverted':
                if(this.image !== this.sprites.runInverted.image){
                    this.canAttack = true
                    this.canMove = true
                    this.image = this.sprites.runInverted.image
                    this.framesMax = this.sprites.runInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.runInverted.framesHold
                    this.scale = this.sprites.runInverted.scale
                    this.offset.y = this.sprites.runInverted.offset.y
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.jump.framesHold
                    this.scale = this.sprites.jump.scale
                    this.offset.y = this.sprites.jump.offset.y
                }
                break
            case 'jump-inverted':
                if(this.image !== this.sprites.jumpInverted.image){
                    this.image = this.sprites.jumpInverted.image
                    this.framesMax = this.sprites.jumpInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.jumpInverted.framesHold
                    this.scale = this.sprites.jumpInverted.scale
                    this.offset.y = this.sprites.jumpInverted.offset.y
                }
                break
            case 'attack':
                if(this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.attack.framesHold
                    this.scale = this.sprites.attack.scale
                    this.offset.y = this.sprites.attack.offset.y
                }
                break
            case 'attack-inverted':
                if(this.image !== this.sprites.attackInverted.image){
                    this.image = this.sprites.attackInverted.image
                    this.framesMax = this.sprites.attackInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.attackInverted.framesHold
                    this.scale = this.sprites.attackInverted.scale
                    this.offset.y = this.sprites.attackInverted.offset.y
                }
                break
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
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.canAttack = false
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.fall.framesHold
                    this.scale = this.sprites.fall.scale
                    this.offset.y = this.sprites.fall.offset.y
                }
                break
            case 'dash':
                this.image = this.sprites.dash.image
                this.framesMax = this.sprites.dash.framesMax
                this.framesCurrent = 0
                this.framesHold = this.sprites.dash.framesHold
                this.scale = this.sprites.dash.scale
                this.offset.y = this.sprites.dash.offset.y
                break
            case 'dash-inverted':
                this.image = this.sprites.dashInverted.image
                this.framesMax = this.sprites.dashInverted.framesMax
                this.framesCurrent = 0
                this.framesHold = this.sprites.dashInverted.framesHold
                this.scale = this.sprites.dashInverted.scale
                this.offset.y = this.sprites.dashInverted.offset.y
                break
        }
    }
}

