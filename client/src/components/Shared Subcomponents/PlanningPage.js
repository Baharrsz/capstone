import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";

import PlanningTitle from "./PlanningTitle";
import EditEvents from "./EditEvents";
import EditGoals from "./EditGoals";
import PlanningSection from "./PlanningSection";
import ShowAncestors from "./ShowAncestors";
import ShowAncestorGoals from "./ShowAncestorGoals";
import ShowDescendants from "./ShowDescendants";
import ShowDescendantGoals from "./ShowDescendantGoals";
import MainEvents from "./MainEvents";

export default class PlanningPage extends Component {
  constructor(props) {
    super(props);
    this.url = `http://localhost:5000${this.props.match.url.slice(0, -5)}`;
  }
  state = {
    main: undefined,
    ancestors: undefined,
    descendants: undefined
  };

  render() {
    return !this.state.main ? (
      <>Loading...</>
    ) : (
      <div className="planning">
        <PlanningTitle
          className="planning__title"
          params={this.props.match.params}
        />
        <button
          className="planning__btn"
          type="button"
          onClick={this.sendToDatabase}
        >
          Save
        </button>

        {/* Edit Section */}
        {/* <EditEvents
          savedPlans={this.state}
          deleteEvents={this.deleteEvents}
          addNewEvent={this.addNewEvent}
        /> */}
        <PlanningSection
          sectionTitle="Events"
          className="planning__events"
          ancestorsController={
            <ShowAncestors ancestors={this.state.ancestors} section="events" />
          }
          mainController={
            <MainEvents
              main={this.state.main}
              deleteEvents={this.deleteEvents}
              addNewEvent={this.addNewEvent}
            />
          }
          descendantsController={
            <ShowDescendants
              descendants={this.state.descendants}
              section="events"
            />
          }
        />
        {/* Goals section */}
        {/* <EditGoals savedPlans={this.state} /> */}
        <PlanningSection
          sectionTitle="Goals"
          className="planning__goals"
          ancestorsController={
            <ShowAncestorGoals
              ancestors={this.state.ancestors}
              section="goals"
            />
          }
          descendantsController={
            <ShowDescendantGoals
              descendants={this.state.descendants}
              section="goals"
            />
          }
        />
        {this.props.schedule}
      </div>
    );
  }

  componentDidMount() {
    //Cutting "/plan" from the end of the url
    axios.get(this.url).then(response => {
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

  //This will send the information that is displayed on the page to the server after clicking the "Save" button
  sendToDatabase = saveEvent => {
    // saveEvent.preventDefault();
    axios.post(this.url, this.state.main);
  };

  //This will be called in MainEvents to delete events previosly added to the database
  deleteEvents = deleteEvent => {
    deleteEvent.preventDefault();
    const eventsToKeep = {};
    const events = this.state.main.events;
    for (let key in events) {
      if (key !== deleteEvent.target.id) eventsToKeep[key] = events[key];
    }
    this.setState({
      main: { ...this.state.main, events: eventsToKeep }
    });
  };

  //This will be called in MainEvents to add new events
  addNewEvent = submit => {
    submit.preventDefault();
    const eventId = `${submit.target.startsAt.value}-${uuid()}`;
    let newEvent = {};
    newEvent[eventId] = {
      event: submit.target.event.value,
      starts: submit.target.startsAt.value,
      end: submit.target.endsAt.value,
      location: submit.target.location.value
    };
    this.setState({
      main: {
        ...this.state.main,
        events: { ...this.state.main.events, ...newEvent }
      }
    });
  };
}
