// LIST LEGENDS -> MUST MATCH NAME OF IMAGES IN FOLDER images\legends
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
                            'catalyst',
                            'ballistic']

// LIST WEAPONS -> MUST MATCH NAME OF IMAGE IN FOLDER images\weapons
export const ARs = ['HAVOC_Rifle',
                    'Nemesis_Burst_AR',
                    'R-301_Carbine',
                    'VK-47_Flatline']

export const LMGS = ['Devotion_LMG',
                     'L-STAR_EMG',
                     'M600_Spitfire',
                     'Rampage_LMG']

export const Marksman = ['30-30_Repeater',
                         'G7_Scout',
                         'Triple_Take']

export const Pistols = ['P2020',
                        'Wingman']

export const Shotguns = ['EVA-8_Auto',
                         'Mastiff_Shotgun',
                         'Mozambique_Shotgun',
                         'Peacekeeper']

export const SMGs = ['Alternator_SMG',
                     'C.A.R._SMG',
                     'Prowler_Burst_PDW',
                     'R-99_SMG',
                     'Volt_SMG']

export const Snipers = ['Charge_Rifle',
                        'Longbow_DMR',
                        'Sentinel']

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

addEventListener("input",UpdateCode)


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


function UpdateCode(event){
    if (event.target.id.match("CodeLegends[0-3]")) {
        let txt = document.getElementById(event.target.id).value
        if (txt.match("0x[0-9a-fA-F]{6}([0-9a-fA-F]{6})?")){
            let code = ((parseInt(txt, 16)).toString(2)).padStart(24, '0')
            console.log("LegendeSelector".concat(event.target.id.slice(-1)))
            UIgame.updateFromCode(code,document.getElementById("LegendeSelector".concat(event.target.id.slice(-1))))           
        }
    }
    else {
        let {code1,code2,code3} = UIgame.codeFromTable()
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
        let weaponsLegends = game.generateTwoWeapon()
        UIgame.updateUIlegends(mode,numeroLegends)
        UIgame.updateUIweapons(weaponsLegends)
    } catch (error) {
        console.log(error)
        game.rebuild()

    }   
}




