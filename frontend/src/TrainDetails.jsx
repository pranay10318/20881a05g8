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
          <h1>Train Details</h1>
          {trainDetails ? (
            <div>
              <div className='flex justify-center align-center'>
                <h2>Train Name: {trainDetails.trainName} {"  "}</h2>
                <p>Train Number: {trainDetails.trainNumber}</p>
              </div>
              <div className='flex justify-center align-center'>
                <h3 className='text-xl'>Departure Time</h3>
                <p>{trainDetails.departureTime.Hours}:{trainDetails.departureTime.Minutes}</p>
              </div>
              <div className='flex justify-center align-center'>
                <h3 className='text-xl'>Seats Available</h3>
                <p>Sleeper: {trainDetails.seatsAvailable.sleeper}</p>
                <p>AC: {trainDetails.seatsAvailable.AC}</p>
              </div>
              <div className='flex justify-center align-center'>
                <h3 className='text-xl'>Price</h3>
                <p>Sleeper: {trainDetails.price.sleeper}</p>
                <p>AC: {trainDetails.price.AC}</p>
              </div>
              <div className='flex justify-center align-center'>
                <h3 className='text-xl'>Delayed By</h3>
                <p>{trainDetails.delayedBy} minutes</p>
              </div>
            </div>
          ) : (
            <p>Loading train details...</p>
          )}
        </div>
      );
}
export default TrainDetails;
