import React from 'react';
import moment from 'moment';
import { ReactComponent as Event} from "../assets/icons/eventicon.svg";

function EventCard({event}) {
  return (
    <div className="event">
    <Event height="100" width="100" />
    <div className="event-data">
    <div className="event-title">{event.title}</div>
    <div className="event-date">
    {moment(event.date).format("MMM Do YYYY")}
    </div>
      
    </div>
    {/* <div className='event-note'>{event.notes}</div> */}
  </div>
  );
}

export default EventCard;
