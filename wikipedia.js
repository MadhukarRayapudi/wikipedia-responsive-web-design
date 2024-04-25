let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    //creating result item  -- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //Anchor title -- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = result.title;
    resultTitleEl.href = result.link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);

    //title break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //anchor url -- result-URL 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = result.link;
    urlEl.target = "_blank";
    urlEl.textContent = result.link;
    resultItemEl.appendChild(urlEl);

    //linebreak
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //description -- line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = result.description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }

}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        let searchInputValue = searchInputEl.value;
        spinnerEl.classList.toggle("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);