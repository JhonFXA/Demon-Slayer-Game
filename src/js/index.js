window.onload = function(){
    changePage('in')
}

function startGame(){
    changePage('out')
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

// function openCredits(){
//     window.location.href = "html/credits.html"
// }
