// React imports
import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
// img importadas
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

// importar css
import '../styles/auth.scss'
// import components
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'



export function NewRoom() {

    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            tittle: newRoom,
            authorId: user?.id,
        })
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }



    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="troca de mensagems" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua turma em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo do app" />
                    <h2>Criar uma nova sala</h2>
                    <form action="" onSubmit={handleCreateRoom}>
                        <input type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom} />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}