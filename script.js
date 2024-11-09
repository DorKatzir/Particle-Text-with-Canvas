window.addEventListener('load', function() {
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

    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'white'
    
    ctx.font = '80px helvetica'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const maxTextWidth = canvas.width * 0.8

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

        
        linesArray.forEach((line, i) => {
            ctx.fillText(line, canvas.width/2, canvas.height/2 + i * 70)
        })
        console.log(linesArray)
    }

    wrapText('Hello Dror and everyone else!')



})