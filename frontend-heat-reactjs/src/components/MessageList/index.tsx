import style from './styles.module.scss'
import LogoImg from '../../assets/logo.png'
import { api } from '../../service/api'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

interface MessageProps {
    created_at: string;
    text: string;
    id: string;
    user: {
        avatar_url: string;
        name: string;
    };
}

const socket = io("https://app-backend-dowhile.herokuapp.com/")

const newListMessage: MessageProps[] = []

socket.on("new_message", message => {
    newListMessage.push(message)
})

export const MessageList = () => {
    const [ message, setMessage ] = useState<MessageProps[]>([])

    useEffect(() => {
        const timer = setInterval(() => {
            if(newListMessage.length > 0) {
                setMessage(message => [
                    newListMessage[0],
                    message[0],
                    message[1]
                ])

                newListMessage.shift()
            }
        }, 3000)
    }, [])

    useEffect(() => {
        api.get<MessageProps[]>('message/getThreeMessage').then(response => {
            setMessage(response.data)
        })
    }, [])

    return (
        <div className={style.messageListContainer}>
            <img src={LogoImg} alt="Logo do DoWhile2021" />
            <ul className={style.messageList}>
                {message.map(({ text, user, id }) => (
                <li key={id}>
                    <p>{text}</p>
                    <div className={style.user}>
                        <div>
                            <img src={user.avatar_url} alt="Usuário" />
                        </div>
                        <span>{user.name}</span>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}