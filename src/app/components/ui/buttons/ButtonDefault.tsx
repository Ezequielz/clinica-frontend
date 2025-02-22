

interface Props {
    label?: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode
    type?: "button" | "submit" | "reset"
}
export const ButtonDefault = ({ label, className, icon, type = "button" , onClick }: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex gap-2 justify-center items-center bg-purple-800 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit ${className}`}
        >
            {label}
            {icon}
        </button>
    )
}
