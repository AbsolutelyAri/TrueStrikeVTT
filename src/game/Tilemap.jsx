import React, { useRef, useEffect, useMemo } from "react";

function Tilemap({onSelectColor, onSelectLoc}) {
    const canvasRef = useRef(null)
    const colors = useMemo(['red', 'blue', 'green', 'yellow'],[])
    const SIZE_OF_TILE = 32

    useEffect(() => {
        if(canvasRef.current){
            const ctx = canvasRef.current.getContext('2d')
            colors.forEach((colors, index) => {
                ctx.fillStyle = colors;
                ctx.fillRect(index * SIZE_OF_TILE, 0, SIZE_OF_TILE, SIZE_OF_TILE)
            })
        }
    }, [colors])

    const onClickColor = (e) => { 
        if(!canvasRef.current) return;
        const rect = e.target.getBoundingClientRect()
        const tx = Math.floor((e.clientX - rect.left) / SIZE_OF_TILE)
        const ty = Math.floor(Math.max(e.clientY - rect.top, 0) / SIZE_OF_TILE)
        if(tx < colors.length){
            onSelectColor(colors[tx])
            onSelectLoc({tx, ty})
        }
    }


    return (
        <canvas ref={canvasRef} width={colors.length * SIZE_OF_TILE} height={SIZE_OF_TILE} onClick={onClickColor}/>
    )

}

export default Tilemap
