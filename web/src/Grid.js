import React from 'react'
import Cell from './Cell'

function Grid(props){
    const {grid} = props

    return(
        <div className={"grid"}>
            {grid.rows.map(row => (
                <div className={"row"}>
                    {row.map(field=>(<Cell field={field}/>))}
                </div>
            ))}
        </div>
    )
}

export default Grid