import React, { useEffect, useState } from 'react'

import Cell from './Cell'


const Display = (props) => {

    const {values} = props

    const [rows, setRows] = useState([])
    
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
    
    return(
        <div className={"lol"}>

            {rows.map(row => (
                <div className={"row"}>
                    {row.map(v => (
                        <Cell val={v}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Display


/*
 {props.values.map(l => (
                <div>
                    {l}
                </div>
            
            ))} 
            */