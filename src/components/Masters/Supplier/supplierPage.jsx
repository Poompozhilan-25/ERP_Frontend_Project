import React, { useState, useEffect } from "react";
import "./supplierPage.css";
import { useNavigate } from "react-router-dom";

export default function SupplierPage({ setCurrentPage }) {
  const navigate = useNavigate();
  const [supplierCurrentPage, setsupplierCurrentPage] = useState(1);
  const supplierPerPage = 10;
  const [filter, setFilter] = useState({
    status: "",
    supplier: "",
    supplier_tier: "",
  });

  const [Apisupplier, setApisupplier] = useState({});
  const [supplierData, setsupplierData] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const supplierFromAPI = {
    supplierData: [
      {
        sup_id: "PO-0001",
        supplier_name: "Jon",
        po_date: "14-05-2025",
        delivery_date: "15-06-20255",
        status: "Draft",
        supplier_type: "Manufacturer",
        total_value: "150000",
      },
      {
        sup_id: "PO-0002",
        supplier_name: "Jon Deo",
        po_date: "14-05-2025",
        delivery_date: "15-06-20255",
        status: "Submitted",
        supplier_type: "Manufacturer",
        total_value: "150000",
      },
      {
        sup_id: "PO-0003",
        supplier_name: "Jon Deo",
        po_date: "14-05-2025",
        delivery_date: "15-06-20255",
        status: "Partially Received",
        supplier_type: "Distributor",
        total_value: "150000",
      },
      {
        sup_id: "PO-0004",
        supplier_name: "Jon Deo",
        po_date: "14-05-2025",
        delivery_date: "15-06-20255",
        status: "Received",
        supplier_type: "Service Provider",
        total_value: "150000",
      },
      {
        sup_id: "PO-0005",
        supplier_name: "Jon Deo",
        po_date: "14-05-2025",
        delivery_date: "15-06-20255",
        status: "Cancelled",
        supplier_type: "Service Provider",
        total_value: "150000",
      },
      {
        sup_id: "PO-0006",
        supplier_name: "Jon Deo",
        po_date: "14-05-2025",
        delivery_date: "15-06-20255",
        status: "Draft",
        supplier_type: "Service Provider",
        total_value: "150000",
      },
    ],

    supplier: ["Manufacturer", "Distributor", "Service Provider"],
  };
  useEffect(() => {
    setApisupplier(supplierFromAPI);
  }, []);
  useEffect(() => {
    if (Object.keys(Apisupplier).length > 0) {
      setsupplierData(Apisupplier.supplierData);
      setSupplier(Apisupplier.supplier);
    }
  }, [Apisupplier]);

  //page calculation
  const totalPages = Math.ceil(supplierData.length / supplierPerPage);

  const currentData = supplierData.slice(
    (supplierCurrentPage - 1) * supplierPerPage,
    supplierCurrentPage * supplierPerPage
  );
  const handleNext = () => {
    if (supplierCurrentPage < totalPages) {
      setsupplierCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (supplierCurrentPage > 1) {
      setsupplierCurrentPage((prev) => prev - 1);
    }
  };
  const handleClearFilter = () => {
    setFilter({
      status: "",
      supplier: "",
      supplier_tier: "",
    });
  };
  return (
    <>
      <div className="supplier-container">
        <div className="supplier-header">
          <p>Supplier Master</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage("createNewSupplier");
            }}
          >
            + New Supplier Order
          </button>
        </div>
        <div className="supplier-search-box">
          <label htmlFor="searchByID">
            <svg
              className="supplier-search-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </label>
          <input
            id="searchByID"
            placeholder="Search by Supplier ID number, Supplier name...."
          />
        </div>
        <div className="supplier-clearfilter">
          <p onClick={handleClearFilter}>Clear Filter</p>
        </div>
        <div className="supplier-search-category">
          <div className="supplier-input-box">
            <label htmlFor="status">Status</label>
            <select
              value={filter.status}
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  status: e.target.value,
                }));
              }}
              id="status"
            >
              <option value="">All</option>
              <option value="Draft">Draft</option>
              <option value="Open">Open</option>
              <option value="Partially Received">Partially Received</option>
              <option value="Closed">Closed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="supplier-input-box">
            <label htmlFor="supplier">Supplier Type</label>
            <select
              id="supplier"
              value={filter.supplier}
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  supplier: e.target.value,
                }));
              }}
            >
              <option value="">All Types</option>
              {supplier.map((ele, ind) => (
                <option key={ind}>{ele}</option>
              ))}
            </select>
          </div>
          <div className="supplier-input-box">
            <label htmlFor="supplier_tier">Supplier Tier</label>
            <select
              id="supplier_tier"
              value={filter.supplier_tier}
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  supplier_tier: e.target.value,
                }));
              }}
            >
              <option value="">All Types</option>
              <option value="Strategic">Strategic</option>
              <option value="prefered">Preferred</option>
              <option value="backup">Backup</option>
            </select>
          </div>
        </div>
        <div className="supplier-table-cointainer">
          <table>
            <thead className="supplier-table-head">
              <tr>
                <th></th>
                <th>
                  <pre>Supplier ID</pre>
                </th>
                <th>
                  <pre>Supplier Name</pre>
                </th>
                <th>
                  <pre>Created Date</pre>
                </th>
                <th>
                  <div className="supplier-status-filter">
                    Status
                    <nav className="supplier-filter-box">
                      <p>Newest First</p>
                      <p>Oldest First</p>
                      <p>Progressing {`(Draft → Cancelled)`}</p>
                      <p>Reverse Progressing{`(Cancelled → Draft)`} </p>
                    </nav>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                    >
                      <path
                        d="M3.66683 12.3346H0.333496L5.3335 17.3346V0.667969H3.66683V12.3346ZM8.66683 3.16797V17.3346H10.3335V5.66797H13.6668L8.66683 0.667969V3.16797Z"
                        fill="#234E70"
                      />
                    </svg>
                  </div>
                </th>
                <th>
                  <pre>Supplier Type</pre>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="supplier-table-body">
              {currentData.length > 0 ? (
                currentData.map((ele, ind) => (
                  <tr key={ind}>
                    <td>
                      <input
                        className="supplier-delete-logo"
                        type="checkbox"
                      />
                    </td>
                    <td>
                      <pre>{ele.sup_id}</pre>
                    </td>
                    <td>
                      <pre>{ele.supplier_name}</pre>
                    </td>
                    <td>
                      <pre>{ele.po_date}</pre>
                    </td>
                    <td>
                      <p
                        className={`supplier-Status ${
                          ele.status === "Draft"
                            ? "supplier-Status-draft"
                            : ele.status === "Submitted"
                            ? "supplier-Status-Submitted"
                            : ele.status === "Partially Received"
                            ? "supplier-Status-PartiallyReceived"
                            : ele.status === "Received"
                            ? "supplier-Status-Received"
                            : ele.status === "Cancelled"
                            ? "supplier-Status-Cancelled"
                            : ""
                        }`}
                      >
                        <pre>{ele.status}</pre>
                      </p>
                    </td>
                    <td>
                      <pre>{ele.supplier_type}</pre>
                    </td>
                    <td id="supplier-table-action">
                      <nav className="supplier-dot-container">
                        <button
                          onClick={() => {
                            navigate(`/?tab=editNewSales/${ele.sup_id}`);
                            setCurrentPage("editsupplier");
                          }}
                        >
                          {ele.status === "Draft" ? "Edit" : "View"} details
                        </button>
                        <button
                          disabled={
                            ele.status === "Draft" || ele.status === "Cancelled"
                              ? true
                              : false
                          }
                        >
                          Generate Stock Receipt
                        </button>
                      </nav>
                      <svg
                        className="supplier-delete-logo"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 16C12.5304 16 13.0391 16.2107 13.4142 16.5858C13.7893 16.9609 14 17.4696 14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18C10 17.4696 10.2107 16.9609 10.5858 16.5858C10.9609 16.2107 11.4696 16 12 16ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10ZM12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6C14 6.53043 13.7893 7.03914 13.4142 7.41421C13.0391 7.78929 12.5304 8 12 8C11.4696 8 10.9609 7.78929 10.5858 7.41421C10.2107 7.03914 10 6.53043 10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4Z"
                          fill="#2A2A2A"
                        />
                      </svg>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav className="supplier-table-bottem">
          <p className="supplier-num-entries">
            Showing {currentData.length} entries
          </p>
          <div className="supplier-manage-control-box">
            <button
              className="supplier-manage-btn"
              onClick={handlePrev}
              disabled={supplierCurrentPage === 1}
            >
              Prev
            </button>
            <nav className="supplier-num-page">
              Page {supplierCurrentPage} of {totalPages}
            </nav>
            <button
              className="supplier-manage-btn"
              onClick={handleNext}
              disabled={supplierCurrentPage === totalPages}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
