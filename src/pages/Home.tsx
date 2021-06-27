// imports do react

import { useHistory } from 'react-router-dom'
// img importadas
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

//imports de teste
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

// importar css
import '../styles/auth.scss'
// import components
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');


    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }


    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        if (roomCode.trim() === '') {
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            toast.error('Sala não existente')
            return;
        }

        if (roomRef.val().endendAt) {
            toast.error('Esta sala ja foi encerrada')
            return;
        }

        history.push(`/admin/rooms/${roomCode}`)
    }

    return (
        <div id='page-auth'>
            <ToastContainer />
            <aside>
                <img src={illustrationImg} alt="troca de mensagems" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua turma em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo do app" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIcon} alt="Simbolo do google" />
                    crie sua sala usando o Google
                </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text"
                            placeholder="digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode} />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}