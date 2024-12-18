import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function VisitTrends({ visitHistory }) {
    // Step 1: Process visitHistory to count daily visits
    const visitsByDate = visitHistory.reduce((acc, visit) => {
        const date = new Date(visit.timestamp).toLocaleDateString(); // Convert timestamp to date string
        acc[date] = (acc[date] || 0) + 1; // Count visits per date
        return acc;
    }, {});

    // Step 2: Sort dates and prepare data for the chart
    const dates = Object.keys(visitsByDate).sort((a, b) => new Date(a) - new Date(b)); // Sorted dates
    const visitCounts = dates.map(date => visitsByDate[date]); // Corresponding visit counts

    // Step 3: Create chart data and options
    const data = {
        labels: dates,
        datasets: [
            {
                label: "Daily Visitors",
                data: visitCounts,
                fill: false,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Visitors",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Visitor Trends</h2>
            <Line data={data} options={options} />
        </div>
    );
}

export default VisitTrends;
