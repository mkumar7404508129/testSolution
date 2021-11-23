
let allData = []
url_place = 'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json'
url_cafes = 'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json'

// function for finding json data
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data
}
// calling fetchData for place and cafes
fetchData(url_cafes).then(data => {
    let cafes = []
    let places = []
    for (x in data['cafes']) {
        cafes.push(data['cafes'][x])
    }
    fetchData(url_place, places).then(data => {
        for (x in data['places']) {
            places.push(data['places'][x])
        }
        makeData(cafes, places)
    })
})
 
// Searching Data By typing call find data function

function findata(hai) {
    var serach = hai.value.toLowerCase()
    var filterData = allData.filter(data => {

        var temp = data.name.toLowerCase()
        return temp.includes(serach)

    })
    showData(filterData)

}
// Show data is used to display result data
function showData(allData) {
    console.log(allData)
    tableBody = document.getElementById('tbody')
    innerData = ""
    for (x in allData) {

        tr = document.createElement('tr')
        let z = 1

        innerData += "<tr>" +
            "<td class='column1'>" + allData[x]['sno'] + "</td>" +
            "<td class='column2'>" + allData[x]['name'] + "</td>" +
            "<td class='column3'>" + allData[x]['address'] + "</td>" +
            "<td class='column4'>" + allData[x]['postal_code'] + "</td>" +
            "<td class='column5'>" + allData[x]['lat'] + "</td>" +
            "<td class='column6'>" + allData[x]['long'] + "</td>" +
            "</tr>"
    }



tableBody.innerHTML = innerData



}

// This function is for making prearing json file that we use letter
function makeData(cafes, places) {

    for (x in cafes) {
        var id = cafes[x]['location_id']

        for (y in places) {

            if (places[y]['id'] == id) {
                let z = parseInt(x) + 1
                obj = {
                    "sno": z,
                    "name": cafes[x]['name'],
                    "address": places[y]['street_no'] + " " + places[y]['locality'],
                    "postal_code": places[y]["postal_code"],
                    "lat": places[y]["lat"],
                    "long": places[y]["long"]
                }
                allData.push(obj)
            }
        }

    }
    showData(allData)

}




