const characters = [{
    name: 'Kamado Tanjiro',
    id: 'tanjiro'
},
{
    name: 'Agatsuma Zenitsu',
    id: 'zenitsu',
},
{
    name: 'Hashibira Inosuke',
    id: 'inosuke',
    status: 'blocked' 
},
{
    name: 'Kamado Nezuko',
    id: 'nezuko',
    status: 'blocked' 
},
{
    name: 'Giyu Tomioka',
    id: 'tomioka',
    status: 'blocked' 
},
{
    name: 'Kocho Shinobu',
    id: 'shinobu',
    status: 'blocked' 
},
{
    name: 'Tsuyuri Kanao',
    id: 'kanao',
    status: 'blocked' 
},
{
    name: 'Kyojuro Rengoku',
    id: 'rengoku',
    status: 'blocked' 
},
{
    name: 'Akaza',
    id: 'akaza',
    status: 'blocked' 
}]

characters.forEach( character =>{
    const characterLists = document.querySelectorAll('.character-list')
    characterLists.forEach( characterList => {
        const li = document.createElement('li')
        li.className = `character`
        li.id = character.id
        li.setAttribute('data-name', character.name)
    
        const icon = document.createElement('img')
        icon.src = `/src/imagens/${character.id}-icon.jpg`
        icon.alt = `${character.name} Character`
    
        characterList.appendChild(li)
        li.appendChild(icon)
    })
})



const charactersPlayer1 = document.querySelectorAll('.player-1 .character')
const charactersPlayer2 = document.querySelectorAll('.player-2 .character')
charactersPlayer1[0].classList.add('player-1-selected')
charactersPlayer2[0].classList.add('player-2-selected')

charactersPlayer1.forEach((character) => {
    character.addEventListener('click', () => {
        const characterSelected = document.querySelector('.player-1-selected')
        characterSelected.classList.remove('player-1-selected')
        character.classList.add('player-1-selected')
        
        const idSelected = character.attributes.id.value

        const imagePlayer1 = document.getElementById('character-player-1')
        if(idSelected === 'tanjiro' || idSelected === 'zenitsu'){
            imagePlayer1.src = `../src/imagens/${idSelected}.png`
            imagePlayer1.className = ''
        } else {
            imagePlayer1.src = `../src/imagens/${idSelected}-locked.png`
            imagePlayer1.className = 'blocked'
        }

        const player1Name = document.getElementById('character-name-1')
        const selectedName = character.getAttribute('data-name')

         player1Name.innerHTML = selectedName;
    })
})

charactersPlayer2.forEach((character) => {
    character.addEventListener('click', () => {
        const characterSelected = document.querySelector('.player-2-selected')
        characterSelected.classList.remove('player-2-selected')
        character.classList.add('player-2-selected')

        const idSelected = character.attributes.id.value

        const imagePlayer2 = document.getElementById('character-player-2')
        if(idSelected === 'tanjiro' || idSelected === 'zenitsu'){
            imagePlayer2.src = `../src/imagens/${idSelected}.png`
            imagePlayer2.className = ''
        } else {
            imagePlayer2.src = `../src/imagens/${idSelected}-locked.png`
            imagePlayer2.className = 'blocked'
        }

        const player2Name = document.getElementById('character-name-2')
        const selectedName = character.getAttribute('data-name')

         player2Name.innerHTML = selectedName;
    })
})

const startButton = document.getElementById('start-button')
startButton.addEventListener('click',()=>{
    const imageP1 = document.getElementById('character-player-1')
    const imageP2 = document.getElementById('character-player-2')
    
    if(imageP1.classList.contains('blocked')||imageP2.classList.contains('blocked')){
        window.alert('Os personagens bloqueados serão adicionados futuramente!')
    } else {
        const characterSelectedP1 = document.querySelector('.player-1-selected')
        const characterSelectedP2 = document.querySelector('.player-2-selected')
        const characterNameP1 = document.getElementById('character-name-1')
        const characterNameP2 = document.getElementById('character-name-2')
    
    
        localStorage.setItem('character-P1', characterSelectedP1.attributes.id.value)
        localStorage.setItem('character-P2', characterSelectedP2.attributes.id.value)
        localStorage.setItem('name-P1', characterNameP1.innerText)
        localStorage.setItem('name-P2', characterNameP2.innerText)

        window.location.href = "../html/game.html"
    }
})
