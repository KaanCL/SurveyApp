import React from 'react'

import {auth ,db ,googleProvider,facebookProvider} from "./firebaseConfig";
import{createUserWithEmailAndPassword , signInWithPopup , signInWithEmailAndPassword } from 'firebase/auth';
import {setDoc,doc,getDoc, DocumentData} from "firebase/firestore";


export const doCreateUserWithEmailAndPassword = async (firstName:string,lastName:string,email:string,password:string) => {

    try{
        await createUserWithEmailAndPassword(auth,email,password);
        const user = auth.currentUser;
        if(user){
           await saveUserToDatabase(
                user.uid,
                firstName,
                lastName,
                email,
            );
            window.location.href="/";
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
           await saveUserToDatabase(
                user.uid,
                user.displayName?.split(" ")[0] || "",
                user.displayName?.split(" ")[1] || "",
                user.email || "",         
            );
            window.location.href="/";
        }
    
    }catch(e){

    }
}

export const doSıgnUpWithFacebook = async()=>{
    try{
        const result = await signInWithPopup(auth,facebookProvider)
        const user = result.user
        if(user){
          await  saveUserToDatabase(
                user.uid,
                user.displayName?.split(" ")[0] || "",
                user.displayName?.split(" ")[1] || "",
                user.email || "",         
            );
            window.location.href="/";
          
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

export const getUserToDatabase = async (userUid:string): Promise<DocumentData | null | undefined> => {

   try{
    console.log(userUid);
    const userDoc = await getDoc(doc(db,"Users",userUid));

    if(userDoc.exists()){
        const data:DocumentData = userDoc.data();
        console.log(data);
        return data;
    }else{
        return null;
       
    }

   }catch(e){
    return undefined;
    }

}

export const signInWithEmail=async(email:string,password:string)=>{

    try{
        const result = await signInWithEmailAndPassword(auth,email,password);
        const user =  result.user;
    
        if(user){
            window.location.href="/";
            return;
        }
      
    }
    catch(e){
        alert("Incorrect email or password, please try again.")
    }

}






