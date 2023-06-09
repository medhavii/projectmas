import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import authContext from './context/authContext'
const PrivateRoutes = () => {
  const { login } = useContext(authContext)
  let auth = {'token':login}
  console.log(auth)
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;