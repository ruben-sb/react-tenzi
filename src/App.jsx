import { useEffect, useState } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(createNewDiceArray())
  const [gameFinished, setGameFinished] = useState(false)

  function createNewDiceArray() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie())
    }
    return diceArray
  }

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(1 + Math.random() * 6),
      isFrozen: false,
    }
  }

  function freezeDie(id) {
    setDice(prevState =>
      prevState.map(die =>
        die.id === id ? { ...die, isFrozen: !die.isFrozen } : die
      )
    )
  }

  function rollDice() {
    if (!gameFinished) {
      setDice(prevState =>
        prevState.map(die => (die.isFrozen ? die : generateNewDie()))
      )
    } else {
      setGameFinished(false)
      setDice(createNewDiceArray)
    }
  }

  const renderDiceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isFrozen={die.isFrozen}
      holdDie={() => freezeDie(die.id)}
    />
  ))

  useEffect(() => {
    const allHeld = dice.every(die => die.isFrozen)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)
    if (allHeld && sameValue) {
      setGameFinished(true)
    }
  }, [dice])

  return (
    <main className="bg-slate-800 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-200 flex flex-col gap-5 justify-center items-center rounded-3xl p-8 md:w-2/3 max-w-md shadow-xl shadow-black">
        {gameFinished && <Confetti />}
        <h1 className="text-2xl md:text-4xl mb-4">🎲</h1>
        <p className="text-center  md:text-lg mb-4 text-gray-800">
          El objetivo es tirar los dados hasta que todos sean iguales. Haz click
          sobre un dado para bloquearlo y que no cambie entre tiradas.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {renderDiceElements}
        </div>
        <button
          className="bg-blue-500 px-6 py-3 rounded text-white text-2xl mt-4 hover:bg-blue-700"
          onClick={rollDice}
        >
          {gameFinished ? 'Nueva partida' : 'Tira dados'}
        </button>
      </div>
    </main>
  )
}
