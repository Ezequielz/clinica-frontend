
export const SkeletonMonthlyChart = () => {
    return (
        <div className="animate-pulse flex flex-col gap-4 bg-white p-4 rounded-xl shadow-lg h-[300px]">

            <div className="flex items-end gap-2 w-full h-full">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="w-6 bg-gray-300 rounded-lg" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                ))}
            </div>
        </div>
    )
}
