import React from 'react';
import { format } from 'date-fns';
import './index.css';

const AppointmentItem = props => {
    const { appointmentDetails, toggleStarred } = props;
    const { id, title, date, isStarred } = appointmentDetails;
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE');
    const starImgUrl = isStarred
        ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png';

    return (
        <li className="appointment-item">
            <div className="appointment-details">
                <p className="appointment-title">{title}</p>
                <p className="appointment-date">{formattedDate}</p>
            </div>
            <button
                className="star-button"
                onClick={() => toggleStarred(id)}
                data-testid="star"
            >
                <img src={starImgUrl} alt="star" />
            </button>
        </li>
    );
};

export default AppointmentItem;
