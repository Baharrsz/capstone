import React, { Component } from "react";
import axios from "axios";

import PlanningTitle from "./PlanningTitle";
import EditEvents from "./EditEvents";

export default class PlanningPage extends Component {
  constructor(props) {
    super(props);
  }
  state = { main: undefined, ancestors: undefined, descendants: undefined };

  render() {
    return !this.state.main ? (
      <>Loading...</>
    ) : (
      <div className="planning">
        <PlanningTitle
          className="planning__title"
          params={this.props.match.params}
        />
        <button className="planning__btn">Save</button>

        <EditEvents savedPlans={this.state} deleteEvents={this.deleteEvents} />
        {this.props.goals}
        {this.props.schedule}
      </div>
    );
  }

  componentDidMount() {
    //Cutting "/plan" from the end of the url
    let url = this.props.match.url.slice(0, -5);
    url = `http://localhost:5000${url}`;
    axios.get(url).then(response => {
      if (response.data) {
      }
      const {
        Days,
        Week,
        Weeks,
        Month,
        Months,
        Year,
        events,
        goals,
        schedule
      } = response.data || {};
      const main = { events, goals, schedule };
      const ancestors = { Year, Month, Week };
      const descendants = { Months, Weeks, Days };
      this.setState({ main, ancestors, descendants });
    });
  }

  //This will be called in MainEvents to delete events previosly added to the database
  deleteEvents = deleteEvent => {
    deleteEvent.preventDefault();
    const eventsToKeep = {};
    const events = this.state.main.events;
    for (let key in events) {
      if (events[key].id !== deleteEvent.target.id)
        eventsToKeep[key] = events[key];
    }
    this.setState({ main: { ...this.state.main, events: eventsToKeep } });
  };
}
