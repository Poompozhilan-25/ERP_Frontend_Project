// import React, { useEffect, useState } from "react";
// import MainSidebar from "../../components/MainComponents/mainSidebar/mainSidebar";
// import Body from "../../components/MainComponents/body/body";
// import { Navigate, useSearchParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./userDashboard.css";
// import Sidebar from "../../components/MainComponents/sidebar/sidebar";

// export default function userDashboard() {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   const [searchParam, setSearchParam] = useSearchParams();

//   const [expanded, setexpanded] = useState(false);
//   const [currentPage, setCurrentPage] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);

//   const [mastersDropdown, setmastersDropdown] = useState(false);
//   const [crmDropdown, setcrmDropdown] = useState(false);
//   const [salesDropDown, setSalesDropDown] = useState(false);
//   const [purchaseDropdown, setPurchaseDropdown] = useState(false);
//   const [financeDropdown, setFinanceDropdown] = useState(false);


//   useEffect(() => {
//     setCurrentPage(searchParam.get("tab") || "dashboard");
//   }, [searchParam]);

//   const updateCurrentPage = (tab) => {
//     setSearchParam({ tab });
//     setCurrentPage(tab);
//   };

//   return isAuthenticated ? (
//     <div className="userDashboard">
//       <MainSidebar
//         expanded={expanded}
//         currentPage={currentPage}
//         setCurrentPage={updateCurrentPage}
//         mastersDropdown={mastersDropdown}
//         setmastersDropdown={setmastersDropdown}
//         crmDropdown={crmDropdown}
//         setcrmDropdown={setcrmDropdown}
//         salesDropDown={salesDropDown}
//         setSalesDropDown={setSalesDropDown}
//         purchaseDropdown={purchaseDropdown}
//         setPurchaseDropdown={setPurchaseDropdown}
//         financeDropdown={financeDropdown}
//         setFinanceDropdown={setFinanceDropdown}
//       />

//       {showSidebar && (
//         <Sidebar
//           setShowSidebar={setShowSidebar}
//           currentPage={currentPage}
//           setCurrentPage={updateCurrentPage}
//           mastersDropdown={mastersDropdown}
//           setmastersDropdown={setmastersDropdown}
//           crmDropdown={crmDropdown}
//           setcrmDropdown={setcrmDropdown}
//           salesDropDown={salesDropDown}
//           setSalesDropDown={setSalesDropDown}
//           purchaseDropdown={purchaseDropdown}
//           setPurchaseDropdown={setPurchaseDropdown}
//           financeDropdown={financeDropdown}
//           setFinanceDropdown={setFinanceDropdown}
//         />
//       )}

//       <Body
//         setCurrentPage={updateCurrentPage}
//         user={user}
//         expanded={expanded}
//         setexpanded={setexpanded}
//         currentPage={currentPage}
//         setShowSidebar={setShowSidebar}
//       />
//     </div>
//   ) : (
//     <Navigate to={"/signin"} />
//   );
// }
import React, { useEffect, useState } from "react";
import MainSidebar from "../../components/MainComponents/mainSidebar/mainSidebar";
import Body from "../../components/MainComponents/body/body";
import { Navigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./userDashboard.css";
import Sidebar from "../../components/MainComponents/sidebar/sidebar";

export default function UserDashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [searchParam, setSearchParam] = useSearchParams();
  const [expanded, setexpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const [mastersDropdown, setmastersDropdown] = useState(false);
  const [crmDropdown, setcrmDropdown] = useState(false);
  const [salesDropDown, setSalesDropDown] = useState(false);
  const [purchaseDropdown, setPurchaseDropdown] = useState(false);
  const [financeDropdown, setFinanceDropdown] = useState(false);

  // ✅ Set default page when component loads
  useEffect(() => {
    setCurrentPage(searchParam.get("tab") || "dashboard");
  }, [searchParam]);

  const updateCurrentPage = (tab) => {
    setSearchParam({ tab });
    setCurrentPage(tab);
  };

  if (isAuthenticated) {
  return <Navigate to="/sign‑in" replace />;
}

  useEffect(() => {
  console.log("UserDashboard render, isAuthenticated=", isAuthenticated, "user=", user);
  }, [isAuthenticated, user]);


  return (
    <div className="userDashboard">
      <MainSidebar
        expanded={expanded}
        currentPage={currentPage}
        setCurrentPage={updateCurrentPage}
        mastersDropdown={mastersDropdown}
        setmastersDropdown={setmastersDropdown}
        crmDropdown={crmDropdown}
        setcrmDropdown={setcrmDropdown}
        salesDropDown={salesDropDown}
        setSalesDropDown={setSalesDropDown}
        purchaseDropdown={purchaseDropdown}
        setPurchaseDropdown={setPurchaseDropdown}
        financeDropdown={financeDropdown}
        setFinanceDropdown={setFinanceDropdown}
      />

      {showSidebar && (
        <Sidebar
          setShowSidebar={setShowSidebar}
          currentPage={currentPage}
          setCurrentPage={updateCurrentPage}
          mastersDropdown={mastersDropdown}
          setmastersDropdown={setmastersDropdown}
          crmDropdown={crmDropdown}
          setcrmDropdown={setcrmDropdown}
          salesDropDown={salesDropDown}
          setSalesDropDown={setSalesDropDown}
          purchaseDropdown={purchaseDropdown}
          setPurchaseDropdown={setPurchaseDropdown}
          financeDropdown={financeDropdown}
          setFinanceDropdown={setFinanceDropdown}
        />
      )}

      <Body
        setCurrentPage={updateCurrentPage}
        user={user}
        expanded={expanded}
        setexpanded={setexpanded}
        currentPage={currentPage}
        setShowSidebar={setShowSidebar}
      />
    </div>
  );
}
