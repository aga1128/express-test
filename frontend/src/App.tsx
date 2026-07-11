import { useEffect, useState } from 'react'

type User = {
  id: number,
  username: string,
  password: string,
  email: string,
  created_at: string;
}

function App() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET"
      });
      const data: User[] = await response.json();
      setUsers(data);
    }

    fetchData();
  }, [])

  return (
    <>
      <div>
        {users && (
          users.map((user: User) => (
            <div key={user.id}>
              <div>{user.id}</div>
              <div>{user.username}</div>
              <div>{user.password}</div>
              <div>{user.email}</div>
              <div>{user.created_at}</div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App
