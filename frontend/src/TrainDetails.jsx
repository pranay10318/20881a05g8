import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function TrainDetails() {
    const { id } = useParams();
    const [trainDetails, setTrainDetails] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await fetch(`http://localhost:3000/train/${id}`);
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }
        const trainData = await response.json();
        setTrainDetails(trainData);
        } catch (error) {
        console.error('Error:', error);
        }
    };
    return (
        <div>
          <h1 className='text-center  text-3xl '>Train Details</h1>

          {trainDetails ? (
            <div className='flex justify-center '>
                <div className='w-1/2 bg-gray-200'>
                  <div className='flex flex-center justify-end	 align-center text-2xl align-bottom; gap-10 bg-slate-300 rounded p-5'>
                    <div className='w-1/2'>
                      <h3>Train Name: </h3>
                    </div>
                    <div className='w-1/2'>
                      <p>{trainDetails.trainName}</p>
                    </div>
                  </div>
                  <div className='flex flex-center justify-end	 align-center text-2xl align-bottom; gap-10 bg-slate-300 rounded p-5 '>
                    <div className='w-1/2'><h3>Train Number: </h3></div>
                    <div className='w-1/2'><p>{trainDetails.trainNumber}</p></div>
                  </div>
                  <div className='flex flex-center justify-end	 align-center text-2xl align-bottom; gap-10 bg-slate-300 rounded p-5 '>
                    <div className='w-1/2'><h3>Departure Time:</h3></div>
                    <div className='w-1/2'><p>{trainDetails.departureTime.Hours}:{trainDetails.departureTime.Minutes}</p></div>
                  </div>
                  <div className='flex flex-center justify-end	 align-center text-2xl align-bottom; gap-10 bg-slate-300 rounded p-5 '>
                    <div className='w-1/2'><h3>Seats Available:</h3></div> 
                    <div className='w-1/2'><p>Sleeper: {trainDetails.seatsAvailable.sleeper}</p>
                    <p>AC: {trainDetails.seatsAvailable.AC}</p></div>
                  </div>
                  <div className='flex flex-center justify-end	 align-center text-2xl align-bottom; gap-10 bg-slate-300 rounded p-5 '>
                    <div className='w-1/2'><h3>Price:</h3></div> 
                    <div className='w-1/2'>
                      <p>Sleeper: {trainDetails.price.sleeper}</p>
                    <p>AC: {trainDetails.price.AC}</p></div>
                  </div>
                  <div className='flex flex-center align-center text-2xl align-bottom text-red-500 bg-slate-300 rounded p-5 '>
                    <div className='w-1/2'> <h3>Delayed By</h3></div>
                    <div className='w-1/2'><p>{trainDetails.delayedBy+" minutes"}</p></div>
                  </div>
                </div>
            </div>
            
          ) : (
            <p>Loading train details...</p>
          )}
        </div>
      );
}
export default TrainDetails;
