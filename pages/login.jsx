import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import buttonStyles from '/styles/button.module.css';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Image from 'next/image'

const login = () => {
    const {data: session} = useSession()
    //console.log(session);

    if(session){
        return (
            <div>
                <Link href={"/"}>
                    <section style={{display:"flex",justifyContent:"center"}}>
                        <Image
                            priority
                            src="/images/logo.png"
                            className={utilStyles.borderCircle}
                            height={100}
                            width={200}
                            alt=""
                        />
                    </section>
                </Link>
                <section className={utilStyles.headingMd}>
                
                    <section style={{display:"flex",justifyContent:"center"}}>
                    
                        <p> Welcome, {session.user.name} </p> 
                    </section>

                    <section style={{display:"flex",justifyContent:"center"}}>
                        <p>This is the first Lab Project of the Integration of Cyber Physical Systems</p>
                    </section>

                
                    <section style={{display:"flex",justifyContent:"center"}}>
                        <button className={buttonStyles.buttonbox2} onClick={() => signOut()}>Sign Out</button>

                        <Link href="/">
                        <button className={buttonStyles.buttonbox}> Back to Home </button>
                        </Link> 

                        <Link href="/posts/first-post">
                        <button className={buttonStyles.buttonbox}> Charts </button>
                        </Link> 

                    </section>
                </section>



            </div>

        )
    } else {
        return (
            <div>
                <section className={utilStyles.headingMd}>
                    <section style={{display:"flex",justifyContent:"center"}}>
                        <p>You are not signed in!</p>

                    </section>
                    <section style={{display:"flex",justifyContent:"center"}}>
                        <button className={buttonStyles.buttonbox2} onClick={() => signIn()}>Sign In</button>
                        <Link href="/">
                        <button className={buttonStyles.buttonbox}> Back to Home </button>
                        </Link> 
                    </section>
                </section>

            </div>
        )
    }


    
}

export default login