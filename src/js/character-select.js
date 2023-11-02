const characters = [{
    name: 'Kamado Tanjiro',
    id: 'tanjiro'
},
{
    name: 'Agatsuma Zenitsu',
    id: 'zenitsu'
}]

characters.forEach( character =>{
    const characterLists = document.querySelectorAll('.character-list')
    characterLists.forEach( characterList => {
        const li = document.createElement('li')
        li.className = 'character'
        li.id = character.id
        li.setAttribute('data-name', character.name)
    
        const icon = document.createElement('img')
        icon.src = `../src/imagens/${character.id}-icon.jpg`
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
        imagePlayer1.src = `../src/imagens/${idSelected}.png`

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
        imagePlayer2.src = `../src/imagens/${idSelected}.png`

        const player2Name = document.getElementById('character-name-2')
        const selectedName = character.getAttribute('data-name')

         player2Name.innerHTML = selectedName;
    })
})











