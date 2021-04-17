const input = document.getElementById('search');
const button = document.querySelector('.button')
const result =  document.querySelector('.result_block')

const url = 'https://api.lyrics.ovh'

async function searchSongs(text){
    const response =await fetch(`${url}/suggest/${text}`);
    const data = await response.json();

    showSongs(data);
}
function showSongs(data){
    const songs = data.data;
    
    let songsHtml = '';
    for(let i = 0; i < songs.length; i++){
        let song = songs[i]
        songsHtml += `<div class="song">
        <div class="title">
             <span>${song.title}</span>
        </div>
        </div>`
    }
    result.innerHTML = songsHtml
}


button.addEventListener('click', () => {
    const title = input.Value;
    searchSongs(title);
})