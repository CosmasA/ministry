import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchSchoolLevels();
  }, []);

  const fetchSchoolLevels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/schools/countByLevel"
      );
      const data = response.data;
      console.log(data);
      const labels = data.map((item) => item.level);
      const counts = data.map((item) => item.count);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Number of Schools",
            data: counts,
            backgroundColor: ["#007bff", "#28a745", "#ffc107"],
            borderColor: ["#0056b3", "#1c7430", "#d39e00"],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching school levels:", error);
    }
  };

  return (
    <div className="chart-container">
      <Card className="chart-card">
        <h4 className="text-center">Schools by Level</h4>
        <div className="chart-wrapper">
          <Bar
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Charts;
