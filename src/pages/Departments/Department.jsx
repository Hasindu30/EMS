import React, { useState } from 'react'
import AdminSidebar from '../../components/dashboard/AdminSidebar'
import Navbar from '../../components/dashboard/Navbar'
import DataTable from 'react-data-table-component'
// import { columns } from '../../utils/DepartmentHelpers'
import { useSidebar } from '../../context/SidebarContext' 
import { Plus } from 'lucide-react';
import SidePopup from '../../components/common/SidePopup'

const Department = () => {
  const { isHovered } = useSidebar(); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const data = [
    { sno: 1, dep_name: "HR Department", action: "Edit" },
    { sno: 2, dep_name: "Finance", action: "Edit" },
  ];
   const columns =[
    {
        name:"Code",
        selector: (row) => row.sno
    },
    {
        name:"Emp. Name",
        selector: (row) => row.dep_name
    },
    {
        name:"Department",
        selector: (row) => row.action
    },
    {
        name:"Actions",
        selector: (row) => row.action
    },
]

  return (
    <>
     <SidePopup
  isOpen={isPopupOpen}
  onClose={() => setIsPopupOpen(false)}
  title="Add Department"
>
  
  <form className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Employee Code</label>
      <input
        type="text"
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter employee name"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Employee Name</label>
      <input
        type="text"
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter department"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Department</label>
      <input
        type="number"
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter amount"
      />
    </div>

    <div className="flex justify-end mt-6">
      <button
        type="submit"
        className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition text-sm"
      >
        Create
      </button>
    </div>
  </form>
</SidePopup>

    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <AdminSidebar />
      
      
      <div className={`flex-1 transition-all duration-300 ${isHovered ? 'ml-64' : 'ml-20'}`}>
        <Navbar />

        <div className="p-6 mt-10">
          <h1 className="text-2xl font-semibold mb-3">Employee Departments</h1>
          <div className="mb-4 flex justify-between items-center gap-4">
          <input
              type="text"
              placeholder="Search"
              className="border p-1 rounded-md w-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button 
          onClick={() => setIsPopupOpen(true)}
          className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700 transition flex items-center gap-2">
            <Plus size={22} />
              Add
          </button>
         </div>
          
    <DataTable
    columns={columns}
    data={data}
     pagination
    highlightOnHover
    responsive
    selectableRows
    customStyles={{
    headRow: {
      style: {
        minHeight: '40px', 
      },
    },
    headCells: {
      style: {
        backgroundColor: '#0fcea0',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '14px',
        paddingTop: '8px',
        paddingBottom: '8px',
        textTransform:"uppercase"
      },
    },
    rows: {
      style: {
        minHeight: '40px', 
        paddingTop: '0px',
        paddingBottom: '0px',
      },
    },
    cells: {
      style: {
        fontSize: '14px', 
        paddingTop: '8px',
        paddingBottom: '8px',
         },
     },
    }}
    />
    </div>
    </div>
    </div>
    </>
  );
}

export default Department;
