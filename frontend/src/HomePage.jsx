import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/trains');
      console.log(response);
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ul>
        <li className='flex justify-center text-3xl'>Here is the list of trains for you: </li>
        {data.map((item) => (
          <li key={item.trainNumber}>
            <div className='flex justify-center align-middle border-gray-300 p-2 border'>
            <Link to={`/train/${item.trainNumber}`}>{item.trainName}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;