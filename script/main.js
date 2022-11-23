//Script Element
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
const name1 = document.getElementById("OutP1")
const name2 = document.getElementById("OutP2")
const name3 = document.getElementById("OutP3")

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function counterLegends(legendselector){
    count = 0
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
                count++
            }

        }
    }
    return count
}

function reset(tab,legendselector){
    if (tab.length == 0) {
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

function changeimage(contexte,path,label) {
    contexte.src = `images/${path}.png`
    label.innerHTML = path
}

function sort(max1,max2,max3){
    
    //Index Sort
    let l = [max1.length,max2.length,max3.length]
    SortList = l.map(function(e,i){return {ind: i,val: e}})
    SortList.sort(function(x,y){return x.val - y.val})
    indice = SortList.map(function(e){return e.ind})
    
    //List sort
    temp = [max1,max2,max3]
    MaxSort = indice.map(function(e){return temp[e]})
    return {indice,MaxSort}
}

function generateFirstElement(MaxSort){
    let max1 = MaxSort[0]
    choose1 = max1[getRandomInt(max1.length)]
    max1.splice(max1.indexOf(choose1),1)
    return choose1
}

function generateSecondElement(MaxSort,choose1) {
    let max1 = MaxSort[0]
    let max2 = MaxSort[1]
    let max3 = MaxSort[2]
    var choose2 = choose1
    var k = 0
    while (choose2 == choose1 && k <3000){
        var elementChoisi = max2[getRandomInt(max2.length)]
        choose2 = elementChoisi
        if (max1.length == 1){
            if (max2.length == 2){
                for (let index = 0; index < max2.length; index++) {
                    const elementAutre = max2[index];
                    if (elementAutre != elementChoisi){
                        var change = false
                        if (max1.indexOf(elementAutre)!=-1){
                            change = true
                        }
                        if (max3.length == 2 && max3.indexOf(elementAutre)!=-1 && max3.indexOf(max1[0])!=-1){
                            change = true
                        }
                        if (max3.length == 2 && max3.indexOf(elementChoisi)!=-1 && max3.indexOf(choose1)!=-1){
                            change = true
                        }
                        if (max3.length == 2 && max3.indexOf(elementAutre)!=-1 && max3.indexOf(choose1)!=-1){
                            change = false
                        }
                        if (max3.length == 2 && max3.indexOf(elementChoisi)!=-1 && max3.indexOf(max1[0])!=-1){
                            change = false
                        }
                        if (change) {
                            choose2 = elementAutre
                        }
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

function generateThirdElement(MaxSort,choose1,choose2) {
    let max1 = MaxSort[0]
    let max2 = MaxSort[1]
    let max3 = MaxSort[2]
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

//button.addEventListener('click',generate)
button.addEventListener('click',generate2)


function uncheckLegends(num,legendselector) {
    const nomLegends = NameNumber.indexOf(num)
    for (let i = 0; i < 5; i++) {
        var max = 5
        if (i == 4){
            max = 3
        }
        for (let j = 0; j < max; j++) {
            const myRow = legendselector.getElementsByTagName("tr")[i];
            const myCell = myRow.getElementsByTagName("td")[j];
            const checkbox = myCell.getElementsByTagName("input")
            if (nomLegends == checkbox.checkbox.value){
                checkbox.checkbox.checked = false
                return 1
            }
        }
    }
    return -1
}

function generate2() {
    // Reset random 
    team1.src = `images/random1.gif`
    team2.src = `images/random2.gif`
    team3.src = `images/random3.gif`

    name1.innerHTML = "???"
    name2.innerHTML = "???"
    name3.innerHTML = "???"
    max1 = reset(max1,myTable1)
    max2 = reset(max2,myTable2)
    max3 = reset(max3,myTable3)
    // Check Solo
    let Counters = [counterLegends(myTable1),counterLegends(myTable2),counterLegends(myTable3)]
    let maxS = [max1,max2,max3]
    for (let index = 0; index < Counters.length; index++) {
        const element = Counters[index];
        if (element == 1){
            for (let i = 0; i < maxS.length; i++) {
                const SelectMax = maxS[i];
                if (i!=index){
                    if (SelectMax.indexOf(maxS[index][0]) !=-1 ){
                        SelectMax.splice(SelectMax.indexOf(maxS[index][0]),1)     
                    }
                }
            }
        }
    }
    clearTimeout(timeout1)
    clearTimeout(timeout2)
    clearTimeout(timeout3)
    //console.log(`${max1}!!${max2}!!${max3}`)
    //console.log(`${max1.length}!!${max2.length}!!${max3.length}`)
    var {indice , MaxSort} = sort(max1,max2,max3)  
    if (MaxSort[0].length <=3){
        var indexprior = -1
        for (let index = 0; index < MaxSort[0].length; index++) {
            const element = MaxSort[0][index];
            if (max1.indexOf(element) != -1 && max2.indexOf(element) != -1 && max3.indexOf(element) != -1 ){
                indexprior = index
            }
        }
        if (indexprior != -1){
            choose1 = MaxSort[0][indexprior]
            MaxSort[0].splice(indexprior,1)
        } else {
            choose1 = generateFirstElement(MaxSort)
        }
    } else {
        choose1 = generateFirstElement(MaxSort)
    }
    try {
        choose2 = generateSecondElement(MaxSort,choose1)
        choose3 = generateThirdElement(MaxSort,choose1,choose2)   
        tempList = [choose1,choose2,choose3]

        let OrderChoose = [-1,-1,-1]
        for (let index = 0; index < OrderChoose.length; index++) {
            OrderChoose[indice[index]] = tempList[index]
        }
        timeout1 = setTimeout(changeimage.bind(null,team1,NameNumber[OrderChoose[0]],name1),1000)
        timeout2 = setTimeout(changeimage.bind(null,team2,NameNumber[OrderChoose[1]],name2),3000)
        timeout3 = setTimeout(changeimage.bind(null,team3,NameNumber[OrderChoose[2]],name3),6000)
    } catch (error) {
        max1=[]
        max2=[]
        max3=[]
    }
    
}

/* Good print
    console.log(`${max1}!!${max2}!!${max3}`)
    console.log(`${max1.length}!!${max2.length}!!${max3.length}`)
*/

//TEST
function test(){
    for (let index = 0; index < 10000; index++) {
        generate2()
        console.log(`run:${index}`)
    }
    console.log("PASS")
    return -1
}
