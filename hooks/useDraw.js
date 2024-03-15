import { useRef } from 'react'
import { useEffect } from 'react'

export const useDraw = ({onDraw}) => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const handler = (e) => {
            const currPoint = computePointInCanvas(e)

            const ctx = canvasRef.current?.getContext('2d')

            if(!ctx || !currPoint) return;



        }
        const computePointInCanvas = (e) => {
            const canvas = canvasRef.current

            if(!canvas) return;

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            return {x, y}
        }

        canvasRef.current?.addEventListener('mousedown', handler)
        return () => canvasRef.current?.addEventListener('mousedown', handler)
    }, [])

    return {canvasRef}
}