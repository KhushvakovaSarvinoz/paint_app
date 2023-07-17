//Global variable
const canvas = document.querySelector('canvas'),
    toolBtns = document.querySelectorAll('.tool')

//Variables

let ctx = canvas.getContext('2d'),
   isDrawing = false,
   brushWidth = 5,
   selectedTool = brush


// Set CANVAS width and height
window.addEventListener('load', ()=>{
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

// Start drawing
const startDraw = ()=>{
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = brushWidth
}

const drawing = e => {
    if (!isDrawing) return
    switch(selectedTool){
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break
        case 'rectangle':
            drawRectangle()
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
