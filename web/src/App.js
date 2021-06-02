import React, {useRef, useState} from "react";
import Grid from "./Grid";


function App() {

    function lol(){
        const res = {rows: []}

        for(let i = 0;i<28;i++){
            const row = []
            for(let j = 0;j < 28;j++){
                row.push(i*28+j)
            }
            res.rows.push(row)
        }
        return res
    }

    let [grid, setGrid] = useState(lol())

    return (
        <div className="App">

            <Grid
                grid={grid}
            />



        </div>
    );
}

export default App;
