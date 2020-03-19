export class Month {

    /**
     * number : 1-12
     */
    constructor(number, name){
        this.number = number;
        this.name = name;
    }

    getMinDateAsSeconds(year){
        return new Date(year, this.number - 1, 1).getTime() / 1000;
    }

    getMaxDateAsSeconds(year){
         return new Date(year, this.number, 1).getTime() / 1000;
    }

    isNotAfterCurrentMonth(){
        return this.number <= new Date().getMonth() + 1;
    }
};

export const TWELVE_MONTHS = [
    new Month(1, "January"),
    new Month(2, "February"),
    new Month(3, "March"),
    new Month(4, "April"),
    new Month(5, "May"),
    new Month(6, "June"),
    new Month(7, "July"),
    new Month(8, "August"),
    new Month(9, "September"),
    new Month(10, "October"),
    new Month(11, "November"),
    new Month(12, "December")
];
