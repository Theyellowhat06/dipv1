export default function Input({placeholder, value, onChange, extra}: any){
    return <input className={`rounded-md bg-slate-100 p-4 focus:outline-none focus:bg-slate-200 transition-colors ${extra? {extra}: ''}`} placeholder={placeholder} value={value} onChange={onChange}></input>
}