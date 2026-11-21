import Link from 'next/link'
import {notFound} from 'next/navigation'
import {server} from '@/lib/server'
import {ROLES,slug} from '@/lib/data'
import RoleArt,{THEME} from '@/components/RoleArt'
export default async function Role({params}:{params:{slug:string}}){
 const name=ROLES.find(r=>slug(r)===params.slug);if(!name)notFound()
 const [a]=THEME[params.slug]
 const {data}=await server().from('members').select('id,name').eq('role_slug',params.slug)
 return(<main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28" style={{background:`radial-gradient(90% 60% at 80% 0%,${a}44,transparent 70%)`}}>
 <RoleArt id={params.slug} className="float pointer-events-none absolute -right-8 top-24 w-[70vw] max-w-lg opacity-90"/>
 <h1 className="h up relative mx-auto max-w-4xl text-7xl md:text-9xl">{name}</h1>
 <ul className="relative mx-auto mt-10 max-w-4xl space-y-2 text-2xl">{data?.length?data.map(m=><li key={m.id}>{m.name}</li>):<li className="text-white/70">for hire</li>}</ul>
 <div className="relative mx-auto mt-10 max-w-4xl"><Link href={`/join?role=${params.slug}`} className="cta"><span>Your name could be here</span><span className="text-base opacity-70">Apply in 60 seconds</span><i>→</i></Link></div></main>)}
