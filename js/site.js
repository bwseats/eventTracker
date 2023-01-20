var events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

function buildDropdown() {
    // get dropdown from page
    let dropdownMenu = document.getElementById('eventDropdown');
    
    // clear dropdown HTML
    dropdownMenu.innerHTML = '';

    // get events
    let currentEvents = getEventData();

    // retrieve ONLY city names
    let eventCities = currentEvents.map( (event) => event.city );

    // filter to show only DISTINCT city names
    let distinctCities = [...new Set(eventCities)];

    // get template from page
    const template = document.getElementById('dropdownItemTemplate');

    // copy template
    let dropdownTemplateNode = document.importNode(template.content, true);
    
    // get <a> tag from the template copy
    let menuItem = dropdownTemplateNode.querySelector('a');

    // change the text
    menuItem.textContent = 'All Cities';

    // set element class
    menuItem.setAttribute("data-string", "All");

    // add item to dropdown
    dropdownMenu.appendChild(menuItem);

    for (let i = 0; i < distinctCities.length; i++) {
        let cityMenuItem = document.importNode(template.content, true);
        let cityButton = cityMenuItem.querySelector('a');

        cityButton.textContent = distinctCities[i];
        cityButton.setAttribute("data-string", distinctCities[i]);

        dropdownMenu.appendChild(cityMenuItem);
    }

    displayStats(currentEvents);
    displayEventData(currentEvents);

}

function displayStats(eventsArray) {
    let stats = calculateStats(eventsArray);

    // do some math

    document.getElementById('total').textContent = stats.total.toLocaleString();
    document.getElementById('average').textContent = stats.averageAttendance.toLocaleString(
        "en-UK", {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }
    );

    document.getElementById('most').textContent = stats.maximumAttendance.toLocaleString();
    document.getElementById('least').textContent = stats.minimumAttendance.toLocaleString();
}

function calculateStats(eventsArray) {
    
    let sum = 0;
    let average = 0;
    let max = eventsArray[0].attendance;
    let min = eventsArray[0].attendance;
    
    for (let i = 0; i < eventsArray.length; i++) {
        let currentEvent = eventsArray[i];

        sum += currentEvent.attendance;

        if (currentEvent.attendance > max) {
            max = currentEvent.attendance;
        }

        if (currentEvent.attendance < min) {
            min = currentEvent.attendance;
        }
    }

    average = sum / eventsArray.length;

    let stats = {
        total: sum,
        averageAttendance: average,
        minimumAttendance: min,
        maximumAttendance: max
    }

    return stats;
}

function displayEventData(eventsArray) {
    let tableBody = document.getElementById('eventTableBody');
    const tableRowTemplate = document.getElementById('eventTableRowTemplate');

    tableBody.innerHTML = '';

    for (let i = 0; i < eventsArray.length; i++) {
        let eventRow = document.importNode(tableRowTemplate.content, true);
        let currentEvent = eventsArray[i];

        let tableCells = eventRow.querySelectorAll('td');

        tableCells[0].textContent = currentEvent.event;
        tableCells[1].textContent = currentEvent.city;
        tableCells[2].textContent = currentEvent.state;
        tableCells[3].textContent = currentEvent.attendance;
        tableCells[4].textContent = currentEvent.date;

        tableBody.appendChild(eventRow)
    }
}

function getEventData() {
    let currentEvents = JSON.parse(localStorage.getItem('bwEventData'));

    if (currentEvents == null) {
        currentEvents = events;
        localStorage.setItem('bwEventData', JSON.stringify(currentEvents));

    }

    return currentEvents;
}

function getEvents(element) {
    let currentEvents = getEventData();
    let cityName = element.getAttribute('data-string');

    let filteredEvents = currentEvents;

    if (cityName != 'All') {
        filteredEvents = currentEvents.filter(
            function(event) {
                if (cityName == event.city) {
                    return event;
                }
            }
        );
    }

    document.getElementById('statsHeader').textContent = cityName;
    displayStats(filteredEvents);
    displayEventData(filteredEvents);
}
