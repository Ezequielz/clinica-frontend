
interface Props {
    label: string;
}

export const ButtonLoading = ({label}: Props) => {
    return (
        <button type="button" className="mt-4 bg-purple-600 h-12 w-48 rounded-lg text-white  overflow-hidden  font-bold hover:bg-purple-500 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
            <div className="flex items-center justify-center m-[10px]">
                <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                <div className="ml-2 text-xs"> {label} </div>
            </div>
        </button>
    )
}
