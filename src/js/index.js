const loadingScreen = document.getElementById("loading-screen")
const whooshFX = document.getElementById("whoosh-fx")
const loadingContent = document.getElementById("loading-content")
const chibiImg = document.getElementById("chibiImg")
const chibiChar = ['https://c.tenor.com/a71fZTvFyV0AAAAi/demon-slayer.gif', 'https://c.tenor.com/oFyVYx5-aPwAAAAi/demon-slayer.gif', 'https://c.tenor.com/L1FRa5-vuYcAAAAi/anime-demon-slayer.gif', 'https://c.tenor.com/jve_fkSYDscAAAAi/anime-nezuko.gif']
window.onload = function(){
    chibiImg.setAttribute('src', chibiChar[Math.floor(Math.random() * 4)])
    changePage('enter')
  
}
    
function startGame(){
    changePage('exit')
    setTimeout(() => {
        const select = document.getElementById("resolucao")
        localStorage.setItem('resolucao', select.options[select.selectedIndex].value)
        window.location.href = "html/character-select.html"
    }, 6000);
}

for (const button of document.querySelectorAll('.inactive')) {
    button.addEventListener('click',() => {
        window.alert('Esta funcionalidade ainda será implementada! | This functionality is still in development!')
    })
}
