import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InboxScreen from './components/InboxScreen'
import { Provider } from 'react-redux'
import store from './lib/store'

function App() {

  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  )
}

export default App
