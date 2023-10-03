import { useState, useEffect } from "react";
import "./App.css";
function App() {

  const [tickets, setTickets] = useState([])
  useEffect(() => {
    async function fetchData(){
      const res = await fetch("https://kiitmunbackend.onrender.com/api/tickets")
      const data = await res.json()
      setTickets(data)
    }
    fetchData()
  }, [tickets])

//  
// fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions)
//     .then(response => response.json())
//     .then(data => this.setState({ postId: data.id }));
// }
  

const updateResolve = (id)=>{
  const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://kiitmunbackend.onrender.com/api/tickets/:id', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
}
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-center my-8">Issue form MUN</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Resolved
            </th>
            <th scope="col" className="px-6 py-3">
              Response to be sent if unresolved
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket)=>
               <tr key={ticket.id} className="bg-gray-900 border-gray-700">
               <th
                 scope="row"
                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
               >
                 {ticket.id}
               </th>
               <td className="px-6 py-4">{ticket.name}</td>
               <td className="px-6 py-4">{ticket.subject}</td>
               <td className="px-6 py-4">{ticket.status ? <>{ticket.status}</>: <>pending</>}</td>
               <td className="px-6 py-4">
                 <button
                   className="font-medium bg-blue-400 text-white rounded-md hover:underline"
                 >
                   Send email and update
                 </button>
               </td>
               <td className="px-6 py-4">
                 <input
                   type="text"
                   id="message"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="John"
                   required
                 />{" "}
                 <button onClick={updateResolve} className="bg-red-500 p-2 rounded-md text-white">
                   Send and update
                 </button>
               </td>
             </tr>
          )}
       
        </tbody>
      </table>
    </div>
  );
}

export default App;
