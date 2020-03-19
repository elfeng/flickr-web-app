import React, { Component } from 'react';

export function getCurrentYear() {
    return new Date().getFullYear();
}

export class YearSelect extends Component {

    constructor(props) {
        super(props);
        this.selectYear = this.selectYear.bind(this);
    }

    selectYear(yearNumber) {
        this.props.onChange(yearNumber.target.value);
    }

    render() {

        const yearOptions = [];
        const currentYear = getCurrentYear();
        for (let year = currentYear; year >= 2000; year--) {
            yearOptions.push(<option key={year} value={year}>{year}</option>);
        }

        return (
            <select onChange={this.selectYear} className="form-control" required
                id="year">
                <option value="">Year</option>
                {yearOptions}
            </select>
        );
    }
}; 
