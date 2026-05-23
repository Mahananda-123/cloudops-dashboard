import axios from "axios";

const PROMETHEUS_API = axios.create({
  baseURL: "http://35.154.171.179:9090/api/v1",
});

const JENKINS_API = axios.create({
  baseURL: "http://15.207.217.2:8080",
  auth: {
    username: "Mahananda",
    password: "118897c6071f837f6df50e483508601818",
  },
});

export const getTargets = () =>
  PROMETHEUS_API.get("/targets");

export const getJenkinsBuild = () =>
  axios.get("http://localhost:5000/jenkins-build");

export const getCPUUsage = () =>
  PROMETHEUS_API.get(
    '/query?query=100-(avg by(instance)(irate(node_cpu_seconds_total{mode="idle"}[5m]))*100)'
  );

export const getMemoryUsage = () =>
  PROMETHEUS_API.get(
    '/query?query=(1-(node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes))*100'
  );

export const getDiskUsage = () =>
  PROMETHEUS_API.get(
    '/query?query=(1-(node_filesystem_avail_bytes/node_filesystem_size_bytes))*100'
  );

  