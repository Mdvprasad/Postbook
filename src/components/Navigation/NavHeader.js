import React from 'react'
import { Link } from 'react-router-dom';
import './navBar.css';

function NavHeader() {
    return (
        <div className='root'>
            <Link className='link' to={'/'} >Home</Link>
            <Link className='link' to={'/posts'} >Posts</Link>
            <Link className='link' to={'/todos'} >Todos</Link>
        </div>
    )
}

export default NavHeader