import React from "react";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

const numState = atom({
    key: "numState",
    default: 0
})

const squareState = selector({
    key: "squareState",
    get: ({ get }) => {
        const number = get(numState)
        return number * number
    }
})

function Counter() {
    const [number, setNumber] = useRecoilState(numState)
    return <button onClick={() => setNumber(number + 1)}>{number}</button>
}

function Display() {
    const readOnlyNumber = useRecoilValue(numState)
    const readOnlySquare = useRecoilValue(squareState)
    return <span>{readOnlyNumber} squared = {readOnlySquare}</span>
}

const App = () => {
    return (
        <RecoilRoot>
            <div id="app">
                <h1> HOW MANY CLICKS?! <Display /> CLICKS!!!</h1>
                <Counter />
            </div>
        </RecoilRoot>
    )
}

export default App