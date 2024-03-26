import React, {useState} from "react";
import styles from './canvas.module.css'

function Modal({isOpen, onClose, onSave}) {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const handleSave = () => {
        onSave(parseInt(width, 10) || 0, parseInt(height, 10) || 0)
        onClose()
    }

    if( !isOpen) {
        return null;
    }
    return (
        <div>
            <div className={styles.modalContainer}>
                <h2>Set Canvas Dimensions</h2>
                <p>
                    Tile size and canvas dimensions must be a multiple of 4 for the best results.
                </p>
                <input type='number' value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Width" />
                <input type='number' value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
                <div>
                    <button onClick={handleSave} className={styles.button} >Save</button>
                    <button onClick={onClose} className={styles.button}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default Modal