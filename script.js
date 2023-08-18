
let api_key = "8450acef59182987e09ca4a00573a432";

let image_url = "https://image.tmdb.org/t/p/w500/";

// let search_movie_url = "https://api.themoviedb.org/3/search/movie?api_key=8450acef59182987e09ca4a00573a432&language=en-US&page=1&include_adult=false";

// let search_tv_url = "https://api.themoviedb.org/3/search/tv?api_key=8450acef59182987e09ca4a00573a432&language=en-US&page=1&include_adult=false";

// let search_people_url = "https://api.themoviedb.org/3/search/person?api_key=8450acef59182987e09ca4a00573a432&language=en-US&page=1&include_adult=false";

let movie_url = "https://api.themoviedb.org/3/discover/movie?api_key=8450acef59182987e09ca4a00573a432&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

let tv_url = "https://api.themoviedb.org/3/discover/tv?api_key=8450acef59182987e09ca4a00573a432&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

let multi_search = "https://api.themoviedb.org/3/search/multi?api_key=8450acef59182987e09ca4a00573a432&language=en-US&page=1&include_adult=false";

let person_id_url = "https://api.themoviedb.org/3/person/changes?api_key=8450acef59182987e09ca4a00573a432&page=1";

let person_url = "https://api.themoviedb.org/3/person/?api_key=8450acef59182987e09ca4a00573a432&language=en-US";

let choice;

let bodyDiv = document.querySelector("#body-div");
let search = document.querySelector("#search");
let optionMenu = document.querySelector("#option-menu");
let option = document.querySelector("#option");
let optionSelected = document.querySelector("#option-selected");

getMovies(movie_url);


let li = document.querySelectorAll("#option-menu li");
// console.log(li);

li.forEach(e=>{
    // console.log(e.innerText);
    e.addEventListener("click",()=>{
        choice = e.attributes["value"]["value"];
        option.innerText = e.innerText;
        // console.log("choice",choice);
        bodyDiv.innerHTML = "";
        if(choice=="movie")
        {
            getMovies(movie_url);
        }
        else if(choice=="tv")
        {
            getTVSeries(tv_url);
        }
        else
        {
            getPerson(person_id_url);
        }
        // choice == "movie" ? getMovies(movie_url) : getTVSeries(tv_url);
        // if(choice=="movie")
        // {
        //     getMovies(movie_url);
        // } 
        // else
        // {
        //     getTVSeries(tv_url);
        // }
    });
});

