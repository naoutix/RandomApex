// LIST LEGENDS -> MUST MATCH NAME OF IMAGES IN FOLDER images\
export const NameNumber = ['bloodhound',
                  'gibraltar',
                  'lifeline',
                  'pathfinder',
                  'wraith',
                  'bangalore',
                  'caustic',
                  'mirage',
                  'octane',
                  'wattson',
                  'crypto',
                  'revenant',
                  'loba',
                  'rampart',
                  'horizon',
                  'fuse',
                  'valkyrie',
                  'seer',
                  'ash',
                  'madmaggie',
                  'newcastle',
                  'vantage',
                  'catalyst']

import {UI} from './UI.js'
import {Game} from './game.js'

let UIgame = new UI(document)
let game = new Game()

const button = document.getElementById('generate')
const button2 = document.getElementById('mode')
const button3 = document.getElementById('modeWeapon')

button.addEventListener('click',generate2)
button2.addEventListener('click',changeMode)
button3.addEventListener('click',changeModeWeapon)

let mode = "Trio"
function changeMode() {
    let ThirdPlayerBox = document.getElementById('ThirdPlayerBox')
    let ThirdPlayerName = document.getElementById('ThirdPlayerName')
    let ThirdPlayerOutP3 = document.getElementById('OutP3')
    let ThirdPlayerMenu = document.getElementById('ThirdPlayerMenu')
    if (ThirdPlayerBox.style.display === "none") {
        ThirdPlayerBox.style.display = "block"
        ThirdPlayerName.style.display = "block"
        ThirdPlayerOutP3.style.display = "block"
        ThirdPlayerMenu.style.display = "block"
        mode = "Trio"
    } else {
        ThirdPlayerBox.style.display = "none"
        ThirdPlayerName.style.display = "none"
        ThirdPlayerOutP3.style.display = "none"
        ThirdPlayerMenu.style.display = "none"
        mode = "Duo"
    }
}

function changeModeWeapon() {
    let weapon1 = document.getElementById('WEAPON ROULETTE')
    if (weapon1.style.display === "none") {
        weapon1.style.display = "block"
    } else {
        weapon1.style.display = "none"
    }
}
/**
 * Main function
 *
 */
function generate2() {
    // reset
    let {legendsSelected1,legendsSelected2,legendsSelected3} = UIgame.resetUI()
    game.updateFreeLegends(mode,legendsSelected1,legendsSelected2,legendsSelected3)

    try {
        let numeroLegends = game.generateRandomPlayer()
        UIgame.updateUI(mode,numeroLegends)
    } catch (error) {
        console.log(error)
        game.rebuild()

    }   
}




let buttonLegends1 = document.getElementById('Select1')
let buttonLegends2 = document.getElementById('Select2')
let buttonLegends3 = document.getElementById('Select3')
buttonLegends1.addEventListener('click',dropdown.bind(null,"content1"))
buttonLegends2.addEventListener('click',dropdown.bind(null,"content2"))
buttonLegends3.addEventListener('click',dropdown.bind(null,"content3"))

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown(content) {
    closeDropdown()
    document.getElementById(content).classList.toggle("show");
}

function closeDropdown(){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}
function event(event) {
    if (!event.target.matches('.dropbtn') &&!(event.target.name == "checkbox") && !(event.target.tagName == "TD") && !(event.target.tagName == "TR")&& !(event.target.tagName == "TABLE")) {
        closeDropdown()
    }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = event