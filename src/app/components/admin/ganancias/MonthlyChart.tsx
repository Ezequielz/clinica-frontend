'use client'
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';

interface Props {
    month: { [key: string]: number };
}

export const MonthlyChart = ({ month }: Props) => {
    const daysInMonth = Object.keys(month).sort((a, b) => {
        const numA = parseInt(a.split(" ")[1], 10);
        const numB = parseInt(b.split(" ")[1], 10);
        return numA - numB;
    });

    return (
        <motion.div
            className="gap-6 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white p-4 rounded-xl shadow-lg"
                // whileHover={{ scale: 1.05 }}
            >
                <Chart
                    type="bar"
                    height={300}
                    options={{
                        chart: {
                            id: "monthly-chart",
                            toolbar: { show: false },
                        },
                        xaxis: {
                            categories: daysInMonth, // Todos los días del mes
                        },
                        colors: ["#4F46E5"],
                        dataLabels: { enabled: false },
                    }}
                    series={[{
                        name: "Ganancias",
                        data: daysInMonth.map(day => month[day] || 0),
                    }]}
                />
            </motion.div>
        </motion.div>
    );
};