function createPoster(ele)
{
    let poster = document.createElement("div");
    poster.classList.add("card","m-3","overlay");
    poster.style.width = "18rem";
    poster.style.boxShadow = "5px 5px 30px grey";
    let icon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>`;
    let IconStyle = `style="background-color: white;"`;
    let imageMovieOrTV = `<img src="${ele.poster_path==null?"./image/image-missing.png":(image_url + ele.poster_path)}" class="card-img-top" alt="Movie Poster">`;
    let imagePerson = `<img src="${ele.profile_path==null?"./image/image-missing.png":(image_url + ele.profile_path)}" class="card-img-top" alt="Movie Poster">`;
    poster.innerHTML = `
        ${ele.media_type=="person"?imagePerson:imageMovieOrTV}
            <div class="card-body overlay-body">
                <div class="card-title title-rating row">
                    <div class="col-9">
                        <div class="d-flex justify-content-center align-items-center" style="height:100%;">
                            <div class="title">${((ele.media_type=="movie"||ele.media_type==undefined)?ele.title:ele.name)}</div>
                        </div>
                    </div>
                    <div class="rating col-3" ${ele.media_type=="person"?IconStyle:""}>
                        <div class="d-flex flex-column">
                            <div class="align-self-center">
                                ${ele.media_type=="person"?"":icon}
                            </div>
                            <div class="align-self-center">
                                ${ele.vote_average==undefined?"":ele.vote_average}
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="card-text summary">
                    ${ele.media_type=="person"?ele.known_for_department:ele.overview}
                </div>
            </div>`;
    bodyDiv.appendChild(poster);
}

async function getMovies(movie_url) 
{
    // console.log(choice);
    // console.log(movie_url);
    // console.log("choice",choice);
    let res = await fetch(movie_url);
    let data = await res.json();
    // console.log(data);
    bodyDiv.innerHTML = "";
    data.results.forEach( (ele) => {
        // console.log(ele);
        createPoster(ele);
    });
}

async function getTVSeries(tv_url)
{
    let res = await fetch(tv_url);
    let data = await res.json();
    // console.log(data);
    bodyDiv.innerHTML = "";
    data.results.forEach( (ele) => {
        // console.log(ele);
        createPoster(ele);
    });
}

async function getPerson(person_id_url)
{
    let res = await fetch(person_id_url);
    let data = await res.json();
    // console.log(data.results);
    bodyDiv.innerHTML = "";
    data.results.forEach(async (ele) => {
        // console.log(ele.id);
        let respose = await fetch(`https://api.themoviedb.org/3/person/${ele.id}?api_key=8450acef59182987e09ca4a00573a432&language=en-US`);
        let personData = await respose.json();
        // console.log(personData);
        let poster = document.createElement("div");
        poster.classList.add("card","m-3","overlay");
        poster.style.width = "18rem";
        poster.style.boxShadow = "5px 5px 30px grey";
        poster.innerHTML = `
        <img src="${personData.profile_path==null?"./image/image-missing.png":(image_url + personData.profile_path)}" class="card-img-top" alt="Movie Poster">
                <div class="card-body overlay-body">
                    <div class="card-title title-rating row">
                        <div class="col-12">
                            <div class="d-flex justify-content-center align-items-center" style="height:100%;">
                                <div class="title">${personData.name}</div>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="card-text summary">
                        ${personData.known_for_department}
                        <br>
                        ${personData.biography}
                    </div>
                </div>`;
        bodyDiv.appendChild(poster);
    })
}

async function searchMovies(event)
{
    let res = await fetch(`${multi_search}&query=${event.target.value}`);
    let data = await res.json();
    // console.log("movie search:",data);
    bodyDiv.innerHTML = "";
    data.results.forEach((ele) => {
        if(ele.media_type=="movie")
        {
            createPoster(ele);
        }
        // createPoster(ele);
    })
}

async function searchTVSeries(event)
{
    let res = await fetch(`${multi_search}&query=${event.target.value}`);
    let data = await res.json();
    // console.log("tv search:",data);
    bodyDiv.innerHTML = "";
    data.results.forEach((ele) => {
        if(ele.media_type=="tv")
        {
            createPoster(ele);
        }
        // createPoster(ele);
    })
}

async function searchPerson(event)
{
    let res = await fetch(`${multi_search}&query=${event.target.value}`);
    let data = await res.json();
    console.log("person search:",data);
    bodyDiv.innerHTML = "";
    data.results.forEach((ele) => {
        if(ele.media_type=="person")
        {
            createPoster(ele);
        }
        // createPoster(ele);
    })
}

async function searchMultiSearch(event)
{
    // console.log(choice);
    // console.log(`${multi_search}&query=${event.target.value}`);
    let res = await fetch(`${multi_search}&query=${event.target.value}`);
    let data = await res.json();
    console.log(data);
    bodyDiv.innerHTML = "";
    data.results.forEach((ele) =>{
        createPoster(ele);
    })
}


search.addEventListener("keyup", (event) => {
    // console.log(event);
    // console.log(event.target.value);

    choice==undefined 
    ? 
    (event.target.value!=="" ? searchMultiSearch(event) : getMovies(movie_url)) 
    : 
    (
        choice=="movie" 
        ? 
        (event.target.value!==""? searchMovies(event) : (movie_url)) 
        : 
        (
            choice=="tv"
            ?
            (event.target.value!==""? searchTVSeries(event) : getTVSeries(tv_url))
            :
            (event.target.value!==""? searchPerson(event) : getPerson(person_id_url))
        ) 
    )
});





