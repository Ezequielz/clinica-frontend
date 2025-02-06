import CountUp from '@/app/components/ui/CountUp'

interface Props {
    icon: React.ReactNode;
    label: string;
    from?: number;
    to: number;

}

export const InfoBannerCard = ({ icon, label, from = 0, to }: Props) => {
    return (
        <article className=' px-5 w-fit '>

            <div className='flex flex-col gap-1 items-center '>

                <div className='flex gap-2 items-center'>
                    
                    {icon}
                    <CountUp
                        from={from}
                        to={to}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text text-6xl"
                    />
                </div>
                <span className='text-balance text-xl'>
                    {label}
                </span>
            </div>

        </article>
    )
}
