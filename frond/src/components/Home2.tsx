import { useState } from 'react'
import {Navbar,Welcome, Footer, Services, Transactions} from '../components';
import styles from '../styles/Global';

const Home2 = () => {
  return (
<div className="min-h-screen">
<div className="gradient-bg-welcome">
  <Navbar />
  <Services />
</div>
<div className="gradient-bg-welcome">
  <Transactions />
  <Footer />
  </div>
</div>
)
}

export default Home2

