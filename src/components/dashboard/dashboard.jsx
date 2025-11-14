// import React, { useEffect, useState } from "react";
// import "./dashboard.css";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function Dashboard() {
//   const [taskData, setTaskData] = useState(null);
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [pieData, setPieData] = useState([
//     { name: "Not Started", value: 0 },
//     { name: "In Progress", value: 0 },
//     { name: "Completed", value: 0 },
//     {
//       name: "Awaiting Feedback",
//       value: 0,
//     },
//   ]);
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   useEffect(() => {
//     if (Object.keys(taskDataFromAPI).length > 0) {
//       setTaskData(taskDataFromAPI);
//     }
//     if (Object.keys(attendanceDataFromApi).length > 0) {
//       setAttendanceData(attendanceDataFromApi);
//     }
//   }, []);

//   useEffect(() => {
//     if (taskData) {
//       setPieData([
//         { name: "Not Started", value: taskData.taskSummary.not_started },
//         { name: "In Progress", value: taskData.taskSummary.in_progress },
//         { name: "Completed", value: taskData.taskSummary.completed },
//         {
//           name: "Awaiting Feedback",
//           value: taskData.taskSummary.awaiting_feedback,
//         },
//       ]);
//     }
//     if (attendanceData) {
//       setAttendanceData(attendanceData.dateData);
//     }
//   }, [taskData]);

//   const taskDataFromAPI = {
//     taskData: [
//       {
//         taskId: 0,
//         name: "ERC",
//         status: "In Progress",
//         start_date: "Sat Feb 01 2025 09:00:00 GMT+0530 (India Standard Time)",
//         due_date: "Sat Feb 01 2025 09:00:00 GMT+0530 (India Standard Time)",
//         assigned_to: "kamal",
//         priority: "high",
//       },
//       {
//         taskId: 1,
//         name: "ESC",
//         status: "In Progress",
//         start_date: "Sat Feb 01 2025 09:00:00 GMT+0530 (India Standard Time)",
//         due_date: "Sat Feb 01 2025 09:00:00 GMT+0530 (India Standard Time)",
//         assigned_to: "kamal",
//         priority: "high",
//       },
//     ],
//     taskSummary: {
//       not_started: 2,
//       in_progress: 2,
//       completed: 1,
//       awaiting_feedback: 3,
//     },
//   };

//   const attendanceDataFromApi = {
//     dateData: [
//       { name: "Jan", present: 12, absent: 8 },
//       { name: "Feb", present: 20, absent: 2 },
//       { name: "Mar", present: 6, absent: 1 },
//       { name: "Apr", present: 12, absent: 8 },
//       { name: "May", present: 20, absent: 2 },
//       { name: "Jun", present: 6, absent: 1 },
//       { name: "Jul", present: 12, absent: 8 },
//       { name: "Aug", present: 20, absent: 2 },
//       { name: "Sep", present: 6, absent: 1 },
//       { name: "Oct", present: 12, absent: 8 },
//       { name: "Nov", present: 20, absent: 2 },
//       { name: "Dec", present: 6, absent: 1 },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <h2>Dashboard</h2>

//       <div className="charts-container">
//         {/* Pie Chart */}
//         <div className="chart">
//           <h2>Task</h2>
//           <ResponsiveContainer width="100%" height={350}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius="80%"
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart */}
//         <div className="chart">
//           <h2>Attendance</h2>
//           <ResponsiveContainer height={350}>
//             <BarChart
//               data={attendanceData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="present" fill="#8884d8" />
//               <Bar dataKey="absent" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useDashboardStore from "./dashboardStore"; // ✅ Adjust path as needed
import ProtectedRoute from "../../utills/Protected";

export default function Dashboard() {
  const { dashboardData, loading, fetchDashboard } = useDashboardStore();
  const [pieData, setPieData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // ✅ Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // ✅ Prepare chart data after dashboardData updates
  useEffect(() => {
    if (dashboardData?.tasks?.taskSummary) {
      const summary = dashboardData.tasks.taskSummary;
      setPieData([
        { name: "Not Started", value: summary.not_started },
        { name: "In Progress", value: summary.in_progress },
        { name: "Completed", value: summary.completed },
        { name: "Awaiting Feedback", value: summary.awaiting_feedback },
      ]);
    }

    if (dashboardData?.attendance) {
      const formattedAttendance = dashboardData.attendance.map((item) => ({
        name: item.month,
        present: item.present,
        absent: item.absent,
      }));
      setAttendanceData(formattedAttendance);
    }
  }, [dashboardData]);

  return (
    <ProtectedRoute>
    <div className="dashboard">
      <h2>Dashboard</h2>

      {loading && <p>Loading data...</p>}

      {!loading && dashboardData && (
        <div className="charts-container">
          {/* Task Status Pie Chart */}
          <div className="chart">
            <h2>Task Status</h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Overview Bar Chart */}
          <div className="chart">
            <h2>Attendance Overview</h2>
            <ResponsiveContainer height={350}>
              <BarChart
                data={attendanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#4CAF50" />
                <Bar dataKey="absent" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}

