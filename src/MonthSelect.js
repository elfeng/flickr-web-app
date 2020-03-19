import React, { Component } from 'react';
import { TWELVE_MONTHS } from './Month.js';

export default class MonthSelect extends Component {

    constructor(props) {
        super(props);
        this.selectMonth = this.selectMonth.bind(this);
    }

    selectMonth(monthNumber) {
        const month = TWELVE_MONTHS[monthNumber.target.value - 1];
        this.props.onChange(month);
    }

    render() {
        const monthOptions = TWELVE_MONTHS.map(month =>
            <option key={month.number} value={month.number}>{month.name}</option>
        );

        return (
            <select onChange={this.selectMonth} className="form-control" required
                id="month" name="month">
                <option value="">Month</option>
                {monthOptions}
            </select>
        );
    }

};
