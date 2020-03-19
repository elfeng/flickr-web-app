import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import { getSearchUrl, getPhotoSnapshotUrl } from './FlickrURLs.js';
import { TWELVE_MONTHS } from './Month.js';
import renderer from 'react-test-renderer';
import MonthSelect from './MonthSelect';
import PhotoContainer from './PhotoContainer';
//import ReactTestUtils from 'react-addons-test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import PhotoList from './PhotoList';
import PhotoListContainer from './PhotoListContainer';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotoListContainer month={TWELVE_MONTHS[0]} year={2017}/>, div);
});

describe("searchFlickr", () => {

  const march = TWELVE_MONTHS[2];
  let component = new PhotoListContainer();

  // it("should get photos for Tokyo in march 2014", () => {
  //   return component.searchFlickr("Tokyo", march, 2014).then((searchResponse) => {
  //     expect(searchResponse.data.photos.photo.length).not.toBe(0);
  //   });
  // })

  it("should not get photos for an unknown place", () => {
    return component.searchFlickr("X1e9T5C5P1f", march, 2014).then((searchResponse) => {
      expect(searchResponse.data.photos.photo.length).toBe(0);
    });
  })

});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotoContainer />, div);
});

describe("getPhotoDetailsFromFlickr", () => {

  let component = new PhotoContainer();

  it("should get the photo details given an existing id", () => {
    return component.getPhotoDetailsFromFlickr("25277702294").then((photoWrapper) => {
      expect(photoWrapper.isDateTakenKnown()).toBe(true);
    });
  })

  it("should not get the photo details given an unknown id", () => {
    return component.getPhotoDetailsFromFlickr("-1").then((photoWrapper) => {
      expect(photoWrapper.photo).toBe(undefined);
    });
  })

});

test('should match the snapshot', () => {
  const component = renderer.create(<MonthSelect />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('getSearchUrl should have dates', () => {
    const january = TWELVE_MONTHS[0];
    const january1st2016Seconds = 1451635200; // currentmillis.com
    const february1st2016Seconds = 1454313600; // currentmillis.com

    const searchUrl = getSearchUrl(" ", january, 2016);

    expect(searchUrl).not.toContain("undefined");
    expect(searchUrl).toContain(january1st2016Seconds);
    expect(searchUrl).toContain(february1st2016Seconds);
});

test('getPhotoSnapshotUrl', () => {
    let photoInfo = {
        farm: 1,
        server: 2,
        id: 3,
        secret: "secret4"
    };
    expect(getPhotoSnapshotUrl(photoInfo)).toBe("https://farm1.staticflickr.com/2/3_secret4.jpg");
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
