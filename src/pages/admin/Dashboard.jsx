import { useState } from 'react';
import { useParams } from 'react-router';
import GroupOrientation from '../../components/admin-components/GroupOrientation';
import PageHeader from '../../components/page-header/PageHeader';
import AdminHeader from './AdminHeader';
import './dashboard.scss';

const Dashboard = () => {
  const { userid } = useParams();
  console.log('@@params', userid);
  return (
    <>
      <AdminHeader />
      <PageHeader>Admin Dashboard</PageHeader>
      <div className='admin-dashboard'>
        <GroupOrientation userid={userid} />
      </div>
    </>
  );
};

export default Dashboard;
