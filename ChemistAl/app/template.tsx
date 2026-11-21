'use client'
import {motion} from 'framer-motion'
export default function T({children}:{children:React.ReactNode}){
 return <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.7,ease:[.2,.7,.2,1]}}>{children}</motion.div>}
