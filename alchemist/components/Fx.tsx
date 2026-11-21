'use client'
import {useEffect} from 'react'
import Lenis from 'lenis'
import {motion,useScroll,useSpring} from 'framer-motion'
export default function Fx(){
 const {scrollYProgress:p}=useScroll(),sx=useSpring(p,{stiffness:120,damping:25})
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const l=new Lenis({lerp:.09,anchors:true} as any);let id=0;const f=(t:number)=>{l.raf(t);id=requestAnimationFrame(f)};id=requestAnimationFrame(f)
  return()=>{cancelAnimationFrame(id);l.destroy()}},[])
 return <motion.div aria-hidden style={{scaleX:sx}} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#ff4a2b] via-[#f4ff00] to-[#1e88ff]"/>}
