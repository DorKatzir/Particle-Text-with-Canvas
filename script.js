window.addEventListener('load', function() {

    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth // covers all window horizontaly
    canvas.height = window.innerHeight // covers all window vertically
    console.log(ctx)
    
    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect
            this.x = Math.random() * this.effect.canvasHeight
            this.y = Math.random() * this.effect.canvasWidth
            this.color = color
            this.originX = x
            this.originY = y
            this.size = this.effect.gap // size of the particle
            this.dx = 0 // distance between particle and mouse horizontally
            this.dy = 0 // distance between particle and mouse vertically
            this.vx = 0 // horizontally velocity speed
            this.vy = 0 // vertically velocity speed
            this.force = 0 // force of push particle at a certain speed
            this.angle = 0 // direction of the push
            this.distance = 0 // distance between particle and mouse
            this.friction = Math.random() * 0.6 + 0.15 
            this.ease = Math.random() * 0.1 + 0.005
        }
        
        draw() {
            this.effect.context.fillStyle = this.color
            this.effect.context.fillRect(this.x, this.y, this.size, this.size)
        }
        
        update() {
            this.x += (this.originX - this.x) * this.ease
            this.y += (this.originY - this.y) * this.ease
        }
        
    } // End of Particle class
    
    
    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context
            this.canvasWidth = canvasWidth
            this.canvasHeight = canvasHeight
            this.textX = this.canvasWidth / 2
            this.textY = this.canvasHeight / 2
            this.fontSize = 100
            this.lineHeight = this.fontSize * 0.96
            this.maxTextWidth = this.canvasWidth * 0.8
            this.textInput = document.getElementById('textInput')
            this.textInput.addEventListener('keyup', (e) => {
                if (e.key !== ' ') {
                    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
                    this.wrapText(e.target.value) 
                }
            })
            // particle text
            this.particles = []
            this.gap = 3
            this.mouse = {
                radius: 20000,
                x: 0,
                y: 0
            }
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x
                this.mouse.y = e.y
                // console.log(this.mouse.x, this.mouse.y)
            })

        } // End of constructor

        wrapText(text) {
            //canvas settings
            const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight)    
            gradient.addColorStop(0.3, 'red')
            gradient.addColorStop(0.5, 'fuchsia')
            gradient.addColorStop(0.7, 'purple')
            this.context.fillStyle = gradient 
            this.context.textAlign = 'center'
            this.context.textBaseline = 'middle'
            this.context.lineWidth = 3
            // this.context.strokeStyle = 'rgba(255, 255, 255, 0)'
            this.context.font = this.fontSize + 'px Trebuchet MS'
            // breake multiple text
            let linesArray = []
            let words = text.split(' ')
            let lineCounter = 0
            let line = ''
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + ' '
                if (this.context.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + ' '
                    lineCounter++
                } 
                else {
                    line = testLine
                }
                linesArray[lineCounter] = line
            }
            let textHeight = this.lineHeight * lineCounter
            let textY = this.canvasHeight/2 - textHeight/2
            linesArray.forEach((el, index) => {
                this.context.fillText(el, this.canvasWidth/2, textY + (this.lineHeight * index))
                // this.context.strokeText(el, this.canvasWidth/2, textY + (this.lineHeight * index))
            })
            this.convertToParticles()

        } // END of wrapText method

        convertToParticles() {
            this.particles = []
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            for (let y = 0; y < this.canvasHeight; y += this.gap) {
                for (let x = 0; x < this.canvasWidth; x += this.gap) {
                    const index = (y * this.canvasWidth + x) * 4
                    const alpha = pixels[index + 3]
                    if (alpha > 0) {
                        const red = pixels[index]
                        const green = pixels[index + 1]
                        const blue = pixels[index + 2]
                        const color = `rgb(${red}, ${green}, ${blue})` 
                        this.particles.push(new Particle(this, x, y, color))
                    }
                }
            }
            console.log(this.particles)

        } // End of convertToParticles method

        render() {
            this.particles.forEach(particle => {
                particle.update()
                particle.draw()
            })
        } // END of render method


    } // End of Effect class

    const effect = new Effect(ctx, canvas.width, canvas.height)
    effect.wrapText('Hello dror what\'s on your mind?')
    effect.render()

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.render()
        requestAnimationFrame(animate)
    }
    animate()



}) // END of window load Listener