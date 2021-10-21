import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../service/api'

type UserProps = {
    name: string;
    avatar_url: string;
    login: string;
    id: string;
    github_id?: number;
}

type AuthProviderProps = {
    user: UserProps | null;
    signGithubUrl: string;
    SignOut: () => void;
}

export const AuthProvider = createContext({} as AuthProviderProps)

interface ProviderAuthProps {
    children: ReactNode
}

interface AutheticateProps {
    data: {
        token: string;
        user: {
            avatar_url: string;
            name: string;
            login: string;
            id: string;
        }
    }
}


export const ProviderAuth = ({ children }: ProviderAuthProps) => {
    const [ user, setUser ] = useState<UserProps | null>(null)

    const signGithubUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=c27216c7064a0b895136`;

    const autheticate = async (code: string) => {
        const { data } = await api.post<AutheticateProps>('autheticate', {
            code: code
        })

        localStorage.setItem("dowile2020:token", data.data.token)

        api.defaults.headers.common.authorization = `Bearer ${data.data.token}`

        setUser(data.data.user)
    }
    
    const SignOut = () => {
        setUser(null)
        localStorage.removeItem("dowile2020:token")
    }

    useEffect(() => {
        const token = localStorage.getItem("dowile2020:token");

        if(token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<UserProps>('profile').then(response => {
                setUser(response.data)
            })
        }
    }, [])

    useEffect(() => {
        const url = window.location.href
        const hashGithubCode = url.includes('?code=')

        if(hashGithubCode) {
            const [ query, code] = url.split("?code=")

            window.history.pushState({}, '', query);
            autheticate(code)
        }
    }, [])

    return (
        <AuthProvider.Provider value={{ user, signGithubUrl, SignOut  }}>
            {children}
        </AuthProvider.Provider>
    )
}
