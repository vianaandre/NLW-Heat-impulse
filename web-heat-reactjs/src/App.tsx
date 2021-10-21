import { useContext } from 'react'
import './styles/global.scss'
import style from './App.module.scss'
import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessageForm } from './components/SendMessageForm'
import { AuthProvider } from './contexts/auth'
import { BannerRight } from './components/BannerRight'

export function App() {
  const { user } = useContext(AuthProvider)

  return (
      <main className={!!user ? style.signed : ''} >
        <div  className={style.container}>
          <MessageList />
          { Boolean(user) ? <SendMessageForm /> : <LoginBox /> }
          <BannerRight /> 
        </div>
      </main>
  )
}
