import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Picker from "./MonthCalendar Subcomponents/Picker";
import MonthTable from "./MonthCalendar Subcomponents/MonthTable";

var delayed;
export default class MonthCalendar extends Component {
  state = {
    monthToShow: new Date().getMonth(),
    yearToShow: new Date().getFullYear()
  };
  render() {
    const dateToShow = new Date(this.state.yearToShow, this.state.monthToShow);
    return (
      <div className="monthcal">
        <button className="monthcal__btn planBtn">
          <Link
            to={`${this.state.yearToShow}/${this.state.monthToShow + 1}/plan`}
            className="monthcal__planLink planLink"
          >
            Plan it!
          </Link>
        </button>
        <section className="monthcal__header calendar__header">
          <button
            className="monthcal__header-btn jumpBtn"
            value={-1}
            onClick={this.jumpToMonth}
          >
            ◀
          </button>
          <h1 className="monthcal__header-title">
            {format(dateToShow, "MMMM y")}
          </h1>
          <button
            className="monthcal__header-btn jumpBtn"
            value={1}
            onClick={this.jumpToMonth}
          >
            ▶
          </button>
        </section>

        <MonthTable className="monthcal__table" month={dateToShow} />
        <Picker
          className="monthcal__picker"
          pickMonth={this.pickMonth}
          pickYear={this.pickYear}
        />
      </div>
    );
  }

  pickMonth = selectedMonth => {
    this.setState({ monthToShow: selectedMonth.value });
  };

  pickYear = typed => {
    let yearToShow = typed.target.value;
    clearTimeout(delayed);
    delayed = setTimeout(() => {
      this.setState({ yearToShow: yearToShow });
    }, 1000);
  };

  jumpToMonth = click => {
    click.preventDefault();
    let monthToShow = this.state.monthToShow + Number(click.target.value);
    if (monthToShow >= 12) {
      monthToShow = monthToShow - 12;
      this.setState({ yearToShow: this.state.yearToShow + 1 });
    }
    if (monthToShow < 0) {
      monthToShow = monthToShow + 12;
      this.setState({ yearToShow: this.state.yearToShow - 1 });
    }
    this.setState({ monthToShow: monthToShow });
  };
}
