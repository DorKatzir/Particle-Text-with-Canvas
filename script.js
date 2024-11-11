window.addEventListener('load', function() {

    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d', { 
        willReadFrequently: true
    })
    canvas.width = window.innerWidth // covers all window horizontaly
    canvas.height = window.innerHeight // covers all window vertically
    
    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect
            this.x = Math.random() * this.effect.canvasWidth
            this.y = Math.random() * this.effect.canvasHeight
            this.color = color
            this.originX = x
            this.originY = y
            this.size = this.effect.gap - 1.168 // size of the particle
            this.dx = 0 // distance between particle and mouse horizontally
            this.dy = 0 // distance between particle and mouse vertically
            this.vx = 0 // horizontally velocity speed
            this.vy = 0 // vertically velocity speed
            this.force = 0 // force of push particle at a certain speed
            this.angle = 0 // direction of the push
            this.distance = 0 // distance between particle and mouse 
            this.friction = 0.9
            this.ease = 0.09
        }
        
        draw() {
            this.effect.context.fillStyle = this.color
            this.effect.context.fillRect(this.x, this.y, this.size, this.size)
        }
        
        update() {
            this.dx = this.effect.mouse.x - this.x
            this.dy = this.effect.mouse.y - this.y
            this.distance = this.dx * this.dx + this.dy * this.dy
            this.force = -this.effect.mouse.radius / this.distance

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx)
                this.vx += this.force * Math.cos(this.angle)
                this.vy += this.force * Math.sin(this.angle)
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
        }
        
    } // End of Particle class
    
    
    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context
            this.canvasWidth = canvasWidth
            this.canvasHeight = canvasHeight
            this.textX = this.canvasWidth / 2
            this.textY = this.canvasHeight / 2
            this.fontSize = 80
            this.lineHeight = this.fontSize 
            this.maxTextWidth = this.canvasWidth * 0.8
            this.verticalOffset = -50
            this.textInput = document.getElementById('textInput')
            this.textInput.addEventListener('keyup', (e) => {
                if (e.key !== ' ') {
                    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
                    this.wrapText(e.target.value) 
                }
            })
            // particle text
            this.particles = []
            this.gap = 3 // minimum is 3
            this.mouse = {
                radius: 20000,
                x: 0,
                y: 0
            }
            window.addEventListener('pointermove', (e) => {
                this.mouse.x = e.x
                this.mouse.y = e.y
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
            this.context.font = this.fontSize + 'px Impact, Trebuchet MS, system-ui, -apple-system'
            this.context.letterSpacing = '0px'
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
            let textY = this.canvasHeight/2 - textHeight/2 + this.verticalOffset
            linesArray.forEach((el, index) => {
                this.context.fillText(el, this.canvasWidth/2, textY + (this.lineHeight * index))
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
                        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`
                        this.particles.push(new Particle(this, x, y, color))
                    }
                }
            }

        } // End of convertToParticles method

        render() {
            this.particles.forEach(particle => {
                particle.update()
                particle.draw()
            })
        } // END of render method


        resize(width, height) {
            this.canvasWidth = width
            this.canvasHeight = height
            this.textX = this.canvasWidth / 2
            this.textY = this.canvasHeight / 2
            this.maxTextWidth = this.canvasWidth * 0.8
        }

    } // End of Effect class

    const effect = new Effect(ctx, canvas.width, canvas.height)
    effect.wrapText('Let\'s learn javascript')
    effect.render()

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.render()
        requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        effect.resize(canvas.width, canvas.height)
        effect.wrapText('Let\'s learn javascript')
    })


}) // END of window load Listener