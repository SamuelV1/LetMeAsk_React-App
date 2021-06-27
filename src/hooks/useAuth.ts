import { useContext } from 'react'

import { AuthContext } from '../context/Authcontext'

export function useAuth() {
    const value = useContext(AuthContext)

    return value
}