//Script Element
const NombreLegends = 23
let NameNumber = ['bloodhound',
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
let max1 = []
let max2 = []
let max3 = []
var choose1 = 0
var choose2 = 0
var choose3 = 0
var timeout1 = null
var timeout2 = null
var timeout3 = null

// HTML Element
const button = document.getElementById('generate')
const team1 = document.getElementById('team1')
const team2 = document.getElementById('team2')
const team3 = document.getElementById('team3')
const myTable1 = document.getElementById("LegendeSelector1");
const myTable2 = document.getElementById("LegendeSelector2");
const myTable3 = document.getElementById("LegendeSelector3");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function reset(tab,legendselector){
    if (tab.length == 0) {
        let listPlayer = []
        for (let i = 0; i < 5; i++) {
            var max = 5
            if (i ==4){
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
    else{
        let listPlayer = tab
        for (let i = 0; i < 5; i++) {
            var max = 5
            if (i ==4){
                max = 3
            }
            for (let j = 0; j < max; j++) {
                const myRow = legendselector.getElementsByTagName("tr")[i];
                const myCell = myRow.getElementsByTagName("td")[j];
                const checkbox = myCell.getElementsByTagName("input")
                if (!checkbox.checkbox.checked){
                    const idLegends = NameNumber.indexOf(checkbox.checkbox.value)
                    if (listPlayer.indexOf(idLegends)!=-1){
                        listPlayer.splice(listPlayer.indexOf(idLegends),1)
                    }
                }

            }
        }
        return listPlayer
    }
}

function changeimage(contexte,path) {
    contexte.src = path
}
function findTheOne(max1,max2,max3){
    if (max1.length == 1 || max1.length == 3 || max1.length == 4){
        return [max1,1]
    }
    if (max2.length == 1 || max2.length == 3 || max2.length == 4){
        return [max2,2]
    }
    if (max2.length == 1 || max3.length == 3 || max3.length == 4){
        return [max3,3]
    }
    return [null,-1]
}


function generateFirstElement(max1,max2,max3){
    choose1 = max1[getRandomInt(max1.length)]
    max1.splice(max1.indexOf(choose1),1)
    return choose1
}

function generateSecondElement(max1,max2,max3,choose1) {
    var choose2 = choose1
    var k = 0
    while (choose2 == choose1 && k <3000){
        var elementChoisi = max2[getRandomInt(max2.length)]
        choose2 = elementChoisi
        if (max1.length == 1){
            if (max2.length == 2){
                if (max3.length == 1){
                    if (max3.indexOf(elementChoisi)!=-1){
                        choose2 = choose1
                    }
                }
                else{
                    for (let index = 0; index < max2.length; index++) {
                        const elementAutre = max2[index];
                        if (elementAutre != elementChoisi){
                            var change = false
                            if (max1.indexOf(elementAutre)!=-1){
                                change = true
                                console.log('1')
                            }
                            if (max3.length == 2 && max3.indexOf(elementAutre)!=-1 && max3.indexOf(max1[0])!=-1){
                                change = true
                                console.log('3')
                            }
                            if (max3.length == 2 && max3.indexOf(elementChoisi)!=-1 && max3.indexOf(choose1)!=-1){
                                change = true
                                console.log('4')
                            }
                            if (max3.length == 2 && max3.indexOf(elementAutre)!=-1 && max3.indexOf(choose1)!=-1){
                                change = false
                                console.log('2')
                            }
                            if (max3.length == 2 && max3.indexOf(elementChoisi)!=-1 && max3.indexOf(max1[0])!=-1){
                                change = false
                                console.log('5')
                            }
                            if (change) {
                                choose2 = elementAutre
                            }
                        }
                    }
                }
            }
            if (max2.length > 2){
                if (max3.length == 2){
                    if (max3.indexOf(elementChoisi)!=-1){
                        choose2 = choose1
                    }
                }
            }
        }
    k++
    if (k>=3000){
        throw new Error(`TYPE2 :max1:${max1} max2:${max2} max3:${max3},choose1:${choose1},choose2:${choose2}`)
    }
    }
    max2.splice(max2.indexOf(choose2),1)
    return choose2
}

function generateThirdElement(max1,max2,max3,choose1,choose2) {
    var choose3 = choose2
    var k = 0
    while ((choose1 == choose3 || choose2 == choose3)&& k <3000){
    
        var elementChoisi = max3[getRandomInt(max3.length)]
        choose3 = elementChoisi
        if (max1.length == 1){
            if (max3.length == 2){
                for (let index = 0; index < max3.length; index++) {
                    const elementAutre = max3[index];
                    if (elementAutre != elementChoisi){
                        var change = false
                        if (max1.indexOf(elementAutre)!=-1){
                            change = true
                        }
                        if (change) {
                            choose3 = elementAutre
                        }
                    }
                }
            }
        }
        if (max2.length == 1){
            if (max3.length == 2){
                for (let index = 0; index < max3.length; index++) {
                    const elementAutre = max3[index];
                    if (elementAutre != elementChoisi){
                        var change = false
                        if (max2.indexOf(elementAutre)!=-1){
                            change = true
                        }
                        if (change) {
                            choose3 = elementAutre
                        }
                    
                    }
                }
            }
        }
    k++
    if (k>=3000){
        throw new Error(`TYPE3 : max1:${max1} max2:${max2} max3:${max3},choose1:${choose1},choose2:${choose2},choose3:${choose3}`)
    }
    }
    max3.splice(max3.indexOf(choose3),1)
    return choose3  
}



button.addEventListener('click',generate)
function generate() {
    max1 = reset(max1,myTable1)
    max2 = reset(max2,myTable2)
    max3 = reset(max3,myTable3)
    clearTimeout(timeout1)
    clearTimeout(timeout2)
    clearTimeout(timeout3)

    var [priormax,player] = findTheOne(max1,max2,max3)
    if (player != -1){
        var indexprior = 0
        for (let index = 0; index < priormax.length; index++) {
            const element = priormax[index];
    
            if (max1.indexOf(element) != -1 && max2.indexOf(element) != -1 && max3.indexOf(element) != -1 ){
                indexprior = index
            }
        }
        if (player == 1){
            choose1 = max1[indexprior]
            max1.splice(max1.indexOf(choose1),1)
            choose2 = generateSecondElement(max1,max2,max3,choose1)
            choose3 = generateThirdElement(max1,max2,max3,choose1,choose2)
        }
        if (player == 2){
            choose2 = max2[indexprior]
            max2.splice(max2.indexOf(choose2),1)
            choose1 = generateSecondElement(max2,max1,max3,choose2)
            choose3 = generateThirdElement(max2,max1,max3,choose2,choose1)   
        }
        if (player == 3){
            choose3 = max3[indexprior]
            max3.splice(max3.indexOf(choose3),1)
            choose2 = generateSecondElement(max3,max2,max1,choose3)
            choose1 = generateThirdElement(max3,max2,max1,choose3,choose2)   
        }      
    }
    else
    {
        choose1 = generateFirstElement(max1,max2,max3)
        choose2 = generateSecondElement(max1,max2,max3,choose1)
        choose3 = generateThirdElement(max1,max2,max3,choose1,choose2)
    }
    /*
    console.log(`#RUN#`)
    console.log(`${choose1}:${choose2}:${choose3}:`)
    console.log(`${max1}:${max2}:${max3}:`)
    */
    // Reset random 
    team1.src = `images/random1.gif`
    team2.src = `images/random2.gif`
    team3.src = `images/random3.gif`

    timeout1 = setTimeout(changeimage.bind(null,team1,`images/${NameNumber[choose1]}.png`),0)
    timeout2 = setTimeout(changeimage.bind(null,team2,`images/${NameNumber[choose2]}.png`),0)
    timeout3 = setTimeout(changeimage.bind(null,team3,`images/${NameNumber[choose3]}.png`),0)
}
/* TEST
for (let index = 0; index < 10000; index++) {
    generate()
    console.log(`run:${index}`)
}
console.log("PASS")
*/