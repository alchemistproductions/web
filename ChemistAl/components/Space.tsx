'use client'
import {useEffect,useRef} from 'react'
import {usePathname} from 'next/navigation'
import {VOLUMES,GENRES,slug} from '@/lib/data'
import {THEME} from './RoleArt'
export default function Space(){
 const p=usePathname(),cv=useRef<HTMLCanvasElement>(null),s=p.split('/')[2]
 const c=(p.startsWith('/volumes/')?VOLUMES.find(v=>v.n===+s)?.c:p.startsWith('/roles/')?THEME[s]?.[0]:p.startsWith('/genres/')?GENRES.find(g=>slug(g.name)===s)?.c:p==='/join'?'#b58cff':null)??'#7d93ff'
 const cfg=useRef({c,sp:.5});cfg.current={c,sp:p==='/join'?5:p==='/'?.9:.5}
 useEffect(()=>{
  const el=cv.current!,x=el.getContext('2d')!,still=matchMedia('(prefers-reduced-motion: reduce)').matches
  let w=0,h=0,id=0,sp=cfg.current.sp
  const mk=(z=Math.random())=>({x:Math.random()*2-1,y:Math.random()*2-1,z,t:Math.random()<.3}),st=Array.from({length:innerWidth<700?110:240},()=>mk())
  const rs=()=>{w=el.width=innerWidth;h=el.height=innerHeight};rs();addEventListener('resize',rs)
  const f=()=>{sp+=(cfg.current.sp-sp)*.05;x.clearRect(0,0,w,h);const v=.0015*sp+.0003
   for(const a of st){if(!still)a.z-=v;if(a.z<.02){Object.assign(a,mk(1))}
    const X=w/2+a.x/a.z*w*.3,Y=h/2+a.y/a.z*h*.3,z2=a.z+v*(2+sp*2.5),X2=w/2+a.x/z2*w*.3,Y2=h/2+a.y/z2*h*.3
    if(X<0||X>w||Y<0||Y>h){Object.assign(a,mk(1));continue}
    x.strokeStyle=a.t?cfg.current.c:'#fff';x.globalAlpha=Math.min(1,(1-a.z)*1.4+.15);x.lineWidth=(1-a.z)*2.2+.4;x.lineCap='round'
    x.beginPath();x.moveTo(X2,Y2);x.lineTo(X,Y);x.stroke()}
   x.globalAlpha=1;if(!still)id=requestAnimationFrame(f)}
  f();return()=>{cancelAnimationFrame(id);removeEventListener('resize',rs)}},[])
 return(<div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
  <div className="neb" style={{background:`radial-gradient(circle at 30% 30%,${c}38,transparent 55%)`}}/>
  <div className="neb n2" style={{background:'radial-gradient(circle at 70% 60%,#7c3aed38,transparent 55%)'}}/>
  <div className="neb n3" style={{background:'radial-gradient(circle at 50% 85%,#19c3ff26,transparent 50%)'}}/>
  <canvas ref={cv} className="absolute inset-0"/></div>)}
