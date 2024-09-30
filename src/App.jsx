import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Left from './components/Left';
import Mid from './components/Mid';
import Profile from './components/Profile';


function App() {

  // const [profileClick, setProfileClick] = useState(false);


  return (



    <>
      {/* Main body */}
      <div className='bg-slate-950 text-white h-fit flex justify-center pt-5 '>

        <div className='

        bg-slate-950 text-white 
        h-screen grid grid-cols-[minmax(0,800px)]
         md:grid-cols-[50px_minmax(0,_800px)]
         '>
          
          <div className='hidden md:flex'>
            <Left/>
          </div>



          <div className='overflow-auto overflow-y-scroll no-scrollbar min-w-[100px] border-l border-r border-gray-700'>

            <Routes>

              <Route path='/' element={<Mid/>} />

              <Route path="/profile" element={<Profile />} />
           

             

            </Routes>



          </div>

  
        </div>
        
      </div>
    </>
  );
}

export default App;
