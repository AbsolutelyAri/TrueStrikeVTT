import { useEffect, useRef, useState, useCallback } from 'react'
import Modal from './Modal'
import styles from './canvas.module.css'
import {db} from './firebase'
import { get, ref, child, set, update, remove, getDatabase } from "firebase/database";

function Canvas({ selectedTile }) {
    let SIZE_OF_TILE = 32
    let TILESET_IMAGE = `${process.env.PUBLIC_URL}/AITileset.jpg`
    const [drawnTiles, setDrawnTiles] = useState([])
    const canvasRef = useRef(null)
    const [uploadedImg, setUploadedImg] = useState(null)
    const [tokenImgUrl, setTokenImgUrl] = useState(null)
    const [tokenPos, setTokenPos] = useState({ x: 0, y: 0, oldX: 0, oldY: 0 })
    const [canvasDims, setCanvasDims] = useState({ width: 64, height: 64 })
    const [isModalOpen, setModalOpen] = useState(false)
    const [collisionMatrix, setCollisionMatrix] = useState(Array.from({ length: 24 }, () => Array.from({ length: 24 }, () => 0)))
    const [GameName, setGameName] = useState('');

    useEffect(() => {
        setModalOpen(true)
    }, [])

    const drawGrid = useCallback((w, h, ctx, step = 32, color = 'rgba(0,255,217,1)') => {
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let x = 0; x < w + 1; x += step) {
            ctx.moveTo(x, 0.5)
            ctx.lineTo(x, h + 0.5)
        }
        ctx.stroke();
        ctx.beginPath()
        for (let y = 0; y < h + 1; y += step) {
            ctx.moveTo(0, y + 0.5)
            ctx.lineTo(w, y + 0.5)
        }
        ctx.stroke();
    }, [])

    /* Background image file is updated here. uploadedImg is a data URL representing the image */
    const drawBackgroundImg = useCallback(() => {
        if (uploadedImg && canvasRef.current) {
            const img = new Image();
            img.src = uploadedImg;
            img.onload = () => {
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, canvasDims.width, canvasDims.height);
                const scaleX = canvasRef.current.width / img.width;
                const scaleY = canvasRef.current.height / img.height;
                const scale = Math.min(scaleX, scaleY);
                const offsetX = (canvasRef.current.width - (img.width * scale)) / 2;
                const offsetY = (canvasRef.current.height - (img.height * scale)) / 2;
                ctx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);
                drawGrid(canvasDims.width, canvasDims.height, ctx);
            };
            img.onerror = () => {
                console.error("error on img load");
            };
        }
    }, [uploadedImg, canvasDims, drawGrid]);

    /* Tile coordinates are updated here, (sx, sy) is the source coordinate
       from the tilemap. (dx, dy) is the destination coordinate
       which is where the tile is drawn on the canvas. Additionally
       the token image is updated here, tokenImgUrl is a data URL string */
    const drawToken = useCallback(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, canvasDims.width, canvasDims.height)
        const tileImg = new Image()
        tileImg.src = TILESET_IMAGE
        tileImg.onload = () => {
            drawnTiles.forEach(({ sx, sy, dx, dy }) => {
                console.log(sx, sy, dx, dy)
                ctx.drawImage(tileImg, sx * SIZE_OF_TILE, sy * SIZE_OF_TILE, SIZE_OF_TILE, SIZE_OF_TILE, dx * SIZE_OF_TILE, dy * SIZE_OF_TILE, SIZE_OF_TILE, SIZE_OF_TILE)
            })
        }
        const img = new Image()
        img.src = tokenImgUrl
        img.onload = () => {
            const scale = SIZE_OF_TILE / Math.max(img.width, img.height)
            const new_w = img.width * scale
            const new_h = img.height * scale
            console.log('tokenPos X: %d, tokenPos Y: %d', tokenPos.x, tokenPos.y)
            ctx.drawImage(img, tokenPos.x, tokenPos.y, new_w, new_h)
            drawGrid(canvasDims.width, canvasDims.height, ctx)

        }
    }, [SIZE_OF_TILE, tokenImgUrl, tokenPos, canvasDims, drawGrid, TILESET_IMAGE, drawnTiles])

    const draw = useCallback(() => {
        if (canvasRef.current && !uploadedImg && !tokenImgUrl) {
            const ctx = canvasRef.current.getContext('2d')
            drawGrid(canvasDims.width, canvasDims.height, ctx)
        }
        if (canvasRef.current && uploadedImg && !tokenImgUrl) {
            drawBackgroundImg()
        }
        if (canvasRef.current && tokenImgUrl && !uploadedImg) {
            drawToken()
        }
        if (uploadedImg && tokenImgUrl && canvasRef.current) {
            const img = new Image();
            img.src = uploadedImg;
            img.onload = () => {
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, canvasDims.width, canvasDims.height);
                const scaleX = canvasRef.current.width / img.width;
                const scaleY = canvasRef.current.height / img.height;
                const scale = Math.min(scaleX, scaleY);
                const offsetX = (canvasRef.current.width - (img.width * scale)) / 2;
                const offsetY = (canvasRef.current.height - (img.height * scale)) / 2;
                ctx.drawImage(img, offsetX, offsetY, img.width * scale, img.height * scale);
                drawGrid(canvasDims.width, canvasDims.height, ctx);
                drawToken();
            };
            img.onerror = () => {
                console.error("error on img load");
            };
        }
    }, [uploadedImg, canvasDims, drawGrid, tokenImgUrl, drawToken, drawBackgroundImg]);

    /* Collision Matrix updates here */
    const updateCollisionMatrix = (x, y) => {
        setCollisionMatrix(prevMatrix => {
            const newMatrix = prevMatrix.map(row => [...row])
            newMatrix[y][x] = newMatrix[y][x] ^ 1
            console.log(newMatrix)
            return newMatrix
        })

    }

    /* Token position updates here */
    useEffect(() => {
        const handleKeyDown = (e) => {
            let newX = tokenPos.x
            let newY = tokenPos.y
            let oldX = tokenPos.x
            let oldY = tokenPos.y
            switch (e.key) {
                case "ArrowUp": newY -= SIZE_OF_TILE; break;
                case "ArrowDown": newY += SIZE_OF_TILE; break;
                case "ArrowLeft": newX -= SIZE_OF_TILE; break;
                case "ArrowRight": newX += SIZE_OF_TILE; break;
                default: return;
            }
            newX = Math.max(0, Math.min(newX, canvasRef.current.width - SIZE_OF_TILE))
            newY = Math.max(0, Math.min(newY, canvasRef.current.height - SIZE_OF_TILE))
            if (collisionMatrix[newY / SIZE_OF_TILE][newX / SIZE_OF_TILE] === 0) {
                setTokenPos({ x: newX, y: newY, oldX: oldX, oldY: oldY })
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [tokenPos, SIZE_OF_TILE, collisionMatrix])


    const handleFileChange = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            console.log("called filechange")
            setUploadedImg(reader.result)
        }
        reader.onerror = (error) => {
            console.error("error reading file: ", error)
        }
    }

    const handleTokenChange = (e) => {
        console.log("handle token change")
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

    const addTile = (tile) => {
        setDrawnTiles(tiles => [...tiles, tile])
    }

    const onClickRect = (e) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect()
        const tx = Math.floor((e.clientX - rect.left) / SIZE_OF_TILE);
        const ty = Math.floor((e.clientY - rect.top) / SIZE_OF_TILE);
        const img = new Image()
        const sy = selectedTile.x
        const sx = selectedTile.y
        img.src = TILESET_IMAGE
        img.onload = () => {
            const ctx = canvasRef.current.getContext('2d')
            const tile = {
                sx: sx,
                sy: sy,
                dx: tx,
                dy: ty,
            }
            addTile(tile)
            ctx.drawImage(img, selectedTile.x * SIZE_OF_TILE, selectedTile.y * SIZE_OF_TILE, SIZE_OF_TILE, SIZE_OF_TILE, tx * SIZE_OF_TILE, ty * SIZE_OF_TILE, SIZE_OF_TILE, SIZE_OF_TILE)
        }
        updateCollisionMatrix(tx, ty)
    }

    const openModal = () => setModalOpen(!isModalOpen)
    const closeModal = () => setModalOpen(false)

    const saveDims = (width, height) => {
        if (!canvasRef.current) return;
        setCanvasDims({ width, height })
        console.log(width, height)
    }

    useEffect(() => {
        draw()
    }, [draw])



    const AddData = () => {
        if (!GameName) {
            alert("Please provide a game name");
            return;
        }
        
        // Construct the path to the data location in the database
        const dataPath = 'Campaigns/' + GameName;
        
        // Add the data to the database at the specified location
        const tileData = drawnTiles.map(({ sx, sy, dx, dy, hasWall = false }) => ({
            sx,
            sy,
            dx,
            dy,
            hasWall,
            image: hasWall ? TILESET_IMAGE : null, // Store TILESET_IMAGE if collisions are enabled
        }));
        
        set(ref(db, dataPath), {
            token: { xcoord: tokenPos.x, ycoord: tokenPos.y, image: tokenImgUrl },
            grid: collisionMatrix,
            backgroundImage: uploadedImg,
            canvasDims: canvasDims,
            tiles: tileData, // Store tile data with wall/collision box information
        })
        .then(() => {
            alert("Data added successfully");
        })
        .catch((error) => {
            alert("Error adding data: " + error.message);
        });
    }

    const RetData = () => {
        if (!GameName) {
            alert("Please provide a game name");
            return;
        }
    
        // Construct the path to the data location in the database
        const dataPath = 'Campaigns/' + GameName;
    
        // Get the data from the database at the specified location
        const dataRef = ref(db, dataPath);
        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Update state with retrieved data
                    if (data.token) {
                        setTokenPos({ x: data.token.xcoord, y: data.token.ycoord });
                        setTokenImgUrl(data.token.image);
                    }
                    if (data.grid) {
                        setCollisionMatrix(data.grid);
                    }
                    if (data.backgroundImage) {
                        setUploadedImg(data.backgroundImage);
                    }
                    if (data.canvasDims) {
                        setCanvasDims(data.canvasDims);
                    }
                    if (data.tiles) {
                        // Restore drawnTiles state with wall/collision box information
                        const restoredTiles = data.tiles.map(({ sx, sy, dx, dy, hasWall, image }) => ({
                            sx,
                            sy,
                            dx,
                            dy,
                            hasWall,
                            image,
                        }));
                        setDrawnTiles(restoredTiles);
                    }
                } else {
                    // If the campaign does not exist, show an alert
                    alert("Campaign does not exist");
                }
            })
            .catch((error) => {
                // Handle errors while retrieving data
                alert("Error retrieving data: " + error.message);
            });
    };

    const UpdateData = () => {
        if (!GameName) {
            alert("Please provide a game name");
            return;
        }
    
        // Construct the path to the data location in the database
        const dataPath = 'Campaigns/' + GameName;
    
        // Prepare the tile data with wall/collision box information
        const tileData = drawnTiles.map(({ sx, sy, dx, dy, hasWall = false }) => ({
            sx,
            sy,
            dx,
            dy,
            hasWall,
            image: hasWall ? TILESET_IMAGE : null, // Store TILESET_IMAGE if collisions are enabled
        }));
    
        // Prepare the data to be updated in the database
        const updateData = {
            token: { xcoord: tokenPos.x, ycoord: tokenPos.y, image: tokenImgUrl },
            grid: collisionMatrix,
            canvasDims: canvasDims,
            tiles: tileData, // Store tile data with wall/collision box information
        };
    
        // Include backgroundImage if uploadedImg is defined
        if (uploadedImg !== undefined && uploadedImg !== null) {
            updateData.backgroundImage = uploadedImg;
        }
    
        // Update the data in the database at the specified location
        update(ref(db, dataPath), updateData)
        .then(() => {
            alert("Data updated successfully");
        })
        .catch((error) => {
            alert("Unsuccessful");
            console.log(error);
        });
    };

    const DeleteData = (GameName) => {
        if (!GameName) {
            alert("Please provide a valid game name");
            return;
        }
    
        // Construct the path to the data location in the database
        const dataPath = 'Campaigns/' + GameName;
    
        // Remove the data from the database at the specified location
        remove(ref(db, dataPath))
            .then(() => {
                alert("Data deleted successfully");
            })
            .catch((error) => {
                alert("Unsuccessful");
                console.log(error);
            });
    };


    return (
        <div>
            <div className={styles.fileUploadContainer}>
                <button onClick={openModal} className={styles.button}>Set Canvas Size</button>
                <div className={styles.labelContainer}>
                    <label htmlFor="backgroundChange" className={styles.customFileUpload}>Upload Background</label>
                    <input type="file" onChange={handleFileChange} accept='image/*' id="backgroundChange" className={styles.hidden}></input>
                </div>
                <div className={styles.labelContainer}>
                    <label htmlFor="tokenChange" className={styles.customFileUpload}>Upload Token</label>
                    <input type="file" onChange={handleTokenChange} accept='image/*' id="tokenChange" className={styles.hidden}></input>
                </div>
            </div>
            <div className={styles.dbContainers}>
            <div>
                    <button onClick={AddData}>Add</button>
                </div>
                <div>
                    <button onClick={RetData}>Retrieve</button>
                </div>
                <div>
                    <button onClick={UpdateData}>Update</button>
                </div>
                <div>
                <button onClick={() => DeleteData(GameName)}>Delete</button>
                </div>
                <div>
                    <input type="text" id="GameName" value={GameName.toString()} onChange={(e) => setGameName(e.target.value)} placeholder="Campaign Name" />
                </div>
            </div>
            <div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSave={saveDims} />
            <canvas ref={canvasRef} width={canvasDims?.width} height={canvasDims?.height} onClick={onClickRect} />
        </div>

    )
}

export default Canvas;