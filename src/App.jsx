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
          const dataSlice = getDataSlice(datos)
          console.log(getRandomIndices(datos));

          seEmojisData(dataSlice)
          setIsGameOn(true);  
        } catch (error) {
          console.error('Ocurrió un error:', error);
        }
    }

    function getDataSlice(datos) {
      const randomIndices = getRandomIndices(datos)
      
      const dataSlice = randomIndices.map(index => datos[index])
      
      return dataSlice
  }

    function getRandomIndices(datos) {
      const randomIndicesArray = []
      
      for (let i = 0; i < 5; i++) {
          const randomNum = Math.floor(Math.random() * datos.length)
          if (!randomIndicesArray.includes(randomNum)) {
              randomIndicesArray.push(randomNum)
          } else {
              i--
          }
      }
      
      return randomIndicesArray
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
