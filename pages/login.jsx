import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import buttonStyles from '/styles/button.module.css';
import Link from 'next/link';

const login = () => {
    const {data: session} = useSession()
    //console.log(session);

    if(session){
        return (
            <div>
                <section style={{display:"flex",justifyContent:"center"}}>
                    <p> Welcome, {session.user.name} </p>
               </section>
               <section style={{display:"flex",justifyContent:"center"}}>
                    <button className={buttonStyles.buttonbox2} onClick={() => signOut()}>Sign Out</button>
                    <Link href="/">
                <button className={buttonStyles.buttonbox}> Back to main page </button>
                </Link> 
                </section>

            </div>

        )
    } else {
        return (
            <div>
                <section style={{display:"flex",justifyContent:"center"}}>
               <p>You are not signed in!</p>

               </section>
               <section style={{display:"flex",justifyContent:"center"}}>
               <button className={buttonStyles.buttonbox2} onClick={() => signIn()}>Sign In</button>
               <Link href="/">
                <button className={buttonStyles.buttonbox}> Back to main page </button>
                </Link> 
                </section>

            </div>
        )
    }


    
}

export default login