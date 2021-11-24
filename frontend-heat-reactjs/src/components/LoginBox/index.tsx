import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc'
import style from './styles.module.scss'
import { AuthProvider } from '../../contexts/auth'


export const LoginBox = () => {
    const { signGithubUrl, user } = useContext(AuthProvider)
    
    return (
        <div className={style.loginBoxContainer}>
            <h4>Envie e compartilhe
            sua mensagem</h4>
            <a href={signGithubUrl}>
                <VscGithubInverted />
                entre com o github
            </a>
        </div>
    )
}