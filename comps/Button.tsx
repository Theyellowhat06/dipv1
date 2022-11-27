export default function Button({text, extra, onClick}: any){
    return(
        <div onClick={onClick} className={`bg-primary text-white cursor-pointer hover:bg-primary/80 active:bg-primary transition-colors ${extra}`}>
            {text}
        </div>
    );
}