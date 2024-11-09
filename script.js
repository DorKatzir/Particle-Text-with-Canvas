window.addEventListener('load', function() {

    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth // covers all window horizontaly
    canvas.height = window.innerHeight // covers all window vertically
    console.log(ctx)
    
    class Particle {
        constructor() {

        }
        
        draw() {
            
        }
        
        update() {
            
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
        }

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

        }

        convertToParticles() {

        }

        render() {

        }

    } // End of Effect class

    const effect = new Effect(ctx, canvas.width, canvas.height)
    effect.wrapText('Hello dror what\'s on your mind today?')
    console.log(effect)

    function animate() {

    }



})