import { TWELVE_MONTHS } from './Month.js';

test("getMaxDateAsSeconds for december 2015 should be equal to january 1st 2016 time", () => {

    const december2015 = TWELVE_MONTHS[11];
    const january1st2016 = 1451635200; // currentmillis.com

    expect(december2015.getMaxDateAsSeconds(2015)).toEqual(january1st2016);
});

test("getMinDateAsSeconds for february 2015 should be equal to getMaxDateAsSeconds for january 2015", () => {

    const january2015 = TWELVE_MONTHS[0];
    const february2015 = TWELVE_MONTHS[1];

    expect(february2015.getMinDateAsSeconds(2015)).toEqual(january2015.getMaxDateAsSeconds(2015));
});
