'use client'
import Link from 'next/link'
import {useEffect,useRef,useState} from 'react'
import {AnimatePresence,motion,useScroll,useTransform} from 'framer-motion'
import {VOLUMES,ROLES,GENRES,slug,pad} from '@/lib/data'
import RoleArt,{THEME} from './RoleArt'
const ease:any=[.2,.7,.2,1]
const Rv=({children,d=0,className=''}:any)=><motion.div className={className} initial={{opacity:0,y:50,filter:'blur(8px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,margin:'-80px'}} transition={{duration:.9,delay:d,ease}}>{children}</motion.div>
const T=["We are a student production house based in Hyderabad, Telangana, dedicated to bringing ideas to life through films, photography, cinematography, and creative media production. We are a growing community of student creators, storytellers, and dreamers who believe in the power of visual storytelling.","As young creators, we see the world differently. We experiment, explore, learn, and push creative boundaries with every project we take on. From the first spark of an idea to the final frame, we work together to turn visions into visuals and moments into stories.","We believe that great stories don't need big budgets or experience. They need imagination, courage, and a team willing to create something extraordinary. That is why we are Alchemist Productions, born to create something unique."]

function Loader({done}:any){
 const [s,setS]=useState(true)
 useEffect(()=>{if(sessionStorage.getItem('l')){setS(false);done();return}sessionStorage.setItem('l','1');const t=setTimeout(()=>{setS(false);done()},2300);return()=>clearTimeout(t)},[])
 return(<AnimatePresence>{s&&<motion.div exit={{y:'-100%'}} transition={{duration:1,ease}} className="fixed inset-0 z-[80] grid place-items-center bg-[#0a0d12]"><div className="text-center">
  <motion.img src="/logo.png" alt="" initial={{scale:.3,rotate:-200,opacity:0}} animate={{scale:1,rotate:0,opacity:1}} transition={{duration:1.3,ease}} className="mx-auto h-28 w-28 rounded-full"/>
  <motion.p initial={{opacity:0,letterSpacing:'.6em'}} animate={{opacity:1,letterSpacing:'.15em'}} transition={{delay:.6,duration:1.3}} className="h mt-6 text-2xl">Alchemist Productions</motion.p></div></motion.div>}</AnimatePresence>)}

const POS=[[3,14,-8,1],[15,60,6,2],[30,5,4,3],[62,6,-5,2],[76,56,9,1],[86,16,-6,3],[47,68,-3,2],[1,40,5,3]]
function Fl({v,q,p}:any){const y=useTransform(p,[0,1],[0,-q[3]*150])
 return <motion.img src={`/v/${pad(v.n)}.jpg`} alt="" aria-hidden initial={{opacity:0,scale:.6}} animate={{opacity:.38,scale:1}} transition={{duration:1.4,delay:.2+q[3]*.2,ease}} style={{left:q[0]+'%',top:q[1]+'%',rotate:q[2],y}} className="absolute w-24 shadow-2xl md:w-40"/>}
const Line=({t,ready,d=0,cls}:any)=><span aria-hidden className={`flex justify-center overflow-hidden py-[.04em] ${cls}`}>{t.split('').map((c:string,i:number)=><motion.span key={i} className="inline-block" initial={{y:'115%'}} animate={ready?{y:0}:{}} transition={{duration:1,delay:d+i*.05,ease}}>{c===' '?'\u00a0':c}</motion.span>)}</span>
function Hero({ready}:any){
 const r=useRef(null),{scrollYProgress:p}=useScroll({target:r,offset:['start start','end start']})
 const sc=useTransform(p,[0,1],[1,.7]),op=useTransform(p,[0,.7],[1,0]),ty=useTransform(p,[0,1],[0,160])
 return(<section ref={r} className="relative h-[125vh]"><div className="sticky top-0 grid h-screen place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#1a1f2b_0%,#0a0d12_70%)]">
  <div className="beam"/><div className="beam" style={{animationDirection:'alternate-reverse',animationDelay:'-5s'}}/>
  {POS.map((q,i)=><Fl key={i} v={VOLUMES[i]} q={q} p={p}/>)}
  <motion.div style={{scale:sc,opacity:op,y:ty}} className="relative z-10 px-4 text-center">
   <motion.p initial={{opacity:0}} animate={ready?{opacity:1}:{}} transition={{delay:.2,duration:1.2}} className="mb-2 italic tracking-[.3em]">Welcome to a new era</motion.p>
   <h1 aria-label="ALCHEMIST PRODUCTIONS" className="h"><Line t="ALCHEMIST" ready={ready} cls="text-[17vw]"/><Line t="PRODUCTIONS" ready={ready} d={.5} cls="text-[8.2vw] text-white/85"/></h1>
   <motion.p initial={{opacity:0,y:20}} animate={ready?{opacity:1,y:0}:{}} transition={{delay:1.6,duration:1}} className="mt-6 text-lg md:text-2xl">Making cinema better than ever</motion.p>
   <motion.div initial={{opacity:0}} animate={ready?{opacity:1}:{}} transition={{delay:2.2}} className="mx-auto mt-10 h-14 w-px animate-pulse bg-white/60"/></motion.div></div></section>)}

const Strip=({items,rev}:any)=><div className="overflow-hidden border-y border-white/10 py-3"><div className={`mq h flex w-max text-3xl ${rev?'rev':''}`}>{[...items,...items].map((x:any,i:number)=><span key={i} className="mr-10" style={{color:x.c}}>{x.t}</span>)}</div></div>

function Reel(){
 const r=useRef<HTMLElement>(null),t=useRef<HTMLDivElement>(null),[d,setD]=useState(0)
 const {scrollYProgress:p}=useScroll({target:r,offset:['start start','end end']})
 useEffect(()=>{const f=()=>setD(Math.max(0,(t.current?.scrollWidth??0)-innerWidth));f();addEventListener('resize',f);return()=>removeEventListener('resize',f)},[])
 const x=useTransform(p,[0,1],[0,-d])
 return(<section id="volumes" ref={r} className="relative h-[450vh]"><div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
  <h2 className="h px-6 text-5xl md:text-7xl">Volumes</h2>
  <motion.div ref={t} style={{x}} className="mt-6 flex w-max gap-6 px-6">{VOLUMES.map(v=>
   <Link key={v.n} href={`/volumes/${v.n}`} className="group block w-[64vw] shrink-0 md:w-[22vw]"><div className="overflow-hidden transition duration-500 group-hover:-translate-y-3 group-hover:rotate-1" style={{boxShadow:`0 30px 80px -20px ${v.c}77`}}><img src={`/v/${pad(v.n)}.jpg`} alt={`ALCHEMIST PRODUCTIONS VOL. ${pad(v.n)} ${v.edition}`} className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-110"/></div>
    <p className="h mt-3 text-2xl" style={{color:v.c}}>VOL. {pad(v.n)}</p><p className="text-sm text-white/70">{v.edition}</p></Link>)}</motion.div>
  <div className="mx-6 mt-8 h-[3px] bg-white/15"><motion.div style={{scaleX:p}} className="h-full origin-left bg-white"/></div></div></section>)}

function W({w,p,a,b}:any){const o=useTransform(p,[a,b],[.15,1]);return <motion.span style={{opacity:o}}>{w} </motion.span>}
function Words({t}:{t:string}){const r=useRef(null),{scrollYProgress:p}=useScroll({target:r,offset:['start 0.9','end 0.55'] as any}),ws=t.split(' ')
 return <p ref={r}>{ws.map((w,i)=><W key={i} w={w} p={p} a={i/ws.length} b={(i+1)/ws.length}/>)}</p>}
function Who(){
 const r=useRef(null),{scrollYProgress:p}=useScroll({target:r,offset:['start end','end start']}),x=useTransform(p,[0,1],['10%','-60%'])
 return(<section id="who" ref={r} className="relative overflow-hidden px-5 py-32">
  <motion.div aria-hidden style={{x}} className="h pointer-events-none absolute left-0 top-10 whitespace-nowrap text-[26vw] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.12)]">ALCHEMIST PRODUCTIONS</motion.div>
  <div className="relative mx-auto max-w-3xl space-y-8 text-xl leading-relaxed md:text-2xl">
   <Rv><h2 className="h text-6xl md:text-8xl">WHO WE ARE</h2></Rv>{T.map((t,i)=><Words key={i} t={t}/>)}
   <Rv><p className="h text-4xl md:text-6xl">And this is just the beginning of our story.</p></Rv></div></section>)}

function Roles(){return(<section id="roles" className="px-5 py-24 md:px-8"><Rv><h2 className="h mb-8 text-5xl md:text-7xl">Roles &amp; Departments</h2></Rv>
 <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{ROLES.map((r,i)=>{const id=slug(r),[a,b]=THEME[id];return(
  <motion.div key={r} initial={{opacity:0,y:60,scale:.92}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,margin:'-60px'}} transition={{duration:.8,delay:(i%4)*.1,ease}}>
   <Link href={`/roles/${id}`} className="group relative block aspect-[4/5] overflow-hidden border border-white/10 transition duration-500 hover:-translate-y-2 hover:border-white/40" style={{background:`radial-gradient(120% 80% at 50% 0%,${a}44,transparent 65%),linear-gradient(170deg,${b}26,#0a0d12 75%)`}}>
    <div className="absolute left-1/2 top-[40%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl transition group-hover:opacity-80" style={{background:a}}/>
    <div className="absolute left-1/2 top-[40%] h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" style={{animation:'rot 30s linear infinite'}}/>
    <RoleArt id={id} className="absolute left-1/2 top-[40%] w-[56%] -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover:scale-110"/>
    <span className="h absolute inset-x-4 bottom-4 text-2xl md:text-3xl">{r}</span></Link></motion.div>)})}</div></section>)}

function Genres(){return(<section id="genres" className="px-5 py-24 md:px-8"><Rv><h2 className="h mb-8 text-5xl md:text-7xl">WHAT WE WORK WITH</h2></Rv>
 <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{GENRES.map((g,i)=>
  <motion.div key={g.name} initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.8,delay:(i%4)*.1,ease}}>
   <Link href={`/genres/${slug(g.name)}`} style={{'--c':g.c,background:`linear-gradient(135deg,${g.c}33,transparent 60%)`} as any} className="group relative flex aspect-[4/3] items-end overflow-hidden border-2 border-[color:var(--c)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_0_60px_-10px_var(--c)]">
    <span aria-hidden className="h absolute -right-3 -top-8 text-[10rem] text-transparent opacity-30 transition duration-500 group-hover:scale-110 group-hover:opacity-70 [-webkit-text-stroke:1px_var(--c)]">{g.name[0]}</span>
    <span className="h relative p-4 text-3xl text-[color:var(--c)]">{g.name}</span></Link></motion.div>)}</div></section>)}

