import { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  const [tickets, setTickets] = useState([]);
  const [load, setLoad] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoad(true);
      const res = await fetch(
        "https://kiitmunbackend.onrender.com/api/tickets"
      );
      const data = await res.json();
      setLoad(false);
      setTickets(data);
    }
    fetchData()
  }, []);

  const updateResolve = async (id, name, subject) => {
    const secret = window.prompt("Enter secret key", "");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "resolved", name, subject, authCode: secret }),
    };
    setLoad(true);
    const updateFetch = await fetch(
      `https://kiitmunbackend.onrender.com/api/tickets/${id}`,
      requestOptions
    );

    const data = await updateFetch.json();
    const newTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: data.status } : ticket
    );
    setLoad(false);
    setTickets(newTickets);
    return console.log(data);
  };

  const updateUnResolved = async(id,data, name, subject)=>{
    const secret = window.prompt("Enter secret key", "");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "unresolved", name, subject, authCode: secret, replyMessage: input}),
    };
    console.log(secret);
    setLoad(true);
    const updateFetch = await fetch(
      `https://kiitmunbackend.onrender.com/api/tickets/${id}`,
      requestOptions
    );

    const putdata = await updateFetch.json();
    const newTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: putdata.status } : ticket
    );
    setLoad(false);
    setTickets(newTickets);
    return console.log(data);
  }

  if(!tickets || tickets.length === 0){
    console.log(tickets);
    return <>Site is loading :p</>
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Toaster position="bottom-center" reverseOrder={true} />
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
              Resolve button
            </th>
            <th scope="col" className="px-6 py-3">
              Response, if unresolved
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket) => (
            <tr key={ticket.id} className="bg-gray-900 border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {ticket.id}
              </th>
              <td className="px-6 py-4">{ticket.name}</td>
              <td className="px-6 py-4">{ticket.subject}</td>
              <td className="px-6 py-4">
                {ticket.status ? <>{ticket.status}</> : <>pending</>}
              </td>
              <td className="px-6 py-4">
                {load ? (
                  <></>
                ) : ticket.status === "resolved" ? (
                  <></>
                ) : ticket.status === "unresolved" ? (
                  <></>
                ) : (
                  <button
                    className="font-medium bg-blue-400 text-white rounded-md hover:underline"
                    onClick={() => updateResolve(ticket.id, ticket.name, ticket.subject)}
                  >
                    Send email and update
                  </button>
                )}
              </td>
              <td className="px-6 py-4">
                {load ? (
                  <></>
                ) : (
                  <div>
                    {ticket.status === "resolved" ? (
                      <></>
                    ) : ticket.status === "unresolved" ? (
                      <></>
                    ) : (
                      <form onSubmit={(e)=>{
                        e.preventDefault()
                        updateUnResolved(ticket.id, input, ticket.name, ticket.subject)
                        }}>
                        <input
                          type="text"
                          id="message"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John"
                          required
                          onChange={(e)=>setInput(e.target.value)}
                        />
                        <button type="submit" className="bg-red-500 p-2 rounded-md text-white">
                          Send and update
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
