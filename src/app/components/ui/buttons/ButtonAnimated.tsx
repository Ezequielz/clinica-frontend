/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
    label: string;
    onClick?: (param?: any) => Promise<void>; 
    param?: any; 
}
export const ButtonAnimated = ({ label, onClick, param  }: Props) => {

 
    return (
        <button
            className="mt-4  group relative py-2 px-4  overflow-hidden rounded-lg bg-purple-500 text-lg shadow"
            onClick={() => onClick?.(param)}
        >
            <div className="absolute inset-0 w-3 bg-purple-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-white"> {label} </span>
        </button>

    )
}

