import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../.firebase/firebase';

export const DataUser = createContext(null);

const UserDataProvider = ({children}) => {

    const [isLogged, setIsLogged] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setLoggedUser(user)
        } else {
          navigate('/login')
        }
      })
    }, [])



  return (
    <DataUser.Provider value={{isLogged, setIsLogged, loggedUser, setLoggedUser}}>
        {children}
    </DataUser.Provider>
  )
}

export default UserDataProvider