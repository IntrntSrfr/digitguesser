import React, { useEffect, useRef, useState } from 'react'

import Cell from './Cell'


const Display = (props) => {

    const {values} = props

    const [rows, setRows] = useState([])
    const canvasRef = useRef(null)

    /* 
    useEffect(() => {

        let newRows = []
        for(let i = 0; i< 28;i++){
            let row = []
            for(let j = 0; j< 28;j++){
                row.push(values[i*28+j])
            }

            newRows.push(row)
        }
        setRows(newRows)
    }, [values])
     */

    useEffect(()=>{

        // RGBA ORDER, 0-255 inclusive
        
        if(!canvasRef){return}

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const img = ctx.createImageData(28, 28)

        console.log(img);
        
        //console.log(ctx);
        

    }, [])
    
    return(
        <div className={"lol"}>

            <canvas ref={canvasRef}>

            </canvas>

        </div>
    )
}

export default Display

/* 

            {rows.map(row => (
                <div className={"row"}>
                    {row.map(v => (
                        <Cell val={v}/>
                    ))}
                </div>
            ))}

*/