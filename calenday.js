//---------------------
// MAIN                \
////////////////////////
function calenday(format, id, date) {
    if (date === void 0) { date = today(); }
    // Check the inputs passed arguments
    if (formats.indexOf(format) == -1) {
        return 1;
    }
    if (typeof date != 'string' || date.length != 10) {
        return 2;
    }
    if (typeof id != 'string') {
        return 3;
    }
    //Select the wrapper from the HTML
    var wrapper = document.getElementById(id);
    // Create a JS date and set to GMT x
    var d = new Date(date + " GMT" + timeDiff);
    console.log(today());
    // Gets the required elements for following loop 
    var firstDstr = getFirstDay(d, format);
    var lastDstr = getLastDay(d, format);
    var currentD = new Date(firstDstr);
    wrapper.append(getMonthDiv(d.getMonth()));
    wrapper.append(getLabels());
    // Create a div for each day
    do {
        var w = crtDiv();
        w.classList.add('cl_week');
        for (var i = 0; i < 7; i++) {
            var singleWeek = (format === 'week') ? true : false;
            var fillUp = currentD.getMonth() === d.getMonth() ? false : true;
            var weekend = currentD.getDay() == 0 || currentD.getDay() == 6 ? true : false;
            var div = getDayDiv(currentD.getDate(), singleWeek, fillUp, weekend);
            w.append(div);
            currentD.setDate(currentD.getDate() + 1);
        }
        wrapper.append(w);
    } while (currentD <= new Date(lastDstr));
    return 0;
}
//---------------------------------------
// 2 - LIBRARY
//---------------------------------------
// 2.1 - Variables and const
//-----------------------------
var timeDiff = '00:00';
var formats = ['week', 'month'];
var labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'];
//-----------------------------
// 2.2 - Shorthands
//-----------------------------
var crtDiv = function () { return document.createElement('div'); };
var dateTS = function (date) {
    var month = date.getMonth() + 1;
    var dateTS = month + "/" + date.getDate().toString() + "/" + date.getFullYear().toString() + " GMT" + timeDiff;
    return dateTS;
};
var today = function () {
    var date = new Date();
    var tmp = dateTS(date);
    return tmp.slice(0, -8);
};
//-----------------------------
// 2.3 - Funtions
//-----------------------------
// Create the labels from the array of labels
function getLabels() {
    var ls = crtDiv();
    ls.classList.add('cl_labels');
    labels.forEach(function (label) {
        var l = crtDiv();
        l.classList.add('cl_label');
        l.textContent = label;
        ls.append(l);
    });
    return ls;
}
// Create the div from th current month
function getMonthDiv(month) {
    var m = crtDiv();
    m.classList.add('cl_month');
    m.textContent = months[month];
    return m;
}
// Create a the div from one day
function getDayDiv(day, singleWeek, fillUp, weekend) {
    var d = crtDiv();
    var t = crtDiv();
    var c = crtDiv();
    d.classList.add('cl_day');
    t.classList.add('cl_day-header');
    c.classList.add('cl_day-content');
    // Special classes 
    if (fillUp)
        d.classList.add('cl_day__dif');
    if (weekend)
        d.classList.add('cl_day__weekend');
    t.textContent = day.toString();
    if (singleWeek) { // Generates the different hours
        var hours = [8, 17];
        for (var i = hours[0]; i < hours[2]; i++) {
            var h = crtDiv();
            h.classList.add('cl_hour');
            c.append(h);
        }
    }
    d.append(t, c);
    return d;
}
// Calculate the first day of the first week from the current month if format == 'month' otherwise the first day of the week
function getFirstDay(date, format) {
    var tmp = date;
    if (format === 'month') {
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        tmp = firstDay;
    }
    var diff = tmp.getDate() - tmp.getDay() + (tmp.getDay() === 0 ? -6 : 1);
    var result = new Date(dateTS(date));
    result.setDate(diff);
    return dateTS(result);
}
// Calculate the last day of the last week from the current month if format == 'month' otherwise the last day of the week
function getLastDay(date, format) {
    var tmp = date;
    if (format === 'month') {
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        tmp = new Date(dateTS(lastDay));
    }
    var result = new Date(getFirstDay(tmp, 'week'));
    result.setDate(result.getDate() + 6);
    return dateTS(result);
}
