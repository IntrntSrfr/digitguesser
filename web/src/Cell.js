import React from "react";

function Cell(props){

    const {val} = props

    return(
        <div className={"cell"} style={{backgroundColor:`rgb(${255-val},${255-val},${255-val})`,color:`rgb(${255-val},${255-val},${255-val})`}}>
            {val}
        </div>
    )

}

export default Cell