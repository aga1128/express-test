import { useQuery } from '@tanstack/react-query';

type User = {
  id: number,
  username: string,
  password: string,
  email: string,
  created_at: string;
}

const User = () => {
  const { data, status, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async() => {
      const response = await fetch("http://localhost:3000/users")
      if(!response.ok){
        throw new Error('Failed to fetch')
      } 
      const data: User[] = await response.json();
      return data
    }
  })
console.log(status);
console.log(data);
  return (
    <>
      <div>
        {status === "pending" ? (
          <div>読み込み中...</div>
        ): (
          data && (
            data.map((user: User) => (
              <div key={user.id}>
                <div>{user.id}</div>
                <div>{user.username}</div>
                <div>{user.password}</div>
                <div>{user.email}</div>
                <div>{user.created_at}</div>
              </div>
            ))
          )
        )}

      </div>
    </>
  )
}

export default User
