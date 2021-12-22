import React, {useEffect, useRef, useState} from "react";

function App() {
    const [inp, setInp] = useState([])
    const [guesses, setGuesses] = useState([])
    const canvasRef = useRef(HTMLCanvasElement)

    const generateNums = () => {
        let lol =  Array.from({length:784}, () => Math.floor(Math.random()*256))
        setInp(lol)
    }

    const weed = () => {

        let canvas = canvasRef.current;
        canvas.width=28;
        canvas.height=28;
        //let ctx = canvas.getContext('2d');
        //ctx.fillRect(0, 0, canvas.width, canvas.height)

        //generateNums()
        /* 
        fetch("http://localhost:8080/api/guess", {
            method:"POST",
            mode:'cors',
            body:JSON.stringify(inp)
        })
        .then(res => res.json())
        .then(data => setGuesses(data))
         */
    }

    useEffect(()=>{
        weed()
        //generateNums()
    })
    
    return (
        <div className="App">
            <canvas ref={canvasRef} style={{width:"400px", imageRendering:"pixelated"}}></canvas>
        </div>
    );
}

export default App;
