import {NameNumber} from "./main.js"
export {UI};

function changeimageLegends(contexte,path,label) {
    contexte.src = `images/legends/${path}.png`
    label.innerHTML = path
}

function changeimageWeapons(contexte,Class,Weapon,label) {
    contexte.src = `images/weapons/${Class}/${Weapon}.webp`
    label.innerHTML = Weapon
}

class UI {
    timeout1 = null
    timeout2 = null
    timeout3 = null

    timeoutWeapon1 = null
    timeoutWeapon2 = null

    constructor(document){
        // HTML Element
        this.button = document.getElementById('generate')
        this.player1 = document.getElementById('team1')
        this.player2 = document.getElementById('team2')
        this.player3 = document.getElementById('team3')
        this.myTable1 = document.getElementById("LegendeSelector1");
        this.myTable2 = document.getElementById("LegendeSelector2");
        this.myTable3 = document.getElementById("LegendeSelector3");
        this.name1 = document.getElementById("OutP1")
        this.name2 = document.getElementById("OutP2")
        this.name3 = document.getElementById("OutP3")
        this.weapon1 = document.getElementById("weapon1")
        this.weapon2 = document.getElementById("weapon2")
        this.weaponName1 = document.getElementById("weapon1Name")
        this.weaponName2 = document.getElementById("weapon2Name")
    }

    resetUI(){
        this.player1.src = `images/random1.gif`
        this.player2.src = `images/random2.gif`
        this.player3.src = `images/random3.gif`
        this.weapon1.src = `images/weapons/randomWeapon1.gif`
        this.weapon2.src = `images/weapons/randomWeapon2.gif`

        this.name1.innerHTML = "???"
        this.name2.innerHTML = "???"
        this.name3.innerHTML = "???"
        this.weaponName1.innerHTML = "???"
        this.weaponName2.innerHTML = "???"

        let legendsSelected1 = this.selectedLegend(this.myTable1)
        let legendsSelected2 = this.selectedLegend(this.myTable2)
        let legendsSelected3 = this.selectedLegend(this.myTable3)
        clearTimeout(this.timeout1)
        clearTimeout(this.timeout2)
        clearTimeout(this.timeout3)
        clearTimeout(this.timeoutWeapon1)
        clearTimeout(this.timeoutWeapon2)

        return {legendsSelected1,legendsSelected2,legendsSelected3}
    }
    /**
     * Check selected legends with UI
     * 
     *
     *
     * @param {Array<String>} LegendsFree
     * @param {*} legendselector
     * @return {Array<String>} 
     */
    selectedLegend(legendselector){
        // Mode Fill LegendsFree
        let listPlayer = []
        for (let i = 0; i < 5; i++) {
            var max = 5
            if (i == 4){
                max = 3
            }
            for (let j = 0; j < max; j++) {
                const myRow = legendselector.getElementsByTagName("tr")[i];
                const myCell = myRow.getElementsByTagName("td")[j];
                const checkbox = myCell.getElementsByTagName("input")
                if (checkbox.checkbox.checked){
                    listPlayer.push(NameNumber.indexOf(checkbox.checkbox.value))
                }
            }
        }
        return listPlayer
    }

    updateUIlegends(mode,numeroLegends){
        this.timeout1 = setTimeout(changeimageLegends.bind(null,this.player1,NameNumber[numeroLegends[0]],this.name1),1000)
        this.timeout2 = setTimeout(changeimageLegends.bind(null,this.player2,NameNumber[numeroLegends[1]],this.name2),3000)
        if (mode == "Trio"){
            this.timeout3 = setTimeout(changeimageLegends.bind(null,this.player3,NameNumber[numeroLegends[2]],this.name3),6000)
        }
    }

    updateUIweapons(Weapons){
        this.timeoutWeapon1 = setTimeout(changeimageWeapons.bind(null,this.weapon1,Weapons[0][1],Weapons[0][0],this.weaponName1),1000)
        this.timeoutWeapon2 = setTimeout(changeimageWeapons.bind(null,this.weapon2,Weapons[1][1],Weapons[1][0],this.weaponName2),3000)

    }
}