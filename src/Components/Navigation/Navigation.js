import React from 'react';

const Navigation=({onRouteChange,route})=>{
      return((route==='home')
        ? 
        <div>          
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('signin')} >Sign Out</p>
        </nav>
        </div>
        
        :<div>
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
        <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('signin')} >SignIn</p>
        <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('register')} >Register</p>
        </nav>
        </div>
          
   );
}
export default Navigation;