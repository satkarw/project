import React from 'react';
import Left from './components/Left';
import Mid from './components/Mid';

function App() {
  return (



    <>
      {/* Main body */}
      <div className='bg-slate-950 text-white h-fit flex justify-center pt-5 '>

        <div className='

        bg-slate-950 text-white 
        h-screen grid grid-cols-[50px_minmax(0,800px)]
         md:grid-cols-[100px_minmax(0,_800px)]
         '>
          
          <div className='md:pr-4 '>
            <Left />
          </div>

          <div className='overflow-auto overflow-y-scroll no-scrollbar min-w-[100px] border-l border-r border-gray-700 '>
            <Mid />
          </div>

         

        </div>
        
      </div>
    </>
  );
}

export default App;
