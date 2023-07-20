//Variables
const canvas = document.querySelector('canvas'),
    toolBtns = document.querySelectorAll('.tool'),
    fillColor = document.querySelector('#fill-color')

let ctx = canvas.getContext('2d'),
   isDrawing = false,
   brushWidth = 5,
   selectedTool = 'brush',
   prevMouseX,
   prevMouseY,
   snapshot


// Set CANVAS width and height
window.addEventListener('load', ()=> { 
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

// Start drawing
const startDraw = e =>{
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(snapshot)
}
const drawRectangle = e => {
    if (!fillColor.checked){
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY) 
    }else{
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)  
    }
   
}


const drawing = e => {
    if (!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    switch(selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break
        case 'rectangle':
            drawRectangle(e)
            break
        default:
            break
    }
    
}

// Tools btn and set variable selected tool
toolBtns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id
        console.log(`selected tool ${selectedTool}`)
    })
})

//Stop drawing
const stopDraw = () =>{
    isDrawing = false
}
canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)
