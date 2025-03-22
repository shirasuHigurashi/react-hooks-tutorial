import React,{ StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


const shincodeInfo = {
  name: 'shincode',
  age: 20,
}

const ShinCodeContext = React.createContext(shincodeInfo)
createRoot(document.getElementById('root')!).render(
  <ShinCodeContext.Provider value={shincodeInfo}>
    <StrictMode>
      <App />
    </StrictMode>,
  </ShinCodeContext.Provider>
)

export default ShinCodeContext