function Team(){return(<section className="mx-auto max-w-4xl px-5 py-24"><Rv><h2 className="h text-5xl md:text-7xl">THE CORE TEAM</h2></Rv>
 {['Founding Director- Divyanka','Producer- Rishikesh','Head of Talent and Casting- Nathan'].map((t,i)=><Rv key={t} d={i*.1}><p className="border-b border-white/15 py-5 text-2xl transition hover:translate-x-4 hover:text-[#f4ff00] md:text-4xl">{t}</p></Rv>)}
 <Rv className="pt-20 text-center"><Link href="/join" className="h relative inline-block bg-[#f4ff00] px-8 py-4 text-3xl text-black md:text-5xl">We are open for hire, join us!<span aria-hidden className="absolute inset-0 animate-ping border-2 border-[#f4ff00]"/></Link></Rv>
 <Rv className="pt-16 text-center text-xl"><p>Follow our social media</p><p>Instagram: <a className="underline" href="https://www.instagram.com/alchemist__productions/" target="_blank" rel="noopener noreferrer">https://www.instagram.com/alchemist__productions/</a></p></Rv></section>)}

export default function Home(){
 const [ready,setReady]=useState(false)
 return(<main><Loader done={()=>setReady(true)}/><Hero ready={ready}/>
  <Strip items={VOLUMES.map(v=>({t:v.art,c:v.c}))}/><Reel/><Who/><Strip rev items={GENRES.map(g=>({t:g.name,c:g.c}))}/><Roles/><Genres/><Team/>
  <footer className="flex items-center justify-center gap-3 border-t border-white/10 px-5 py-10"><img src="/logo.png" alt="" className="h-10 w-10 rounded-full"/><p className="h text-xl">Alchemist Productions</p></footer></main>)}
