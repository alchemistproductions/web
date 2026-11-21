'use client'
import {useEffect,useRef} from 'react'
import Lenis from 'lenis'
import {motion,useScroll,useSpring} from 'framer-motion'
export default function Fx(){
 const {scrollYProgress:p}=useScroll(),sx=useSpring(p,{stiffness:120,damping:25}),cur=useRef<HTMLDivElement>(null)
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const l=new Lenis({lerp:.09,anchors:true} as any);let id=0;const f=(t:number)=>{l.raf(t);id=requestAnimationFrame(f)};id=requestAnimationFrame(f)
  return()=>{cancelAnimationFrame(id);l.destroy()}},[])
 useEffect(()=>{if(!matchMedia('(pointer:fine)').matches)return
  let x=0,y=0,cx=0,cy=0,id=0;const m=(e:MouseEvent)=>{x=e.clientX;y=e.clientY;cur.current?.classList.toggle('big',!!(e.target as HTMLElement).closest('a,button,input,textarea,select'))}
  addEventListener('mousemove',m);const f=()=>{cx+=(x-cx)*.18;cy+=(y-cy)*.18;if(cur.current){cur.current.style.opacity='1';cur.current.style.transform=`translate(${cx-16}px,${cy-16}px)`}id=requestAnimationFrame(f)};f()
  return()=>{removeEventListener('mousemove',m);cancelAnimationFrame(id)}},[])
 return <><motion.div aria-hidden style={{scaleX:sx}} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#ff4a2b] via-[#f4ff00] to-[#1e88ff]"/>
 <div ref={cur} aria-hidden style={{opacity:0}} className="cur pointer-events-none fixed left-0 top-0 z-[75] mix-blend-difference"><i/></div></>}
