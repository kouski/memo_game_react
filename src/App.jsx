import { useEffect, useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])

console.log(matchedCards);
    useEffect(()=>{
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
            setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
        }
    },[selectedCards])

    
    async function startGame(e) {
        e.preventDefault()
        try {
          const respuesta = await fetch('https://emojihub.yurace.pro/api/all/category/animals-and-nature');
          
          // Verificamos si la respuesta es exitosa
          if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`);
          }

          
      
          const datos = await respuesta.json();  // Convertimos la respuesta a JSON
          const dataSlice =  getDataSlice(datos)
          const emojisArray =  getEmojisArray(dataSlice)

          setEmojisData(emojisArray)
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

   function getEmojisArray(datos) {
    const pairedEmojisArray = [...datos, ...datos]
    
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = pairedEmojisArray[i]
        pairedEmojisArray[i] = pairedEmojisArray[j]
        pairedEmojisArray[j] = temp
    }
    
    return pairedEmojisArray
}

console.log(selectedCards);
    
function turnCard(name, index) {
    
    const selectedCardEntry = selectedCards.find(emoji=>emoji.index === index)
    
    if(!selectedCardEntry && selectedCards.length < 2){
        setSelectedCards(prevSelectedCards => [...prevSelectedCards, { name, index }])
    
    }else if (!selectedCardEntry && selectedCards.length === 2){
        setSelectedCards([{name,index}])
    }
}
    
    return (
        <main>
            <h1>Juego de Memoria</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
        </main>
    )
}
