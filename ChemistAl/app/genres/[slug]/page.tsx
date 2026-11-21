import {notFound} from 'next/navigation'
import {GENRES,slug} from '@/lib/data'
export default function Genre({params}:{params:{slug:string}}){
 const g=GENRES.find(x=>slug(x.name)===params.slug);if(!g)notFound()
 return(<main className="relative min-h-screen overflow-hidden px-5 pt-28" style={{background:`radial-gradient(circle at 20% 0%,${g.c}44,transparent 60%)`}}>
 <div aria-hidden className="mq h pointer-events-none absolute bottom-6 flex w-max text-[24vw] text-transparent" style={{WebkitTextStroke:`1px ${g.c}66`}}>{Array(6).fill(g.name).map((n,i)=><span key={i} className="mr-10">{n}</span>)}</div>
 <h1 className="h up relative text-7xl md:text-9xl" style={{color:g.c}}>{g.name}</h1><p className="up relative mt-10 text-2xl">Films under progress</p></main>)}
