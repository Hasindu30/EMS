import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/dashboard/AdminSidebar'
import Navbar from '../../components/dashboard/Navbar'
import DataTable from 'react-data-table-component'
// import { columns } from '../../utils/DepartmentHelpers'
import { useSidebar } from '../../context/SidebarContext' 
import { Pencil, Plus, Trash2 } from 'lucide-react';
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
  const [isEditMode, setIsEditMode] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const handleEdit = (row) => {
      setIsEditMode(true);
      setSelectedDepartmentId(row._id);
      setValue('depName', row.depName || '');
      setValue('section', row.section || '');
      setValue('designation', row.designation || '');
      setIsPopupOpen(true);
    };
   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
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
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,   
    }
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
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);
  const handleDelete = (id) => {
      setDeleteDepartmentId(id);
      setIsDeletePopupOpen(true);
    };
    
    const confirmDelete = async () => {
      try {
        if (!deleteDepartmentId) {
          console.error('No Department selected for deletion.');
          return;
        }
    
        await axios.delete(`/api/departmentdelete/${deleteDepartmentId}`);
    
        toast.success('Department deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
    
        setIsDeletePopupOpen(false);
        setDeleteDepartmentId(null); // clear selected id
        fetchDepartments();          // refresh Department list
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete Department!', {
          position: "top-center",
          autoClose: false,
        });
      }
    };
  const onSubmit = async (formData) => {
    try {
      if (isEditMode) {
        await axios.put(`/api/departmentupdate/${selectedDepartmentId}`, formData);
        toast.success('Department updated successfully!', {
                  position: "top-right",
                  autoClose: 3000,
                });
      }else{
        await axios.post('/api/department', formData);
        toast.success('Department created successfully!', {
          position: "top-right",
          autoClose: 3000,
        });   
      }
      
      setIsPopupOpen(false); // close popup
      reset();               // reset form
      fetchDepartments(); 
      
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error('Failed to create or update department!', {
              position: "top-center",
              autoClose: false,
            });
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
  onClose={() => {
    setIsPopupOpen(false);
    setIsEditMode(false);
    reset(); 
  }
  }
  title={isEditMode ? "Edit Department" : "Create Department"} 
>
  
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Department Name</label>
      <input
      {...register('depName')}
        type="text"
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter Department name"
        
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
        {isEditMode ? "Update" : "Create"}
      </button>
    </div>
  </form>
</SidePopup>
<SidePopup
 isOpen={isDeletePopupOpen}
 onClose={() => setIsDeletePopupOpen(false)}
 title="Delete Department"
>
<div className="flex flex-col items-center justify-center gap-6 p-6">
    <p className="text-gray-700 text-center text-lg">
      Are you sure you want to delete this department?
    </p>
    <div className="flex justify-center gap-4">
      <button
        onClick={() => setIsDeletePopupOpen(false)}
        className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
      >
        No
      </button>
      <button
        onClick={confirmDelete}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Yes
      </button>
    </div>
  </div>
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
