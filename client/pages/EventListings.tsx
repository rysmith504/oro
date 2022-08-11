import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EventCards from '../components/EventCards'
const EventListings: React.FC = () => {

  const [events, setEvents] = useState([]);

  // BELOW FUNCTION TO BE USED TO REMOVE PUNCTUATION FROM SEARCH QUERY
  // const punctuationless = req.query.keyword
  // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
  // .replace(/\s{1,}/g, "+")
  // .toLowerCase();

  //EVENT LISTING URL
  // https://www.ticketmaster.com/event/${event id number here}

  const [ keyword, setKeyword ] = useState(`jane's addiction`);
  // console.log(keyword)
  useEffect(() => {
    const punctuationless: string = keyword
      .replace(/[']/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
      .replace(/\s{1,}/g, "+")
      .toLowerCase();
    axios.get('/events/list', { params: { keyword: punctuationless } })
      .then((responseObj) => console.log(responseObj))
      .catch(err => console.error(err))
  }, []);

  return (
    <div>
      <div>Hello EventListings</div>
      <input placeholder='enter keywords here (e.g. artist, event, venue, city, state, date...'></input>
      <div>
        <EventCards />
      </div>
    </div>
  );
};

export default EventListings;
