const loadingScreen = document.getElementById("loading-screen")
const whooshFX = document.getElementById("whoosh-fx")
const loadingContent = document.getElementById("loading-content")
const chibiImg = document.getElementById("chibiImg")
const chibiChar = ['https://c.tenor.com/a71fZTvFyV0AAAAi/demon-slayer.gif', 'https://c.tenor.com/oFyVYx5-aPwAAAAi/demon-slayer.gif', 'https://c.tenor.com/L1FRa5-vuYcAAAAi/anime-demon-slayer.gif', 'https://c.tenor.com/jve_fkSYDscAAAAi/anime-nezuko.gif']
chibiImg.setAttribute('src', chibiChar[Math.floor(Math.random() * 4)])


function changePage(choice){
    if(choice == 'in'){
        setTimeout(() => {
            loadingContent.style.display = 'none'
        }, 3000)
        setTimeout(() => {
            loadingScreen.style.backgroundColor = 'transparent'
            whooshFX.style.display = 'block'
            loadingScreen.style.width = '0'
        }, 4000)
    }
    else if(choice == 'fastin'){
        loadingContent.style.display = 'none'
        setTimeout(()=>{
            loadingScreen.style.width = '0'
            loadingScreen.style.background = 'transparent'
            whooshFX.style.display = 'block'
        },1000)
    }
    else if(choice == 'fastout'){
        loadingScreen.style.left = 0
        loadingScreen.style.width = '200%'
        whooshFX.style.transform = 'scaleX(-1)'
    }
    else{
        loadingScreen.style.left = 0
        loadingScreen.style.width = '200%'
        whooshFX.style.transform = 'scaleX(-1)'
        setTimeout(() => {
            loadingScreen.style.background = '#000'
            whooshFX.style.display = 'none'
            setTimeout(() => {
                chibiImg.setAttribute('src', chibiChar[Math.floor(Math.random() * 4)])
                loadingContent.style.display = 'block'
            }, 2000);
        }, 800);
    }
}