import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/dashboard/AdminSidebar'
import Navbar from '../../components/dashboard/Navbar'
import DataTable from 'react-data-table-component'
// import { columns } from '../../utils/DepartmentHelpers'
import { useSidebar } from '../../context/SidebarContext' 
import { Plus } from 'lucide-react';
import SidePopup from '../../components/common/SidePopup'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Department = () => {
  const { isHovered } = useSidebar(); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
 
   const columns =[
    {
        name:"Department",
        selector: (row) => row.depName
    },
    {
        name:"Section",
        selector: (row) => row.section
    },
    {
        name:"Designation",
        selector: (row) => row.designation
    },
    {
        name:"Actions",
        selector: (row) => row.action
    },
]
  useEffect(() => {
    fetchDepartments();
  }, []);
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/alldepartments',{
        params: { search },
      });
      setData(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const onSubmit = async (formData) => {
    try {
      await axios.post('/api/department', formData);
      setIsPopupOpen(false); // close popup
      reset();               // reset form
      fetchDepartments(); 
      toast.success('Employee created successfully!', {
                position: "top-right",
                autoClose: 3000,
              });   
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };
const validationSchema = yup.object().shape({
  depName: yup.string().required('Department Name is required'),
  section: yup.string(),
  designation: yup.string(),
  
  });
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });


  return (
    <>
    <ToastContainer />
     <SidePopup
  isOpen={isPopupOpen}
  onClose={() => setIsPopupOpen(false)}
  title="Add Department"
>
  
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Department Name</label>
      <input
      {...register('depName')}
        type="text"
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter employee name"
        
      />
       {errors.depName && <p className="text-red-500 text-xs">{errors.depName.message}</p>}
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Section</label>
      <input
       {...register('section')}
        type="text"
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter department"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Designation</label>
      <input
       {...register('designation')}
        type="text"
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
          <h1 className="text-2xl font-semibold mb-3">Department Registry</h1>
          <div className="mb-4 flex justify-between items-center gap-4">
          <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
