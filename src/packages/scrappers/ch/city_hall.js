const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname,  'city_hall.json');
const htmlPath = path.join(__dirname, 'ch_scrap.html');

function scrapCityHall() {
    // Load the HTML file
    
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Parse the HTML using Cheerio
    const $ = cheerio.load(html);

    // Select the table with class 'article-table' and 'building-table'
    const table = $('#requirements_table');

    // Initialize an array to store the JSON objects
    const cityHallLevels = [];

    // Iterate over each row of the table (excluding the header row)
    table.find('tr').slice(1).each((index, row) => {
        const $row = $(row);
        // Extract the data from each column
        const level = parseInt($row.find('td:nth-child(1)').text());

        if (isNaN(level) || !level ) return;

        const unlocks = $row.find('td:nth-child(2)').text().split('\n').map(item => item.trim().replace(/\u00A0/, ' ')).filter(item => item !== 'None');
        const requirements = $row.find('td:nth-child(3)').text().split('\n').map(item => item.trim().replace(/\u00A0/, ' ')).filter(item => item !== 'None');
        const troopCapacity = parseInt($row.find('td:nth-child(4)').text().replace(/,+/g, ''));
        let costFood, costWood, costStone;

        $row.find('td:nth-child(5)').text().trim().replace(/\s+/g, ',').split(',').forEach((value, index) => {
            const extractedValue = extractResourceValue(value);

            if (index === 0) {
                costFood = extractedValue;
            } else if (index === 1) {
                costWood = extractedValue;
            } else if (index === 2) {
                costStone = extractedValue;
            }

        });

        // Extract the time values
        let [timeDays, timeHours, timeMinutes, timeSeconds] = [0, 0, 0, 0];

        $row.find('td:nth-child(6)').text().trim().split(' ').forEach((value, index) => {
            const numericValue = parseInt(value.slice(0, -1));

            if (value.endsWith('d')) {
                timeDays = numericValue;
            } else if (value.endsWith('h')) {
                timeHours = numericValue;
            } else if (value.endsWith('m')) {
                timeMinutes = numericValue;
            } else if (value.endsWith('s')) {
                timeSeconds = numericValue;
            }
        });



        // Calculate the total time in hours and minutes
        const totalHours = timeDays * 24 + timeHours;
        const totalMinutes = totalHours * 60 + timeMinutes + timeSeconds / 60;
        


        // Create the JSON object for the current level
        const cityHallLevel = {
            level,
            unlocks,
            requirements,
            troop_capacity: troopCapacity,
            cost: { food: costFood, wood: costWood, stone: costStone },
            time: {
                days: timeDays,
                hours: timeHours,
                minutes: timeMinutes,
                seconds: timeSeconds,
                total_hours: totalHours,
                total_minutes: totalMinutes
            }
        };

        // Add the JSON object to the array
        cityHallLevels.push(cityHallLevel);
    });

    // Convert the array of JSON objects to a string
    const json = JSON.stringify(cityHallLevels, null, 2);

    // Write the JSON string to a file
    
    fs.writeFileSync(jsonPath, json, { flag: 'w' });
};


// Function to extract the resource value from the string
function extractResourceValue(value) {
    const numericValue = parseFloat(value.slice(0, -1));
    if (isNaN(numericValue)) return 0;
    if (value.endsWith('M')) {
        return numericValue * 1000000;
    } else if (value.endsWith('K')) {
        return numericValue * 1000;
    } else {
        return numericValue;
    }
}

// Function to extract the resource value from the string
function extractResourceValue(value) {
    const numericValue = parseFloat(value.slice(0, -1));
    if (isNaN(numericValue)) return 0;
    if (value.endsWith('M')) {
        return numericValue * 1000000;
    } else if (value.endsWith('K')) {
        return numericValue * 1000;
    } else {
        return numericValue;
    }
}


scrapCityHall();