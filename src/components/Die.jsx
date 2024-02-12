import {
  BiSolidDice1,
  BiSolidDice2,
  BiSolidDice3,
  BiSolidDice4,
  BiSolidDice5,
  BiSolidDice6,
} from 'react-icons/bi'

export default function Dice({ value, isFrozen, holdDie }) {
  const diceIcons = [
    BiSolidDice1,
    BiSolidDice2,
    BiSolidDice3,
    BiSolidDice4,
    BiSolidDice5,
    BiSolidDice6,
  ]
  const Icon = diceIcons[value - 1]
  const color = isFrozen ? 'green' : 'black'
  return <Icon color={color} size={72} onClick={holdDie} />
}
