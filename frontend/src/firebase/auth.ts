import React from 'react'

import {auth ,db ,googleProvider,facebookProvider} from "./firebaseConfig";
import{createUserWithEmailAndPassword , signInWithPopup} from 'firebase/auth';
import {setDoc,doc} from "firebase/firestore";


export const doCreateUserWithEmailAndPassword = async (firstName:string,lastName:string,email:string,password:string) => {

    try{
        await createUserWithEmailAndPassword(auth,email,password);
        const user = auth.currentUser;
        if(user){
            saveUserToDatabase(
                user.uid,
                firstName,
                lastName,
                email,
            );
        }

    }catch(e){
        alert(e);
    }

};

export const doSıgnUpWithGoogle = async()=>{


    try{
        const result = await signInWithPopup(auth,googleProvider)
        const user = result.user
        if(user){
            saveUserToDatabase(
                user.uid,
                user.displayName?.split(" ")[0] || "",
                user.displayName?.split(" ")[1] || "",
                user.email || "",         
            );
        }
    
    }catch(e){

    }
}

export const doSıgnUpWithFacebook = async()=>{
    try{
        const result = await signInWithPopup(auth,facebookProvider)
        const user = result.user
        if(user){
            saveUserToDatabase(
                user.uid,
                user.displayName?.split(" ")[0] || "",
                user.displayName?.split(" ")[1] || "",
                user.email || "",         
            );
          
        }
    
    }catch(e){

    }

}


const saveUserToDatabase = async (userUid:string,firstName:string,lastName:string,email:string)=>{
    await setDoc(doc(db,"Users",userUid),{
                firstName:firstName,
                lastName:lastName,
                email:email,
                createdAt:new Date()
    })


}



