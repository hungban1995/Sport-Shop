import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/table'
import './users.scss'
function Users() {
    return (
        <div className='users'>
            <div className="listTitle">
                <span>Danh sách tài khoản:</span>
                <Link to='new' >Thêm mới</Link>
            </div>
            <Table />
        </div>
    )
}

export default Users