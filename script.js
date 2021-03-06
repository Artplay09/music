const input = document.getElementById('search');
const button = document.querySelector('.button')
const result =  document.querySelector('.result_block')

const url = 'https://api.lyrics.ovh';

async function searchSongs(text){
    const response = await fetch(`${url}/suggest/${text}`);
    const data = await response.json();

    showSongs(data);
}
function showSongs(data){
    const songs = data.data;
    // console.log(songs);
    let songsHtml = '';
    for(let i = 0; i < songs.length; i++){
        let song = songs[i]
        songsHtml += `<div class="song">
        <div class="title">
        <span>${song.artist.name}</span> - <span>${song.title}</span>
        </div>
        <button data-artist='${song.artist.name}' data-song='${song.title}'>Текст песни</button>
        </div>\n`
    }
    result.innerHTML = songsHtml
}

async function showLyric(e){
     let button = e.target
    if(button.tagName ==='BUTTON'){
        let artist = button.dataset.artist;
        let song = button.dataset.song
        const response = await fetch(`${url}/v1/${artist}/${song}`);
        const data = await response.json();
        
        if (data.error) {
            result.innerHTML = '<h2>Текст не найден</h2>'
        } else{
            result.innerHTML = data.lyrics;
        }
    
}
    
}


button.addEventListener('click', () => {
    const title = input.value;
    searchSongs(title);
})

document.addEventListener('keydown',(e) =>{
    if(e.keyCode === 13) {
        const title = input.value;
        searchSongs(title);
    }
})

result.addEventListener('click', showLyric)