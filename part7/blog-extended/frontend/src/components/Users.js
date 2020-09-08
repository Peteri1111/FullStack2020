import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'






const UserRow = ({ user }) => (

  <div className="table-row">
    <Link to={`/users/${user.id}`}>
      <div className="table-col">
        {user.username}
      </div>
    </Link>
    <div className="table-col">{user.blogs.length}</div>
  </div>
)



const Users = () => {
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
        {users
          ?

          users.map(user =>
            <UserRow key={user.id} user={user} />
          )
          :
          null}
      </div>


    </>
  )
}

export default Users