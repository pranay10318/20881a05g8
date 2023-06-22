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
      const orderedTrains = (responseData) => {
        //departure time; tickets; price
        const sortDep = responseData.sort((a, b) => {
          
          const departureA = parseInt(a.departureTime.Hours)*60+parseInt(a.departureTime.Minutes);
          const departureB = parseInt(b.departureTime.Hours)*60+parseInt(b.departureTime.Minutes);
          return departureB-departureA;
        });
        // const sortTicket = sortDep.sort((a, b) => {
        //   return parseInt(b.seatsAvailable.sleeper) - parseInt(a.seatsAvailable.sleeper);
        // });
        // const sortPrice = sortTicket.sort((a, b) => {
        //   return parseInt(b.price.sleeper) - parseInt(a.price.sleeper);
        // });
        return sortDep;
      }
      const sortedData = orderedTrains(responseData);
      setData(sortedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <p className='justify-center text-3xl'>Here is the list of trains for you: </p>
      <ul className='flex flex-wrap justify-between'>
        {data.map((item) => (
          <li key={item.trainNumber} className='flex  w-1/2'>
            <div className='flex w-full justify-center align-middle  bg-slate-300 rounded py-6 m-2'>
              <Link to={`/train/${item.trainNumber}`}>
                    <div className='flex flex-center justify-end	 align-center text-2xl align-bottom; gap-10'>
                      <div className='w-1/2'>
                        <p>{item.trainName}</p>
                      </div>
                      <div className='w-1/2'>
                        <h3>DepartureTime: </h3>
                        <p>{item.departureTime.Hours}:{item.departureTime.Minutes}</p>
                      </div>
                    </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;