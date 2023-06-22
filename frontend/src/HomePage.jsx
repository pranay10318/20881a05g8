import React, { useEffect, useState } from 'react';

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
  const handleonclick = (train) => {
    window.alert("you clicked the train "+train.trainName);
  }

  return (
    <div>
      <ul>
        <li className='flex justify-center text-3xl'>Here is the list of trains for you: </li>
        {data.map((item) => (
          <li key={item.trainNumber} onClick={()=>handleonclick(item)}>
            <div className='flex justify-center align-middle border-gray-300 p-2 border'>
              <p>{item.trainName}</p>
              <p>{item.trainNumber}</p>
              {/* <p>{item.departureTime}</p>
              <p>{item.seatsAvailable}</p> */}
              <p>{item.delayedBy}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;