import Button from './Button'

interface modalData{
    children: any,
    isVisible: boolean,
    onClose: any,
    buttons: (any)[]
}

export default function Modal({children, isVisible, onClose, buttons}: modalData){
    if(!isVisible) return null
    return <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center">
        <div className="transition ease-in bg-white p-4 rounded-md drop-shadow-sm">
            {children}
            <div className="flex justify-end items-center space-x-2">
                {buttons.map((row)=>(
                    row
                ))}
            </div>
        </div>
    </div>
}