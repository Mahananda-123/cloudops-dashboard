import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getTargets,
  getCPUUsage,
  getMemoryUsage,
  getDiskUsage,
  getJenkinsBuild,
} from "./services/api";

function App() {

  const [targets, setTargets] = useState([]);

  const [cpuData, setCpuData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [diskData, setDiskData] = useState([]);

  const [cpuValue, setCpuValue] = useState("0%");
  const [memoryValue, setMemoryValue] = useState("0%");
  const [diskValue, setDiskValue] = useState("0%");

  const [buildStatus, setBuildStatus] = useState("Loading...");
  const [buildNumber, setBuildNumber] = useState("-");

  useEffect(() => {

    fetchAllData();

    const interval = setInterval(() => {
      fetchAllData();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchAllData = async () => {
    fetchTargetsData();
    fetchCPUData();
    fetchMemoryData();
    fetchDiskData();
    fetchJenkinsData();
  };

  const fetchTargetsData = async () => {
    try {

      const res = await getTargets();

      setTargets(res.data.data.activeTargets);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchCPUData = async () => {

    try {

      const res = await getCPUUsage();

      const value =
        100 -
        parseFloat(
          res.data.data.result[0]?.value[1] || 0
        );

      setCpuValue(`${value.toFixed(2)}%`);

      setCpuData((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          value: value,
        },
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchMemoryData = async () => {

    try {

      const res = await getMemoryUsage();

      const value = parseFloat(
        res.data.data.result[0]?.value[1] || 0
      );

      setMemoryValue(`${value.toFixed(2)}%`);

      setMemoryData((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          value: value,
        },
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiskData = async () => {

    try {

      const res = await getDiskUsage();

      const value = parseFloat(
        res.data.data.result[0]?.value[1] || 0
      );

      setDiskValue(`${value.toFixed(2)}%`);

      setDiskData((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          value: value,
        },
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchJenkinsData = async () => {

    try {

      const res = await getJenkinsBuild();

      setBuildStatus(res.data.result);
      setBuildNumber(res.data.number);

    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Servers",
      value: `${targets.length} Active`,
    },
    {
      title: "Containers",
      value: "4 Running",
    },
    {
      title: "CPU Usage",
      value: cpuValue,
    },
    {
      title: "Memory Usage",
      value: memoryValue,
    },
    {
      title: "Disk Usage",
      value: diskValue,
    },
    {
      title: "Jenkins",
      value: buildStatus,
    },
  ];

  return (

    <div style={styles.container}>

      <div style={styles.sidebar}>

        <h2>CloudOps</h2>

        <div style={styles.menuItem}>Dashboard</div>
        <div style={styles.menuItem}>Servers</div>
        <div style={styles.menuItem}>Containers</div>
        <div style={styles.menuItem}>Monitoring</div>
        <div style={styles.menuItem}>Alerts</div>
        <div style={styles.menuItem}>Jenkins</div>

      </div>

      <div style={styles.main}>

        <Navbar />

        <h1>CloudOps Monitoring Dashboard 🚀</h1>

        <div style={styles.cardGrid}>

          {cards.map((card, index) => (

            <div key={index} style={styles.card}>

              <h3>{card.title}</h3>

              <p style={styles.value}>
                {card.value}
              </p>

            </div>

          ))}

        </div>

        <div style={styles.chartCard}>

          <h2>Live CPU Usage</h2>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={cpuData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#38bdf8"
                fill="#38bdf8"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        <div style={styles.chartCard}>

          <h2>Live Memory Usage</h2>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={memoryData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                fill="#22c55e"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        <div style={styles.chartCard}>

          <h2>Live Disk Usage</h2>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={diskData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#f97316"
                fill="#f97316"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        <div style={styles.bottomSection}>

          <div style={styles.largeCard}>

            <h2>System Status</h2>

            <p>✅ Prometheus Running</p>
            <p>✅ Grafana Online</p>
            <p>✅ Alertmanager Active</p>
            <p>✅ Node Exporter Connected</p>
            <p>✅ Jenkins Connected</p>

            <p>
              🚀 Build Number: #{buildNumber}
            </p>

            <p>
              📦 Build Status: {buildStatus}
            </p>

          </div>

          <div style={styles.largeCard}>

            <h2>Prometheus Targets</h2>

            {targets.length > 0 ? (

              targets.map((target, index) => (

                <div
                  key={index}
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    backgroundColor: "#334155",
                    borderRadius: "8px",
                  }}
                >

                  <p>
                    <strong>Job:</strong> {target.labels.job}
                  </p>

                  <p>
                    <strong>Status:</strong> {target.health}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#cbd5e1",
                    }}
                  >
                    {target.scrapeUrl}
                  </p>

                </div>

              ))

            ) : (

              <p>No targets found...</p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "250px",
    backgroundColor: "#1e293b",
    padding: "20px",
  },

  menuItem: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#334155",
    borderRadius: "8px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },

  value: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  chartCard: {
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "12px",
    marginTop: "30px",
  },

  bottomSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "40px",
  },

  largeCard: {
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "12px",
  },

};

export default App;