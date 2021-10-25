import { FormEvent, useContext, useRef, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthProvider } from '../../contexts/auth'
import { api } from '../../service/api'
import styles from './styles.module.scss'

export const SendMessageForm = () => {
    const { user, SignOut } = useContext(AuthProvider)
    const [ message, setMessage ] = useState<string>('') 
    const elemenText = useRef<HTMLTextAreaElement | any>()

    const handleSendMessage = async (event: FormEvent) => {
        event.preventDefault()
        
        if(!message.trim()) {
            return;
        }

        await api.post('message', { message })
        
        setMessage('')
        elemenText.current.value = ""
    }

    return (
        <div className={styles.containerSendMessage}>
            <div className={styles.SendMessage}>
                <button onClick={SignOut} className={styles.signOut}>
                    <VscSignOut size="32" />
                </button>

                <header>
                    <div className={styles.headerImg}>
                        <img src={user?.avatar_url} alt="Avatar do Github" />
                    </div>
                    <h2>{user?.name}</h2>
                    <span>
                        <VscGithubInverted />
                        {user?.login}
                    </span>
                </header>

                <form onSubmit={handleSendMessage} className={styles.form}>
                    <label htmlFor="message">Mensagem</label>
                    <textarea name="message" id="message" rows={5} placeholder={"Qual sua expectativa para o evento?"} onChange={event => setMessage(event.target.value)} ref={elemenText} />
                    <button>
                        Enviar Mensagem
                    </button>
                </form>
            </div>
        </div>
    )
}