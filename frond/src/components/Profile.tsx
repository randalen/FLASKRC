import { useState } from 'react'
import {Navbar,Welcome, Footer, Services, Transactions} from '../components';

const Profile = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <div className="gradient-bg-welcome">
        <Footer />
        </div>
    </div>
  )
}

export default Profile