import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import authContext from './context/authContext'
const PrivateRoutes = () => {
  const obj = useContext(authContext)
  let auth = {'token':obj.login}
  console.log(auth)
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;