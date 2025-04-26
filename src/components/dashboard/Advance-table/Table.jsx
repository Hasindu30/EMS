import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Pagination, Input } from 'antd';
import axios from 'axios';

// Reusable Table Component
const ReusableTable = ({
  fetchDataUrl,
  deleteDataUrl,
  updateDataUrl,
  columns,
  rowKey,
  pageSize = 10,
}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(fetchDataUrl, {
        params: { page: currentPage, limit: pageSize },
      });
      setData(response.data.items);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteDataUrl}/${id}`);
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingKey(id);
  };

  const handleSave = async (id, newData) => {
    try {
      await axios.put(`${updateDataUrl}/${id}`, newData);
      fetchData(); // Refresh the data after save
      setEditingKey(''); // Stop editing
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const columnsWithActions = [
    ...columns,
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record[rowKey])}>Edit</Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record[rowKey])}
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const editableColumns = columnsWithActions.map((col) => {
    if (col.editable) {
      return {
        ...col,
        render: (text, record) => (
          editingKey === record[rowKey] ? (
            <Input
              defaultValue={text}
              onBlur={(e) => handleSave(record[rowKey], { ...record, [col.dataIndex]: e.target.value })}
            />
          ) : text
        ),
      };
    }
    return col;
  });

  return (
    <div>
      <Table
        dataSource={data}
        columns={editableColumns}
        pagination={false}
        rowKey={rowKey}
        bordered
      />
      <Pagination
        current={currentPage}
        total={totalItems}
        onChange={setCurrentPage}
        pageSize={pageSize}
        showSizeChanger
        pageSizeOptions={['10', '20', '50']}
      />
    </div>
  );
};

export default ReusableTable;
