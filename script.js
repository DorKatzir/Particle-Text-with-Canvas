window.addEventListener('load', function() {

    const textInput = document.getElementById('textInput')
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth // covers all window horizontaly
    canvas.height = window.innerHeight // covers all window vertically
    console.log(ctx)

    ctx.lineWidth = 3
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(canvas.width/2, 0)
    ctx.lineTo(canvas.width/2, canvas.height)
    ctx.stroke()

    ctx.strokeStyle = 'green'
    ctx.beginPath()
    ctx.moveTo(0, canvas.height/2)
    ctx.lineTo(canvas.width, canvas.height/2)
    ctx.stroke()

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)    
    gradient.addColorStop(0.3, 'red')
    gradient.addColorStop(0.5, 'fuchsia')
    gradient.addColorStop(0.7, 'purple')
    ctx.fillStyle = gradient
    ctx.strokeStyle = 'white'
    
    ctx.font = '80px Trebuchet MS'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const maxTextWidth = canvas.width * 0.8
    const lineHeight = 80

    function wrapText(text) {

        let linesArray = []
        let lineCounter = 0
        let line = ''
        let words = text.split(' ') // creates array of words from the text variable

        for (let i = 0; i < words.length; i++) {

            let testLine = line + words[i] + ' '

            if (ctx.measureText(testLine).width > maxTextWidth) {
                line = words[i] + ' '
                lineCounter++
            } else {
                line = testLine
            }

            linesArray[lineCounter] = line
        }

        let textHeight = lineHeight * lineCounter
        let textY = canvas.height/2 - textHeight/2
        
        linesArray.forEach((line, i) => {
            ctx.fillText(line, canvas.width/2, textY + lineHeight * i)
        })
        console.log(linesArray)
    }

    // wrapText('Hello Dror and everyone else! This is a test to see how this works. I hope it works!')

    textInput.addEventListener('keyup', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        wrapText(textInput.value)
    })

})