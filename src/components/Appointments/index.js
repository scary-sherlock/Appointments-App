import { Component } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import AppointmentItem from "../AppointmentItem";
import './index.css'

class Appointments extends Component {
    state = {
        appointmentsList: [],
        title: '',
        date: '',
        showStarred: false
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    onDateChange = (event) => {
        this.setState({ date: event.target.value })
    }

    setShowStarred = () => {
        this.setState(prevState => ({ showStarred: !prevState.showStarred }))
    }

    onAddAppointment = () => {
        const { title, date } = this.state
        const newAppointment = {
            id: uuidv4(),
            title,
            date: format(new Date(date), "dd MMM yyyy"),
            isStarred: false
        }
        this.setState(prevState => ({
            appointmentsList: [...prevState.appointmentsList, newAppointment],
            title: '',
            date: ''
        }))
    }

    toggleStarred = id => {
        const { appointmentsList } = this.state
        this.setState({
            appointmentsList: appointmentsList.map(
                appointment => appointment.id === id ? { ...appointment, isStarred: !appointment.isStarred } : appointment
            )
        })
    }

    render() {
        const { title, date, showStarred, appointmentsList } = this.state

        const filteredList = showStarred ? appointmentsList.filter(appointment => appointment.isStarred) : appointmentsList

        return (
            <div className="appointments-container">
                <div className="appointments-card">
                    <div className="input-container">
                        <h1 className="appointments-heading">Add Appointment</h1>
                        <label className="input-label" htmlFor="title">
                            TITLE
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="input-field"
                            value={title}
                            onChange={this.onTitleChange}
                        />
                        <label className="input-label" htmlFor="date">
                            DATE
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="input-field"
                            value={date}
                            onChange={this.onDateChange}
                        />
                        <button className="add-button"
                            onClick={this.onAddAppointment}>
                            Add
                        </button>
                    </div>
                    <img src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" alt="appointments" />
                </div>

                <hr />
                <div className="appointments-list-container">
                    <div className="flex">
                        <h1 className="appointments-heading">Appointments</h1>
                        <button
                            className={`starred-filter ${showStarred ? 'active' : ''}`}
                            onClick={this.setShowStarred}
                        >
                            Starred
                        </button>
                    </div>

                    <ul className="appointments-list">
                        {filteredList.map(appointment => (
                            <AppointmentItem
                                key={appointment.id}
                                appointmentDetails={appointment}
                                toggleStarred={this.toggleStarred}
                            />
                        ))}
                    </ul>

                </div>
            </div>
        )
    }
}


export default Appointments