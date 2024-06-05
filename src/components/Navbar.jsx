import React from 'react' 

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-800 text-white py-3 '>
        <div className="logo">
            <span className="font-bold text-xl mx-9">PlanWork</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all duration-400'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-400'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
