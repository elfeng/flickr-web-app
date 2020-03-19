import React, {Component} from 'react';
import './App.css';
import MonthSelect from './MonthSelect';
import { YearSelect, getCurrentYear } from './YearSelect/YearSelect';
import PhotoListContainer from './PhotoListContainer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.searchPhotos = this.searchPhotos.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
  }

  onInputChange(search) {
    this.search = search.target.value;
  }

  onMonthChange(month) {
    this.month = month;
  }

  onYearChange(year) {
    this.year = year;
  }

  isDateSelectedAndNotInTheFuture() {
    return this.month && this.year &&
      (this.year < getCurrentYear() || this.month.isNotAfterCurrentMonth());
  }

  searchPhotos(event) {
    event.preventDefault();
    if (this.search && this.year && this.month) {
      this.setState({
        search: this.search,
        month: this.month,
        year: this.year
      });
    }
  }

  render() {

    const currentMillis = Date.now();
    let searchResults = null;
    if (this.state.search && this.isDateSelectedAndNotInTheFuture()) {
      searchResults = <PhotoListContainer key={currentMillis} search={this.state.search} month={this.state.month} year={this.state.year}/>;
    }

    return (
      <div className="App">

        <form onSubmit={this.searchPhotos}>
          <div className="container-fluid App-header">

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 ">
                <h1>FlickrPicPicker:&nbsp;</h1>
                <h2>NASA Gallery Search by Month and Year</h2>
              </div>
            </div>

            <div className="row App-form" >
              <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-3 col-lg-offset-2 col-lg-3 ">
                <input type="text" onChange={this.onInputChange}
                  id="picalendr-search" name="picalendr-search"
                  className="form-control"
                  placeholder="Place, object or event"
                  autoFocus
                  required />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                <MonthSelect onChange={this.onMonthChange} />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                <YearSelect onChange={this.onYearChange}/>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                <input type="submit" className="btn btn-default" value="Search"/>
              </div>
            </div>
          </div>
        </form>

        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-5 col-md-offset-1 col-lg-5 App-photos">
              {searchResults}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 App-intro">
              <h2>Welcome to FlickrPicPicker!</h2>
              <p>
                FlickrPicPicker is a search engine that allows you to search photographs by month, year and keyword, specifically from NASA's account.
                All the photos come from Flickr and are searchable as long as they exist under NASA's account at the time of search.
              </p>
              <h2>How does it work?</h2>
              <p>
                Pick a month and year you would like to retrieve NASA photos from. You can also enter a keyword, so that only photos whose title, description or tags contain the text will be returned.
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
