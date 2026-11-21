'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect,useState} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import {VOLUMES,pad} from '@/lib/data'
import {sb} from '@/lib/browser'
export default function Nav(){
 const [o,setO]=useState(false),[u,setU]=useState(false),p=usePathname()
 useEffect(()=>setO(false),[p])
 useEffect(()=>{sb().auth.getUser().then(({data})=>setU(!!data.user))},[p])
 return(<header className="fixed inset-x-0 top-0 z-50 bg-[#0a0d12]/80 backdrop-blur-md">
 <div className="flex items-center gap-2 px-3 py-2 sm:px-6">
  <Link href="/" className="flex items-center gap-2 sm:gap-3"><img src="/logo.png" alt="" width={44} height={44} className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11"/>
   <span className="h text-[15px] leading-[.95] sm:text-2xl">Alchemist<br className="sm:hidden"/> Productions</span></Link>
  <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
   <Link href="/login" className="h border border-white/50 px-3 py-1.5 text-sm transition hover:bg-white hover:text-black sm:text-lg">{u?'Account':'Sign in'}</Link>
   <Link href="/join" className="h bg-[#f4ff00] px-3 py-1.5 text-sm text-black transition hover:bg-white sm:text-lg">Join us</Link>
   <button aria-expanded={o} onClick={()=>setO(!o)} className="h px-1.5 text-sm sm:text-lg">{o?'Close':'Menu'}</button></div></div>
 <AnimatePresence>{o&&<motion.nav aria-label="Main" initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="max-h-[88vh] overflow-auto border-t border-white/10 bg-[#0a0d12] p-6">
  <div className="h mb-6 flex flex-wrap gap-x-8 gap-y-2 text-3xl">{[['/#who','Who we are'],['/#roles','Roles'],['/#genres','Genres'],['/join','Join us'],['/login','Account']].map(([x,t])=><Link key={x} href={x}>{t}</Link>)}</div>
  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{VOLUMES.map(v=><Link key={v.n} href={`/volumes/${v.n}`} style={{color:v.c}} className="h text-lg">VOL. {pad(v.n)} <span className="text-white/60">{v.art}</span></Link>)}</div></motion.nav>}</AnimatePresence></header>)}
