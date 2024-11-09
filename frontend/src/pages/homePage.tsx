import React, { useEffect ,useState } from 'react'

import { auth } from '../firebase/firebaseConfig';
import {getUserToDatabase} from '../firebase/auth';
import { onAuthStateChanged, User} from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { json } from 'body-parser';


function HomePage() {

    interface userData{
        email:string;
        firstName:string;
        lastName:string;
    }

    const [currentUser,setCurrentUser] = useState<User | null>(null);
    const [currentUserData , setCurrentUserData] = useState<userData | null >(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
        });
        return () => unsubscribe();
      }, [auth]);
    


      useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userData = await getUserToDatabase(currentUser.uid);
                if (userData) {
                    setCurrentUserData({
                        email: userData.email || "",
                        firstName: userData.firstName || "",
                        lastName: userData.lastName || ""
                    });
                } else {
                    setCurrentUserData(null);  
                    console.log("User data not found.");
                }
            }
        };

        if (currentUser) {
            fetchUserData();
        }
    }, [currentUser]); 


  return (
    <div>
    {currentUser ? (
      <div>
        <h2>Hoş Geldiniz,{currentUserData?.firstName} </h2>
        <button onClick={() => {auth.signOut(); window.location.href="/login"}}>Çıkış Yap</button>
      </div>
    ) : (
      <h1></h1>
    )}
  </div>
  )
}

export default HomePage
