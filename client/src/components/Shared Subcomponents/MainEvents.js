import React, { Component } from "react";
import TimePicker from "react-time-picker";
import uuid from "uuid";

var delayed;
export default class MainEvents extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    //The list of events previously added to the database
    const eventsKeys = Object.keys(this.props.mainEvents);
    const eventsList = eventsKeys.map(key => {
      const event = this.props.mainEvents[key];
      return (
        <form className="planning__main-event" key={uuid()} id={key}>
          <label className="planning__main-event-label">event</label>
          <input
            className="planning__main-event-value"
            name="event"
            defaultValue={event.event}
          />

          <label className="planning__main-event-label">starts</label>
          <input
            className="planning__main-event-value"
            name="starts"
            defaultValue={event.starts}
          />

          <label className="planning__main-event-label">ends</label>
          <input
            className="planning__main-event-value"
            name="ends"
            defaultValue={event.ends}
          />

          <label className="planning__main-event-label">location</label>
          <input
            className="planning__main-event-value"
            name="location"
            defaultValue={event.location}
          />

          <button
            className="planning__main-event-btn planning__main-event-btn--delete planning__btn--delete"
            type="button"
            form={key}
            onClick={this.props.deleteEvent}
          >
            Delete
          </button>
        </form>
      );
    });

    return (
      <div className="planning__main--events planning__main">
        {eventsList}
        <form
          className="planning__main-event planning__main-event--new"
          key={uuid()}
          onSubmit={this.props.addNewEvent}
        >
          <label className="planning__main-event-label">starts</label>
          <TimePicker
            className="planning__main-event-value"
            value={this.state.startTime}
            name="starts"
            onChange={this.changeStart}
            required
          />

          <label className="planning__main-event-label">ends</label>
          <div className="planning__main-event-value">
            <TimePicker
              className="planning__main-events-value"
              value={this.state.endTime}
              clockIcon={null}
              name="ends"
              onChange={this.changeEnd}
              required
            />
          </div>

          <label className="planning__main-event-label">event</label>
          <input className="planning__main-event-value" name="event" required />

          <label className="planning__main-event-label">location</label>
          <input
            className="planning__main-event-value"
            name="location"
            defaultValue=""
          />

          <button className="planning__main-event-btn planning__btn--add">
            Add
          </button>
        </form>
      </div>
    );
  }

  changeStart = startTime => {
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      //   const parts = startTime.split(":");
      //   const endTime = `${Number(parts[0]) + 1}:${parts[1]}`;
      this.setState({ startTime });
    }, 500);
  };

  changeEnd = endTime => {
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      this.setState({ endTime });
    }, 500);
  };
}
