function startGame(){
    window.location.href = "/html/character-select.html"
}

for (const button of document.querySelectorAll('.inactive')) {
    button.addEventListener('click',() => {
        window.alert('Esta funcionalidade ainda será implementada! | This functionality is still in development!')
    })
}
