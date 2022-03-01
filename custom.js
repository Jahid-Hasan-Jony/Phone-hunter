const LoadDataDetails = document.querySelector('#Load-Data-Details');
const searchPhone = () => {
    const searchResultsField = document.querySelector(".search-results");
    const searchInput = document.querySelector('#search-input');
    let searchValue = searchInput.value;
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;

    fetch(url)
        .then(response => response.json())
        .then(responseData => {
            searchResults(responseData.data)
        })
    const searchResults = (data) => {
        LoadDataDetails.innerHTML = ''
        searchResultsField.innerHTML = ''
        if (data.length !== 0) {
            for (let index in data) {
                if (index <= 14) {
                    let phone = data[index];
                    const div = document.createElement('div');
                    div.classList.add("col-md-4")
                    const phoneItem = `<div class="card text-center p-5">
                                            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="">
                                            <div class="card-body">
                                                <h5 class="card-title">${phone.brand}</h5>
                                                <p class="card-text">
                                                ${phone.phone_name}
                                                </p>
                                                <a href="#" id ="loadDetails" class="btn btn-primary" onclick="selectedPhoneDetails('${phone.slug}')">Details</a>
                                            </div>
                                          </div>`
                    div.innerHTML = phoneItem
                    searchResultsField.appendChild(div)
                }
            };
        }
        else {
            const div = document.createElement('div');
            const notFoundDisplay = `
            <div class="d-flex justify-content-center align-items-center">
            <h1>No Result Found</h1>
            </div>
            `
            div.innerHTML = notFoundDisplay
            searchResultsField.appendChild(div)
        }
    }
}


const selectedPhoneDetails = (phone_slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phone_slug}`;
    fetch(url)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData.data)
            DisplayDataDetails(responseData.data)
        })

    const DisplayDataDetails = (selectedPhone) => {
        let othersDetail;
        if (selectedPhone?.others) {
            othersDetail = `<li class="list-group-item">
            Bluetooth : 
            ${selectedPhone.others.Bluetooth}
          </li >
          <li class="list-group-item">
            GPS : 
            ${selectedPhone.others.GPS}
          </li >
          <li class="list-group-item">
            NFC : 
            ${selectedPhone.others.NFC}
          </li >
          <li class="list-group-item">
            Radio : 
            ${selectedPhone.others.Radio}
          </li >
          <li class="list-group-item">
            USB : 
            ${selectedPhone.others.USB}
          </li >
          <li class="list-group-item">
            WLAN : 
            ${selectedPhone.others.WLAN}
          </li >
          `
        }
        const phoneItemDetails = `<div class="card mx-auto" style="width: 18rem;">
                <img src="${selectedPhone.image}" class="card-img-top w-75 mx-auto pt-3" alt="">
                <div class="card-body">
                    <h5 class="card-title">${selectedPhone.brand}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Model Name : ${selectedPhone.name}</li>
                    <li class="list-group-item">
                    Release Date : 
                ${selectedPhone.releaseDate ? selectedPhone.releaseDate : 'No Release Date Found'}
                    </li>
                    <li class="list-group-item">
                    ChipSet : 
                    ${selectedPhone.mainFeatures.chipSet}
                    </li>
                    <li class="list-group-item">
                    Display Size : 
                    ${selectedPhone.mainFeatures.displaySize}
                    </li>
                    <li class="list-group-item">
                    Memory : 
                    ${selectedPhone.mainFeatures.memory}
                    </li>
                    <li class="list-group-item">
                    Storage : 
                    ${selectedPhone.mainFeatures.storage}
                    </li>
                    <li class="list-group-item">
                    Sensor : 
                    ${selectedPhone.mainFeatures.sensors}
                    </li>
                    ${othersDetail ? othersDetail : ''}
                </ul >
            </div > `
        LoadDataDetails.innerHTML = phoneItemDetails;
    }
}
