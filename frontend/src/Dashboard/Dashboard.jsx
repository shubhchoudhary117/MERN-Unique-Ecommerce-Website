import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/Navbar/NavigationBar'

const Dashboard = () => {
  return <>
  
  <div className="dashboard">
        <NavigationBar/>
    <Outlet/>
  </div>
  
  </>
}

export default Dashboard