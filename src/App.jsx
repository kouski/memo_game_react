import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, seEmojisData] = useState([])

    console.log(emojisData);
    
    async function startGame(e) {
        e.preventDefault()
        try {
          const respuesta = await fetch('https://emojihub.yurace.pro/api/all/category/animals-and-nature');
          
          // Verificamos si la respuesta es exitosa
          if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`);
          }
      
          const datos = await respuesta.json();  // Convertimos la respuesta a JSON
          const dataSample = datos.slice(0,5)
          seEmojisData(dataSample)
          setIsGameOn(true);  
        } catch (error) {
          console.error('Ocurrió un error:', error);
        }
    }
    
    function turnCard() {
        console.log("Memory card clicked")
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
        </main>
    )
}
