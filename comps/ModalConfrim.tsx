import Button from './Button'

interface modalData{
    children: any,
    isVisible: boolean,
    onClose: any,
    button: any,
    color: string,
}

export default function ModalConfirm({children, isVisible, onClose, button, color}: modalData){
    if(!isVisible) return null
    return <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center">
        <div className="transition ease-in bg-white rounded-md drop-shadow-sm w-96">
            <div className={`h-2 rounded-t-md ${color}`}></div>
            <div className='m-4'>
                <div className='pb-4'>{children}</div>
                <div className="flex justify-end items-center space-x-2">
                    {button}
                    <Button onClick={onClose} text="Үгүй" extra="p-2 rounded-md bg-blue-500 hover:bg-blue-500/80 active:bg-blue-500"></Button>
                </div>
            </div>
            
        </div>
    </div>
}