'use client'
import {useEffect,useState} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import {sb} from '@/lib/browser'
type M='in'|'up'|'otp'|'forgot'|'reset'|'me'
const HOLES='repeating-linear-gradient(180deg,#000 0 10px,#e8e2d0 10px 22px,#000 22px 32px)'
const Strip=({side}:{side:string})=><div className={`absolute inset-y-0 ${side}-0 w-9 bg-black`}><div className="mx-auto h-full w-4" style={{background:HOLES}}/></div>
export default function Login(){
 const s=sb(),[mode,setMode]=useState<M>('in'),[f,setF]=useState({email:'',password:'',name:''}),[msg,setMsg]=useState(''),[busy,setBusy]=useState(false),[user,setUser]=useState<any>(null)
 const [kind,setKind]=useState<'signup'|'email'>('signup'),[code,setCode]=useState(''),[dup,setDup]=useState(false),[cool,setCool]=useState(0)
 const set=(k:string)=>(e:any)=>setF({...f,[k]:e.target.value}),em=()=>f.email.trim().toLowerCase()
 useEffect(()=>{const q=new URLSearchParams(location.search)
  if(q.get('email')&&q.get('code')){setF(x=>({...x,email:q.get('email')!.replace(/ /g,'+')}));setCode((q.get('code')||'').replace(/\D/g,'').slice(0,6));setMode('otp');return}
  s.auth.getUser().then(async({data})=>{if(!data.user)return;setUser(data.user)
   const {data:p}=await s.from('profiles').select('display_name').eq('id',data.user.id).maybeSingle();setF(x=>({...x,name:p?.display_name??''}));setMode(q.get('reset')?'reset':'me')})},[])
 useEffect(()=>{if(cool>0){const t=setTimeout(()=>setCool(cool-1),1000);return()=>clearTimeout(t)}},[cool])
 useEffect(()=>{if(mode==='otp'&&code.length===6)verify()},[code])
 async function verify(){if(busy)return;setBusy(true);setMsg('')
  let r=await s.auth.verifyOtp({email:em(),token:code,type:kind});if(r.error)r=await s.auth.verifyOtp({email:em(),token:code,type:kind==='signup'?'email':'signup'})
  if(r.error){setBusy(false);setCode('');return setMsg(/rate|many/i.test(r.error.message)?'Too many attempts. Wait a minute and try again.':'Wrong or expired code. Tap Resend for a fresh one.')}
  location.href='/'}
 async function emailCode(){if(!em())return setMsg('Enter your email first.');setBusy(true)
  const {error}=await s.auth.signInWithOtp({email:em(),options:{shouldCreateUser:false}});setBusy(false)
  if(error)return setMsg(/not allowed|signups/i.test(error.message)?'No account with that email yet. Create one first.':error.message);setKind('email');setCode('');setMode('otp');setCool(30)}
 async function resend(){const {error}=kind==='signup'?await s.auth.resend({type:'signup',email:em()}):await s.auth.signInWithOtp({email:em(),options:{shouldCreateUser:false}});if(!error)setCool(30);setMsg(error?error.message:'New code sent.')}
 async function go(e:any){e.preventDefault();if(mode==='otp')return verify();setBusy(true);setMsg('');let r:any
  if(mode==='in'){r=await s.auth.signInWithPassword({email:em(),password:f.password})
   if(!r.error){location.href='/';return}
   if(/confirm/i.test(r.error.message)){await s.auth.resend({type:'signup',email:em()});setKind('signup');setCode('');setMode('otp');setCool(30);setBusy(false);return}
   if(/invalid/i.test(r.error.message))r.error.message='Wrong email or password.'}
  else if(mode==='up'){r=await s.auth.signUp({email:em(),password:f.password,options:{data:{display_name:f.name.trim()||'Member'}}})
   if(r.error&&/already|registered/i.test(r.error.message)){setDup(true);r=null}
   else if(!r.error&&r.data.session){location.href='/';return}
   else if(!r.error&&r.data.user?.identities?.length===0){setDup(true);r=null}
   else if(!r.error){setKind('signup');setCode('');setMode('otp');setCool(30)}}
  else if(mode==='forgot'){r=await s.auth.resetPasswordForEmail(em(),{redirectTo:`${location.origin}/auth/callback?next=${encodeURIComponent('/login?reset=1')}`});if(!r.error)setMsg('Reset link sent. Check your inbox.')}
  else if(mode==='reset'){r=await s.auth.updateUser({password:f.password});if(!r.error)setMsg('Password updated.')}
  else{r=await s.from('profiles').update({display_name:f.name.trim()}).eq('id',user.id);if(!r.error)setMsg('Profile saved.')}
  if(r?.error)setMsg(r.error.message);setBusy(false)}
 const T={in:'Welcome back',up:'Join the cast',otp:'Enter your code',forgot:'Reset password',reset:'New password',me:'Your profile'}[mode]
 const Y='border-[#f4ff00]'
 return(<main className="grid min-h-screen place-items-center px-4 pb-16 pt-24"><div className="w-full max-w-md border border-white/15 bg-black/45 p-7 backdrop-blur-md">
  <img src="/logo.png" alt="" className="float mx-auto h-16 w-16 rounded-full"/>
  {(mode==='in'||mode==='up')&&<div className="h mt-5 grid grid-cols-2 text-xl">{(['in','up'] as M[]).map(m=><button key={m} onClick={()=>{setMode(m);setMsg('')}} className={`border-b-2 py-2 transition ${mode===m?Y+' text-[#f4ff00]':'border-white/20 text-white/60'}`}>{m==='in'?'Sign in':'Create account'}</button>)}</div>}
  <AnimatePresence mode="wait"><motion.form key={mode} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.22}} onSubmit={go} className="mt-5 space-y-3">
   <h1 className="h text-4xl">{T}</h1>
   {mode==='otp'&&<><p className="text-white/70">We sent a 6-digit code to <b>{f.email}</b>. It verifies as soon as you finish typing.</p>
    <div className="relative"><div className="flex gap-2">{[0,1,2,3,4,5].map(i=><div key={i} className={`grid h-14 flex-1 place-items-center border bg-white/5 text-3xl transition ${code.length===i?Y:'border-white/25'}`}>{code[i]}</div>)}</div>
     <input autoFocus inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,'').slice(0,6))} aria-label="6-digit code" className="absolute inset-0 h-full w-full opacity-0"/></div></>}
   {(mode==='up'||mode==='me')&&<input className="in" required maxLength={40} placeholder="Display name" value={f.name} onChange={set('name')} aria-label="Display name"/>}
   {mode==='me'&&<input type="file" accept="image/jpeg,image/png,image/webp" aria-label="Profile picture" className="in" onChange={async e=>{const file=e.target.files?.[0];if(!file)return;const p=`${user.id}/avatar-${Date.now()}`;const {error}=await s.storage.from('avatars').upload(p,file);if(error)return setMsg('Upload failed. Use a JPG, PNG or WebP under 2 MB.');await s.from('profiles').update({avatar_url:s.storage.from('avatars').getPublicUrl(p).data.publicUrl}).eq('id',user.id);setMsg('Profile picture updated.')}}/>}
   {['in','up','forgot'].includes(mode)&&<input className="in" type="email" required placeholder="Email address" value={f.email} onChange={set('email')} aria-label="Email address" autoComplete="email"/>}
   {['in','up','reset'].includes(mode)&&<input className="in" type="password" required minLength={8} placeholder="Password (8+ characters)" value={f.password} onChange={set('password')} aria-label="Password" autoComplete={mode==='in'?'current-password':'new-password'}/>}
   <button disabled={busy||(mode==='otp'&&code.length<6)} className="cta w-full justify-center disabled:opacity-50">{busy?'Please wait…':{in:'Sign in',up:'Create account',otp:'Verify',forgot:'Send reset link',reset:'Save password',me:'Save profile'}[mode]}</button>
   {msg&&<p role="status" className="text-sm text-white/80">{msg}</p>}
   <div className="flex flex-wrap gap-4 pt-1 text-sm underline">
    {mode==='in'&&<><button type="button" onClick={emailCode}>Email me a code instead</button><button type="button" onClick={()=>{setMode('forgot');setMsg('')}}>Forgot password?</button></>}
    {mode==='otp'&&<><button type="button" disabled={cool>0} onClick={resend} className="disabled:no-underline disabled:opacity-50">{cool>0?`Resend in ${cool}s`:'Resend code'}</button><button type="button" onClick={()=>{setMode('in');setMsg('')}}>Change email</button></>}
    {mode==='forgot'&&<button type="button" onClick={()=>setMode('in')}>Back to sign in</button>}
    {mode==='me'&&<button type="button" onClick={async()=>{await s.auth.signOut();location.href='/'}}>Sign out</button>}</div></motion.form></AnimatePresence></div>
  <AnimatePresence>{dup&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDup(false)} className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-sm">
   <motion.div role="alertdialog" aria-labelledby="dup-t" initial={{scale:.6,rotate:-6,opacity:0}} animate={{scale:1,rotate:0,opacity:1}} exit={{scale:.8,opacity:0}} transition={{type:'spring',damping:14}} onClick={e=>e.stopPropagation()} className="relative w-full max-w-md bg-[#15181f] px-16 pb-9 pt-12 text-center shadow-[0_0_90px_#f4ff0033]">
    <Strip side="left"/><Strip side="right"/><div className="absolute inset-x-9 top-0 h-5" style={{background:'repeating-linear-gradient(-45deg,#fff 0 14px,#000 14px 28px)'}}/>
    <p className="h inline-block bg-white px-3 py-1 text-black">Scene 1 · Take 2</p>
    <h2 id="dup-t" className="h flick mt-4 text-5xl text-[#f4ff00]">That's a wrap!</h2>
    <p className="mt-3 text-lg">You already have an account with this email.</p>
    <div className="mt-6 flex gap-2"><button onClick={()=>{setDup(false);setMode('in')}} className="h flex-1 bg-[#f4ff00] py-3 text-xl text-black">Sign in</button><button onClick={()=>setDup(false)} className="h flex-1 border border-white/40 py-3 text-xl">Close</button></div></motion.div></motion.div>}</AnimatePresence></main>)}
