import React from 'react'
import Typewriter from 'typewriter-effect'

type Props = {}

const TypewriterTitle = (props: Props) => {
    return (
        <Typewriter 
            options={{
                loop: true, // loop indefinitely
            }}
            onInit={(typewriter) => {
                typewriter
                .typeString("✅ Connecting Anonymous Users to Communities")
                .pauseFor(250).deleteAll()
                .typeString("✅ Powered by Simso Connect and Tableland")
                .pauseFor(250).deleteAll()
                .typeString("✅ Leveraging ZK Proofs for Ultimate Discretion")
                .pauseFor(250).deleteAll()
                .start();
            }}
        />
    )
    }

export default TypewriterTitle