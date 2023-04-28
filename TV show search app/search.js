const form = document.querySelector('#searchForm'); 
const showImg = document.querySelector("#showImg");

form.addEventListener(('submit'), async function(e) {
    e.preventDefault(); 
    showImg.textContent = "";
    const searchValue = form.elements.query.value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchValue}`);
    displayImg(res.data);
    this.elements.query.value = "";
})

const displayImg = shows => {
    for(let res of shows) {
        if(res.show.image) {
            const newImg = document.createElement("IMG"); 
            newImg.src = res.show.image.medium; 
            showImg.append(newImg);
        }
    } 
}