import React, { useRef, useEffect, useCallback} from "react";
import styles from './tilemap.module.css'

function Tilemap({setSelectedTile}) {
    const canvasRef = useRef(null)
    const imageRef = useRef(new Image())
    const tiles = useRef([])
    const SIZE_OF_TILE = 32

    const drawGrid = useCallback((w, h, ctx, step=32, color='rgba(0,255,217,1)') => {
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
    }, [])

    useEffect(() => {
        const img = imageRef.current
        img.src = `${process.env.PUBLIC_URL}/AITileset.jpg`
        img.onload = () => {
            const ctx = canvasRef.current.getContext('2d')
            ctx.drawImage(img, 0, 0)
            const {width, height} = img
            const numTilesX = width / SIZE_OF_TILE
            const numTilesY = height / SIZE_OF_TILE
            tiles.current = Array.from({length: numTilesY}, (_, y) => 
                Array.from({length: numTilesX}, (_, x) => ({
                    x: x * SIZE_OF_TILE,
                    y: y * SIZE_OF_TILE,
                }))
            ).flat()
            console.log(tiles)
            drawGrid(canvasRef.current.width, canvasRef.current.height, ctx)
        }
        
    }, [drawGrid])

    const onClickTile = (e) => { 
        if(!canvasRef.current) return;
        const rect = e.target.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const tx = Math.floor(x / SIZE_OF_TILE)
        const ty = Math.floor(y / SIZE_OF_TILE)
        setSelectedTile({x: tx, y: ty})
    }   


    return (
        <div className={styles.tilemapContainer}>
            <canvas ref={canvasRef} width={192} height={512} onClick={onClickTile}/>
        </div>
    )

}

export default Tilemap
