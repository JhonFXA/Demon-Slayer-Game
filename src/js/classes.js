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

        // context.fillStyle = this.color
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)
        // // Attack box
        // if(this.isAttacking){
        //     context.fillStyle = 'green'
        //     context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        // }
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
        direction
    }){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.movSpeed = 8
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
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.direction = direction


        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }


    update() {
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //Collision with ground
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 70) {
            this.velocity.y = 0
            this.jumps = 2
        } else {
            this.velocity.y += gravity
        }

        //Collision with walls
        if(this.position.x <= 0) {
            this.position.x = 0
        } else if (this.position.x + this.width >= canvas.width - 40){
            this.position.x = canvas.width - this.width - 40
        }
    }

    attack() {
        this.switchSprite('attack')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }

    switchSprite(sprite) {

        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1) return

        switch(sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.idle.framesHold
                }
                break;
            case 'idle-inverted':
                if(this.image !== this.sprites.idleInverted.image){
                    this.image = this.sprites.idleInverted.image
                    this.framesMax = this.sprites.idleInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.idleInverted.framesHold
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.run.framesHold
                }
                break;
            case 'run-inverted':
                if(this.image !== this.sprites.runInverted.image){
                    this.image = this.sprites.runInverted.image
                    this.framesMax = this.sprites.runInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.runInverted.framesHold
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.jump.framesHold
                }
                break;
            case 'jump-inverted':
                if(this.image !== this.sprites.jumpInverted.image){
                    this.image = this.sprites.jumpInverted.image
                    this.framesMax = this.sprites.jumpInverted.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.jumpInverted.framesHold
                }
                break;
            case 'attack':
                if(this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                    this.framesHold = this.sprites.attack.framesHold
                }
                break;
        }
    }
}

