import {useEffect, useRef} from 'react'

function Canvas({currentColor}) {
    
    let SIZE_OF_TILE = 32
    let TILESET_IMAGES = []
    let IMAGES = [{src:''}]
    let WIDTH = 0
    let HEIGHT = 0
    const canvasRef = useRef(null)
    useEffect(() => {
        const drawGrid = (w, h, ctx, step = 32, color='rgba(0,255,217,0.5)') => {
            ctx.strokeStyle = color
            ctx.lineWidth = 1
            ctx.beginPath()
            for(let x = 0; x < w + 1; x += step){
                ctx.moveTo(x, 0.5)
                ctx.lineTo(x, h + 0.5)
            }
            ctx.stroke();
            ctx.beginPath()
            for(let y = 0; y < h + 1; y += step){
                ctx.moveTo(0, y + 0.5)
                ctx.lineTo(w, y + 0.5)
            }
            ctx.stroke();
        }
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            drawGrid(768, 768, ctx)
        }
    }, [])
    
    const onClickRect = (e) => {
        if(!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')

        ctx.fillStyle = currentColor
        const rect = e.target.getBoundingClientRect()
        const tx = Math.floor(Math.max(e.clientX - rect.left, 0) / SIZE_OF_TILE)
        const ty = Math.floor(Math.max(e.clientY - rect.top, 0) / SIZE_OF_TILE)

        ctx.fillRect(tx * SIZE_OF_TILE, ty * SIZE_OF_TILE, SIZE_OF_TILE, SIZE_OF_TILE)
        
    }
    
    


    return (

        <canvas ref={canvasRef} width={768} height={768} onClick={onClickRect}/>
        
    )
}

export default Canvas