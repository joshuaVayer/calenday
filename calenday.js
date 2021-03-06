//---------------------
// MAIN                \
////////////////////////
function calenday(format, id, date) {
    if (date === void 0) { date = today(); }
    // Check the inputs passed arguments
    if (formats.indexOf(format) == -1) {
        return 1;
    }
    if (typeof date != 'string' || date.length > 10) {
        return 2;
    }
    if (typeof id != 'string') {
        return 3;
    }
    //Select the wrapper from the HTML
    var wrapper = document.getElementById(id);
    // Create a JS date and set to GMT x
    var d = new Date(date + " GMT" + timeDiff);
    // Gets the required elements for following loop 
    var firstDstr = getFirstDay(d, format);
    var lastDstr = getLastDay(d, format);
    var currentD = new Date(firstDstr);
    wrapper.append(getMonthDiv(d.getMonth()));
    wrapper.append(getLabels(format));
    // Create a div for each day
    do {
        var w = crtDiv();
        w.classList.add('cl_week');
        if (format === 'week') {
            w.append(getHoursLabels(hours[0], hours[1]));
        }
        for (var i = 0; i < 7; i++) {
            var singleWeek = (format === 'week') ? true : false;
            var fillUp = currentD.getMonth() === d.getMonth() ? false : true;
            var weekend = currentD.getDay() == 0 || currentD.getDay() == 6 ? true : false;
            var div = getDayDiv(currentD, singleWeek, fillUp, weekend);
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
var hours = [8, 17];
var formats = ['week', 'month'];
var labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'];
//-----------------------------
// 2.2 - Shorthands
//-----------------------------
var crtDiv = function () { return document.createElement('div'); };
var dateTS = function (date, gmt) {
    if (gmt === void 0) { gmt = true; }
    var month = date.getMonth() + 1;
    var dateTS = month + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
    if (gmt)
        dateTS += " GMT" + timeDiff;
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
function getLabels(format) {
    var ls = crtDiv();
    ls.classList.add('cl_labels');
    if (format == 'week') {
        var s = crtDiv();
        s.classList.add('cl_H-label', 'cl_H-labels_shift');
        ls.append(s);
    }
    labels.forEach(function (label) {
        var l = crtDiv();
        l.classList.add('cl_label');
        l.textContent = label;
        ls.append(l);
    });
    return ls;
}
function getHoursLabels(start, end) {
    var hs = crtDiv();
    var th = crtDiv();
    hs.classList.add('cl_H-labels');
    th.classList.add('cl_H-header');
    th.textContent = 'Hours';
    hs.append(th);
    for (var i = start; i < end; i++) {
        var h = crtDiv();
        h.classList.add('cl_H-label');
        h.textContent = i + ":00";
        hs.append(h);
    }
    return hs;
}
// Create the div from th current month
function getMonthDiv(month) {
    var m = crtDiv();
    m.classList.add('cl_month', month.toString());
    m.textContent = months[month];
    return m;
}
// Create a the div from one day
function getDayDiv(date, singleWeek, fillUp, weekend) {
    var day = date.getDate();
    var dataDate = dateTS(date);
    var d = crtDiv();
    var t = crtDiv();
    var c = crtDiv();
    d.classList.add('cl_day');
    t.classList.add('cl_day-header');
    c.classList.add('cl_day-content');
    d.dataset.date = dataDate.slice(0, -8);
    // Special classes 
    if (fillUp)
        d.classList.add('cl_day__dif');
    if (weekend)
        d.classList.add('cl_day__weekend');
    t.textContent = day.toString();
    if (singleWeek) { // Generates the different hours
        for (var i = hours[0]; i < hours[1]; i++) {
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
var updateMonth = function (initial, side) {
    var month = initial.getMonth() + 1;
    var year = initial.getFullYear();
    if (side === 'up') {
        if (month === 12) {
            month = 1;
            year += 1;
        }
        else {
            month += 1;
        }
    }
    if (side === 'down') {
        if (month === 1) {
            month = 12;
            year -= 1;
        }
        else {
            month -= 1;
        }
    }
    return month + "/1/" + year;
};
