'use client'
import {useEffect,useState} from 'react'
import {sb} from '@/lib/browser'
export default function Verify(){
 const s=sb(),[email,setEmail]=useState(''),[code,setCode]=useState(''),[msg,setMsg]=useState(''),[busy,setBusy]=useState(false),[cp,setCp]=useState(false)
 useEffect(()=>{const q=new URLSearchParams(location.search);setEmail(q.get('email')??'');setCode((q.get('code')??'').replace(/\D/g,'').slice(0,6))},[])
 async function verify(e:any){e.preventDefault();setBusy(true);setMsg('')
  const {error}=await s.auth.verifyOtp({email,token:code,type:'signup'});setBusy(false)
  if(error)return setMsg('That code is invalid or has expired. Resend a new code below.');location.href='/'}
 async function resend(){if(!email)return setMsg('Enter your email first.');const {error}=await s.auth.resend({type:'signup',email});setMsg(error?error.message:'A new code is on its way.')}
 return(<main className="grid min-h-screen place-items-center px-5 pt-20"><div className="w-full max-w-md border border-white/15 bg-white/5 p-8 text-center">
  <img src="/logo.png" alt="" className="mx-auto h-20 w-20 rounded-full"/><h1 className="h mt-4 text-5xl">Verify your email</h1>
  <p className="mt-2 text-white/70">Enter the 6-digit code we sent{email&&<> to <b>{email}</b></>}.</p>
  <form onSubmit={verify} className="mt-6 space-y-3">
   {!email&&<input className="in" type="email" required placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} aria-label="Email address"/>}
   <input className="in text-center text-3xl tracking-[.4em]" inputMode="numeric" pattern="\d{6}" maxLength={6} required value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))} placeholder="000000" aria-label="6-digit code" autoComplete="one-time-code"/>
   <div className="flex gap-2"><button type="button" disabled={code.length<6} onClick={async()=>{await navigator.clipboard.writeText(code);setCp(true);setTimeout(()=>setCp(false),1800)}} className="h flex-1 border border-white/40 py-3 text-xl disabled:opacity-40">{cp?'Copied!':'Copy code'}</button>
    <button disabled={busy||code.length<6} className="h flex-1 bg-[#f4ff00] py-3 text-xl text-black disabled:opacity-40">{busy?'Verifying…':'Verify'}</button></div>
   {msg&&<p role="status" className="text-sm">{msg}</p>}</form>
  <button onClick={resend} className="mt-4 text-sm underline">Resend code</button></div></main>)}
