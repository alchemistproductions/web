'use client'
import {useEffect,useState} from 'react'
import {motion} from 'framer-motion'
import {sb} from '@/lib/browser'
import {JOIN_ROLES,slug} from '@/lib/data'
const F:[string,string,string][]=[['full_name','Full Name','text'],['age','Age','number'],['grade','Grade / Qualification / Year','text'],['institution','School / College / Institution','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['city','City','text'],['role','Department / Role Applying For','select'],['experience','Previous Experience','area'],['skills','Skills','area'],['portfolio','Portfolio / Work Samples Link','url'],['intro','Short Introduction / Why do you want to join Alchemist Productions?','area']]
const L:any={full_name:100,grade:100,institution:150,phone:20,city:80,portfolio:300,skills:500,email:200}
const ease:any=[.2,.7,.2,1]
export default function Join(){
 const [st,setSt]=useState<'idle'|'busy'|'done'|'error'>('idle'),[v,setV]=useState<Record<string,string>>({}),[foc,setFoc]=useState('')
 useEffect(()=>{const n=JOIN_ROLES.find(x=>slug(x)===new URLSearchParams(location.search).get('role'));if(n)setV(x=>({...x,role:n}))},[])
 const pct=F.filter(([k])=>(v[k]??'').trim()).length/F.length
 async function submit(e:any){e.preventDefault();setSt('busy');const {error}=await sb().from('applications').insert({...v,age:+v.age});setSt(error?'error':'done')}
 return(<main className="px-4 pb-20 pt-24"><motion.div initial={{opacity:0,y:40,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.9,ease}} className="relative mx-auto max-w-2xl border border-white/15 bg-black/45 p-6 backdrop-blur-md md:p-9">
  <div className="absolute inset-x-0 top-0 h-1 bg-white/10"><motion.div className="h-full origin-left bg-gradient-to-r from-[#ff4a2b] via-[#f4ff00] to-[#19c3ff]" animate={{scaleX:pct}} transition={{type:'spring',stiffness:80,damping:18}}/></div>
  <motion.span aria-hidden className="absolute top-2 text-xl" animate={{left:`calc(${pct*100}% - ${pct*28}px)`}} transition={{type:'spring',stiffness:80,damping:18}}>🚀</motion.span>
  <h1 className="h shine text-5xl md:text-7xl">Join Alchemist Productions</h1>
  {st==='done'?<motion.div initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} className="py-12 text-center">
   <svg viewBox="0 0 100 100" className="mx-auto h-28 w-28"><motion.circle cx="50" cy="50" r="44" fill="none" stroke="#f4ff00" strokeWidth="4" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.9}}/><motion.path d="M30 52l14 14 27-36" fill="none" stroke="#f4ff00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{delay:.7,duration:.5}}/></svg>
   <p role="status" className="h mt-6 text-4xl">Application received</p><p className="mt-2 text-white/70">We'll be in touch by email.</p>
   <motion.div aria-hidden initial={{y:0,opacity:1}} animate={{y:-700,x:140,opacity:0}} transition={{delay:1.2,duration:1.6,ease:'easeIn'}} className="mt-4 text-5xl">🚀</motion.div></motion.div>:
  <form onSubmit={submit} className="mt-8 grid gap-5">{F.map(([k,l,t],i)=>{const p:any={id:k,name:k,required:true,value:v[k]??'',onChange:(e:any)=>setV({...v,[k]:e.target.value}),onFocus:()=>setFoc(k),onBlur:()=>setFoc(''),className:'in'}
   return(<motion.div key={k} initial={{opacity:0,x:i%2?50:-50}} animate={{opacity:1,x:0}} transition={{delay:.3+i*.07,duration:.6,ease}} className="relative">
    <label htmlFor={k} className={`mb-1 block text-xs font-bold uppercase tracking-widest transition ${foc===k?'text-[#f4ff00]':'text-white/60'}`}>{l}</label>
    {t==='select'?<select {...p}><option value="" disabled>Select a department</option>{JOIN_ROLES.map(r=><option key={r}>{r}</option>)}</select>:t==='area'?<textarea {...p} rows={3} maxLength={1500}/>:<input {...p} type={t} maxLength={L[k]} min={t==='number'?5:undefined} max={t==='number'?100:undefined}/>}
    <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#f4ff00]" initial={false} animate={{scaleX:foc===k?1:0}} transition={{duration:.35}}/></motion.div>)})}
   <motion.button initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:1.2}} disabled={st==='busy'} className="cta justify-center disabled:opacity-60">{st==='busy'?'Launching…':'Apply now'}<i>→</i></motion.button>
   {st==='error'&&<p role="alert" className="text-red-400">Could not submit your application. Check every field and try again.</p>}</form>}</motion.div></main>)}
