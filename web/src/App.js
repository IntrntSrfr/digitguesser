import React, {useEffect, useState} from "react";

function App() {
    const [inp, setInp] = useState([])
    const [guesses, setGuesses] = useState([])

    const generateNums = () => {
        let lol =  Array.from({length:784}, () => Math.floor(Math.random()*256))
        setInp(lol)
    }

    const weed = () => {

        generateNums()
        
        fetch("http://localhost:8080/api/guess", {
            method:"POST",
            mode:'cors',
            body:JSON.stringify(inp)
        })
        .then(res => res.json())
        .then(data => setGuesses(data))
    }

    useEffect(()=>{
        generateNums()
    }, [])
    
    return (
        <div className="App">

            <button onClick={weed}>lol</button>

            {guesses.map(g => (
                <div className="guess">{g}</div>
            ))}


        </div>
    );
}

export default App;
