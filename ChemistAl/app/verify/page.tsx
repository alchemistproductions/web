import {redirect} from 'next/navigation'
export default function V({searchParams}:any){redirect('/login?'+new URLSearchParams(searchParams))}
