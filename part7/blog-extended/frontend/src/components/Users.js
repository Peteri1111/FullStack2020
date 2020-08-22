import React from 'react'
import { useDispatch, useSelector } from 'react-redux'



const Users = () => {

  const dispatch = useDispatch()

  const users = useSelector(state => state.users.users)

  return (
    <>
      <h2>Users</h2>
      <div className="table">
        <div className="table-row">

          <b>
            <div className="table-col">Username</div>
            <div className="table-col">Blogs created</div>
          </b>
        </div>


        {users.map(user =>
          <div key={user.id}>
            <div className="table-col">{user.username}</div>
            <div className="table-col">{user.blogs.length}</div>
          </div>
        )
        }


      </div>
    </>
  )
}

export default Users