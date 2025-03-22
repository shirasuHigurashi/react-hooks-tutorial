import React from 'react'
import './App.css'
import ShinCodeContext from './main'
import useLocalStorage from './useLocalStorage'
const reducer = (state: number, action: { type: string }) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const App: React.FC = () => {
  const [count, setCount] = React.useState(0)
  const [count01, setCount01] = React.useState(0)
  const [count02, setCount02] = React.useState(0)
  const shincodeInfo = React.useContext(ShinCodeContext)
  const ref = React.useRef<HTMLInputElement>(null)
  const [state, dispatch] = React.useReducer(reducer, 0)

  const handleRef = () => {
    if (ref.current) {
      console.log(ref.current.value)
    }
  }

  const handleClick = () => {
    setCount(count + 1)
  }
// usememo ブラウザに値を保存し、重たい処理を回避する
  const square =React.useMemo( () => {
    let i = 0
    while (i < 2000) {
      i++
    }
    return count02 * count02
  },[count02])

  //useCallbackは関数のメモかを行う余計な処理を行わない
  
  const showCount =React.useCallback(() => {
    console.log('これは重い処理です')
  },[]
  )

  //カスタムフック
  const { value: age, setValue: setAge } = useLocalStorage("age", 20)
  React.useEffect(() => {
    console.log('useEffect')
  }, [count])

  return (
    <div>
      <h1>Usestate,UseEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
      <hr />

      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>
      <hr />

      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>UseRef</button>
      <hr />

      <h1>useReducer</h1>
      <p>カウント:{state}</p>
      <input type="text" ref={ref} />
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <hr />

      <h1>useMemo</h1>
      <div>カウント1{count01}</div>
      <div>カウント2{count02}</div>
      <div>結果:{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 1)}>+</button>


      <br />
      <h1>useCallback</h1>
      <SomeChild showCount ={showCount}/>
      <hr />
      <h1>
        カスタムフック
      </h1>
      <p>{age}</p>
      <button onClick={()=>setAge(80)}>年齢セット</button>
    </div>
  )
}

export default App

interface SomeChildProps {
  showCount: () => void
}

const SomeChild: React.FC<SomeChildProps> = ({ showCount }) => {
  React.useEffect(() => {
    showCount()
  }, [showCount])

  return (
    <div>
      Some Child Component
    </div>
  )
}

export { SomeChild }
