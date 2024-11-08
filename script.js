window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth // covers all window horizontaly
    canvas.height = window.innerHeight // covers all window vertically

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

    const text = 'Hello'
    // const textX = 150
    // const textY = 150
    const textX = canvas.width / 2 // horizontal center of the canvas
    const textY = canvas.height / 2 // vertical center of the canvas

    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'white'
    
    ctx.font = '80px helvetica'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, textX, textY)
    ctx.strokeText(text, textX, textY)
    console.log(ctx)
})