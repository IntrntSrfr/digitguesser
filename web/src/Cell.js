import React, {useState} from "react";

function Cell(props){

    const {field} = props

    let [tf, setTf] = useState(false)

    return(
        <div
            className={"field"}
            style={{backgroundColor: tf?'black':'#eee', border:'white solid 1px'}}
            onClick={()=>setTf(!tf)}
        >
            {}
        </div>
    )

}

export default Cell