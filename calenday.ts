//---------------------
// MAIN                \
////////////////////////

function calenday(format: string, id: string, date: string= today()): number{

    // Check the inputs passed arguments
    if (formats.indexOf(format) == -1) {
        return 1;
    }
    if (typeof date != 'string' || date.length != 10) {
        return 2;
    }
    if (typeof id != 'string') {
        return 3
    }
    //Select the wrapper from the HTML
    const wrapper: HTMLElement = document.getElementById(id)

    // Create a JS date and set to GMT x
    let d: Date = new Date(`${date} GMT${timeDiff}`)
    
    // Gets the required elements for following loop 
    let firstDstr: string = getFirstDay(d, format);
    let lastDstr: string = getLastDay(d,format)
    let currentD: Date = new Date(firstDstr)

    wrapper.append(getMonthDiv(d.getMonth()))
    wrapper.append(getLabels(format))
    
    // Create a div for each day
    do {
        const w: HTMLElement = crtDiv()
        w.classList.add('cl_week')
        if (format === 'week') {w.append(getHoursLabels(hours[0], hours[1]))}

        for (let i = 0; i < 7; i++) {
            let singleWeek = (format === 'week') ? true : false;
            let fillUp = currentD.getMonth() === d.getMonth() ? false : true;
            let weekend = currentD.getDay() == 0 || currentD.getDay() == 6 ? true : false;
            let div = getDayDiv(currentD.getDate(), singleWeek, fillUp, weekend)
            w.append(div)
            currentD.setDate(currentD.getDate() + 1)
        }
        wrapper.append(w)
        
    } while (currentD <= new Date(lastDstr));
    
    return 0;
}

//---------------------------------------
// 2 - LIBRARY
//---------------------------------------
// 2.1 - Variables and const
//-----------------------------

const timeDiff: string = '00:00';
const hours: Array<number> = [8, 17];
const formats: Array<string> = ['week', 'month'];
const labels: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'];

//-----------------------------
// 2.2 - Shorthands
//-----------------------------

const crtDiv = () => document.createElement('div');
const dateTS = (date): string => {
    let month = date.getMonth() + 1;
    let dateTS = `${month}/${date.getDate().toString()}/${date.getFullYear().toString()} GMT${timeDiff}`;
    return dateTS;
}
const today = ():string => {
    let date = new Date();
    let tmp = dateTS(date);
    return tmp.slice(0, -8)

}

//-----------------------------
// 2.3 - Funtions
//-----------------------------

// Create the labels from the array of labels
function getLabels(format: string): HTMLElement {

    const ls: HTMLElement = crtDiv();
    ls.classList.add('cl_labels')

    if (format == 'week') {
        const s: HTMLElement = crtDiv();
        s.classList.add('cl_H-label', 'cl_H-labels_shift');
        ls.append(s);
    }

    labels.forEach(label => {
        const l: HTMLElement = crtDiv();
        l.classList.add('cl_label');
        l.textContent = label;
        ls.append(l);
    })

    return ls;
}

function getHoursLabels(start: number, end: number): HTMLElement {

    const hs: HTMLElement = crtDiv();
    const th: HTMLElement = crtDiv();

    hs.classList.add('cl_H-labels');
    th.classList.add('cl_H-header');
    th.textContent = 'Hours';


    hs.append(th)

    for (let i = start; i < end; i++) {

        const h: HTMLElement = crtDiv();
        h.classList.add('cl_H-label');
        h.textContent = `${i}:00`
        hs.append(h)
    }

    return hs;
}

// Create the div from th current month
function getMonthDiv(month: number): HTMLElement {
    const m: HTMLElement = crtDiv();
    m.classList.add('cl_month', month.toString())
    m.textContent = months[month]

    return m;
}

// Create a the div from one day
function getDayDiv(day: number, singleWeek: boolean, fillUp: boolean, weekend: boolean): HTMLElement {

    const d: HTMLElement = crtDiv();
    const t: HTMLElement = crtDiv();
    const c: HTMLElement = crtDiv();

    d.classList.add('cl_day');
    t.classList.add('cl_day-header');
    c.classList.add('cl_day-content');

    // Special classes 
    if (fillUp) d.classList.add('cl_day__dif')
    if (weekend) d.classList.add('cl_day__weekend')

    t.textContent = day.toString();

    if (singleWeek) { // Generates the different hours
        for (let i = hours[0]; i < hours[1]; i++) {
            const h: HTMLElement = crtDiv();
            h.classList.add('cl_hour');
            c.append(h);            
        }
    }

    d.append(t, c);
    return d;
}

// Calculate the first day of the first week from the current month if format == 'month' otherwise the first day of the week
function getFirstDay(date: Date, format: string): string {
    let tmp = date;

    if (format === 'month') {
       let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
       tmp = firstDay
    }
    
    let diff = tmp.getDate() - tmp.getDay() + (tmp.getDay() === 0 ? -6 : 1);
    
    let result = new Date(dateTS(date));
    result.setDate(diff)

    return dateTS(result);
     
}

// Calculate the last day of the last week from the current month if format == 'month' otherwise the last day of the week
function getLastDay(date: Date, format: string) {
    let tmp = date
    if (format === 'month') {
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        tmp = new Date(dateTS(lastDay))                   
    }

    let result = new Date(getFirstDay(tmp, 'week'))
    result.setDate(result.getDate() + 6)
    return dateTS(result);
}
