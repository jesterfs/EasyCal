import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './loginnav.css'

export default class LoginNav extends React.Component {
    render() {
        return(
            <div className='LoginNav, group'>
                    <div className='item'>
                        
                    </div>
                    
                    <div className='item'>
                        <h1>EasyCal</h1>
                    </div>
                    <div className='item'>
                        <Link to='/signup'> <button>Sign Up</button> </Link>
                        
                    </div>
            </div>
        )
        
    }
}