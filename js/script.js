const canvas = document.querySelector('canvas'),
    toolBtns = document.querySelectorAll('.tool')

let ctx = canvas.getContext('2d'),
   isDrawing = false,
   brushWidth = 5,
   selectedTool = brush

window.addEventListener('load', ()=>{
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

const startDraw = ()=>{
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = brushWidth
}

const drawing = e => {
    if (!isDrawing) return
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}
toolBtns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id
        console.log(`selected tool ${selectedTool}`)
    })
})
const stopDraw = () =>{
    isDrawing = false
}
canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)
