const charactersPlayer1 = document.querySelectorAll('.player-1 .character')

charactersPlayer1.forEach((character) => {
    character.addEventListener('click', () => {
        const characterSelected = document.querySelector('.selected')
        characterSelected.classList.remove('selected')
        character.classList.add('selected')
        
        const idSelected = character.attributes.id.value

        const imagePlayer1 = document.getElementById('character-player-1')
        imagePlayer1.src = `./src/imagens/${idSelected}.png`

        const player1Name = document.getElementById('character-name-1')
        const selectedName = character.getAttribute('data-name')

         player1Name.innerHTML = selectedName;
    })
})



const charactersPlayer2 = document.querySelectorAll('.player-2 .character')

charactersPlayer2.forEach((character) => {
    character.addEventListener('click', () => {
        const characterSelected = document.querySelector('.player-2-selected')
        characterSelected.classList.remove('player-2-selected')
        character.classList.add('player-2-selected')

        const idSelected = character.attributes.id.value

        const imagePlayer2 = document.getElementById('character-player-2')
        imagePlayer2.src = `./src/imagens/${idSelected}.png`

        const player2Name = document.getElementById('character-name-2')
        const selectedName = character.getAttribute('data-name')

         player2Name.innerHTML = selectedName;
    })
})











