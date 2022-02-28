const searchFood = () => {
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
        searchResultsField.innerHTML = ''
        if (data.length !== 0) {
            data.forEach(phone => {
                const div = document.createElement('div');
                div.classList.add("col-md-4")
                const foodItem = `<div class="card text-center p-5">
                                            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="">
                                            <div class="card-body">
                                                <h5 class="card-title">${phone.brand}</h5>
                                                <p class="card-text">
                                                ${phone.phone_name}
                                                </p>
                                                <a href="#" id ="details" class="btn btn-primary" onclick="loadData('${phone.slug}')">Details</a>
                                            </div>
                                          </div>`
                div.innerHTML = foodItem
                searchResultsField.appendChild(div)
            });
        }
        else {
            const div = document.createElement('div');
            const result = `
            <div class="d-flex justify-content-center align-items-center">
            <h1>No Result Found</h1>
            </div>
            `
            div.innerHTML = result
            searchResultsField.appendChild(div)
        }
    }
}


const loadData = (phone_slug) => {
    console.log(phone_slug)
    const LoadDataDetails = document.querySelector('#Load-Data-Details')
    const url = `https://openapi.programming-hero.com/api/phone/${phone_slug}`;
    fetch(url)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData.data)
            loadDataDetails(responseData.data)
        })

    const loadDataDetails = (selectedPhone) => {
        const foodItemDetails = `<div class="card mx-auto" style="width: 18rem;">
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
                </ul>
            </div>`
        LoadDataDetails.innerHTML = foodItemDetails
    }
}
