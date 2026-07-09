import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState<string>("");

  

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch("http://localhost:3000", {
        method: "GET"
      });
      const data = await response.text();
      setMessage(data);
    }

    fetchData();
  }, [])

  return (
    <>
      <div>
        {message}
      </div>
    </>
  )
}

export default App
