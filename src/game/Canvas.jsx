import {useEffect, useRef, useState, useCallback} from 'react'

function Canvas() {
    let SIZE_OF_TILE = 32
    // let TILESET_IMAGES = []
    // let IMAGES = [{src:''}]
    // let WIDTH = 0
    // let HEIGHT = 0
    const canvasRef = useRef(null)
    const [uploadedImg, setUploadedImg] = useState(null)
    const [tokenImgUrl, setTokenImgUrl] = useState(null)
    const [tokenPos, setTokenPos] = useState({x: 0, y: 0})

    const [collisionMatrix, setCollisionMatrix] =  useState(Array.from({length: 24}, () => Array.from({length: 24}, () => 0)))

    const updateCollisionMatrix = (x, y, value) => {
        setCollisionMatrix(prevMatrix => {
            const newMatrix = prevMatrix.map(row => [...row])
            newMatrix[y][x] = value
            return newMatrix
        })
    }

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

    const drawBackgroundImg = useCallback(() => {
        if(uploadedImg && canvasRef.current) {
            const img = new Image()
            img.src = uploadedImg
            img.onload = () => {
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                const scaleX = canvasRef.current.width / img.width;
                const scaleY = canvasRef.current.height / img.height;
                const scale = Math.min(scaleX, scaleY);
                const offsetX = (canvasRef.current.width - (img.width * scale)) / 2;
                const offsetY = (canvasRef.current.height - (img.height * scale)) / 2;
                ctx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);
                drawGrid(canvasRef.current.width, canvasRef.current.height, ctx);
            }
            img.onerror = () => {
                console.error("error on img load");
            };
        }
    },[uploadedImg]);

    const redrawCanvas = useCallback => {
        //Temp removed tokenX and tokenY
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            drawBackgroundImg(ctx)
            drawGrid(canvasRef.current.width, canvasRef.current.height, ctx)
            console.log(collisionMatrix)
        }
    };

    useEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            drawGrid(768, 768, ctx)
        }
    }, [drawBackgroundImg])

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newX = tokenPos.x
            let newY = tokenPos.y
            switch(e.key){
                case "ArrowUp": newY -= SIZE_OF_TILE; break;
                case "ArrowDown": newY += SIZE_OF_TILE; break;
                case "ArrowLeft": newX -= SIZE_OF_TILE; break;
                case "ArrowRight": newX += SIZE_OF_TILE; break;
                default: return;
            }
            newX = Math.max(0, Math.min(newX, canvasRef.current.width - SIZE_OF_TILE))
            newY = Math.max(0, Math.min(newY, canvasRef.current.height - SIZE_OF_TILE))
            if(collisionMatrix[newY / SIZE_OF_TILE][newX / SIZE_OF_TILE] === 0) {
                setTokenPos({x: newX, y: newY})
                redrawCanvas(newX, newY)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [tokenPos, SIZE_OF_TILE, collisionMatrix, redrawCanvas])

    useEffect(() => {
        if(canvasRef.current && tokenImgUrl){
            const ctx = canvasRef.current.getContext('2d')
            drawBackgroundImg(ctx)
            drawGrid(canvasRef.current.width, canvasRef.current.height, ctx)

        }
        if(canvasRef.current && tokenImgUrl){
            const img = new Image()
            img.src = tokenImgUrl
            img.onload = () => {
                const scale = SIZE_OF_TILE / Math.max(img.width, img.height)
                const new_w = img.width * scale
                const new_h = img.height * scale
                const ctx = canvasRef.current.getContext('2d')
                ctx.clearRect(tokenPos.x, tokenPos.y, SIZE_OF_TILE, SIZE_OF_TILE);
                ctx.drawImage(img, tokenPos.x, tokenPos.y, new_w, new_h)
                console.log('tokenPos X: %d, tokenPos Y: %d', tokenPos.x, tokenPos.y)
            }
        }
    }, [uploadedImg, tokenImgUrl, tokenPos, SIZE_OF_TILE, drawBackgroundImg])

    const handleFileChange = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            console.log("called filechange")
            if(canvasRef.current) {
                const img = new Image()
                img.src = reader.result
                setUploadedImg(reader.result)
                img.onload = () => {
                    const ctx = canvasRef.current.getContext('2d')
                    const scaleX = canvasRef.current.width / img.width
                    const scaleY = canvasRef.current.height / img.height
                    const scale = Math.min(scaleX, scaleY)
                    const offsetX = (canvasRef.current.width - (img.width * scale)) / 2;
                    const offsetY = (canvasRef.current.height - (img.height * scale)) / 2;
                    ctx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);
                    drawGrid(canvasRef.current.width, canvasRef.current.height, ctx)
                }
                img.onerror = () => {
                    console.error("error on img load")
                }
            }
        }
        reader.onerror = (error) => {
            console.error("error reading file: ", error)
        }
    }

    const handleTokenChange = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setTokenImgUrl(reader.result)
        }
        reader.onerror = (error) => {
            console.error("Error loading token img: ", error)
        }
    }
    
    const onClickRect = (e) => {
        if(!canvasRef.current) return;
       
        const rect = canvasRef.current.getBoundingClientRect()
        const tx = Math.floor((e.clientX - rect.left) / SIZE_OF_TILE);
        const ty = Math.floor((e.clientY - rect.top) / SIZE_OF_TILE);
        updateCollisionMatrix(tx, ty, 1)
    }
    
    return (
        <div>
            <label for="backgroundChange">Input background</label>
            <input type="file" onChange={handleFileChange} accept='image/*' id="backgroundChange"></input>
            <label for="tokenChange">Input token img file</label>
            <input type="file" onChange={handleTokenChange} accept='image/*' id="tokenChange"></input>
            <canvas ref={canvasRef} width={768} height={768} onClick={onClickRect}/>
        </div>
        
    )
}

export default Canvas
