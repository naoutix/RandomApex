export {Game};
import { ARs,LMGS,SMGs,Marksman,Pistols,Shotguns,Snipers } from './main.js';
import {generateFirstElement,generateSecondElement,generateThirdElement,generateRedundancy} from './random.js'
//Create a class called Game

class Game {
    legendsFree1 = []
    legendsFree2 = []
    legendsFree3 = []
    choose1 = 0
    choose2 = 0
    choose3 = 0
    mode = "Trio"
    Weapons = {'ARs':ARs,'LMGS':LMGS,'SMGs':SMGs,'Marksman':Marksman,'Pistols':Pistols,'Shotguns':Shotguns,'Snipers' :Snipers}

    static playerState = new Set(['soloPick','NotSoloPick']);

    constructor() {
    }

    
    /**
     * return legends that can be choose in the freelegends
     * 
     * If there is no free legends, return all legends selected
     * 
     * if solo pick : delete legends solo from other pools
     *
     * @param {Array<String>} legendsSelected1
     * @param {Array<String>} legendsSelected2
     * @param {Array<String>} legendsSelected3
     * @memberof Game
     */
    updateFreeLegends(mode,legendsSelected1,legendsSelected2,legendsSelected3) {
        this.legendsFree1 = this.#updateFreeLegends(this.legendsFree1,legendsSelected1)
        this.legendsFree2 = this.#updateFreeLegends(this.legendsFree2,legendsSelected2)
        this.legendsFree3 = this.#updateFreeLegends(this.legendsFree3,legendsSelected3)
        this.mode = mode

        let LengthSelectedLegends = [legendsSelected1.length,legendsSelected2.length,legendsSelected3.length]
        let legendsFree = [this.legendsFree1,this.legendsFree2,this.legendsFree3]
        for (let LegendsSelectedIndex = 0; LegendsSelectedIndex < LengthSelectedLegends.length; LegendsSelectedIndex++) {
            const LengthSelected = LengthSelectedLegends[LegendsSelectedIndex];

            //Solo pick
            if ( LengthSelected == 1){
                const SoloLegends = legendsFree[LegendsSelectedIndex][0];
                // delete legends solo from other pools
                for (let LegendsFreeIndex = 0; LegendsFreeIndex < legendsFree.length; LegendsFreeIndex++) {
                    // test if the pool is not the pool of the solo pick
                    if (LegendsFreeIndex!=LegendsSelectedIndex){
                        let SpliceIndex = legendsFree[LegendsFreeIndex].indexOf(SoloLegends)
                        if (SpliceIndex!=-1 ){
                            legendsFree[LegendsFreeIndex].splice(SpliceIndex,1)    
                        }
                    }
                }
            }
        }
    }

    /**
     *PRIVATE return legends that can be choose in the freelegends
     * 
     * If there is no free legends, return all legends selected
     *
     * @param {Array<String>} legendsFree
     * @param {Array<String>} legendsSelected
     * @return {Array<String>} 
     * @memberof Game
     */
    #updateFreeLegends(legendsFree,legendsSelected) {

        //Check if there is free legends
        let legends = []
        if (legendsFree.length == 0) {
            legends = legendsSelected
        }
        else {
            // Check if the free legends are selected
            legends = legendsFree.filter(legend => legendsSelected.includes(legend))
        }
        return legends
    }

    #sort(list1,list2,list3){
        // Length list
        let l = [list1.length,list2.length,list3.length]
        // Indice + element
        let SortList = l.map(function(e,i){return {ind: i,val: e}})

        //Sort
        SortList.sort(function(x,y){return x.val - y.val})
        let indice = SortList.map(function(e){return e.ind})
        
        //List sort
        let temp = [list1,list2,list3]
        let SortListElement = indice.map(function(e){return temp[e]})
        return {indice,SortListElement}
    }

    generateRandomPlayer() {
        if (this.mode == "Trio"){
            return this.#generate3RandomPlayer()
        }
        else {
            return this.#generate2RandomPlayer()
        }
    }
    #generate3RandomPlayer(){
        let {indice , SortListElement : LegendsFreeSort} = this.#sort(this.legendsFree1,this.legendsFree2,this.legendsFree3)

        // Cas limite 
        if (LegendsFreeSort[0].length <=3){
            var indexprior = -1
            // Si une legends est free chez 3 player alors elle prioritaire a choisir
            for (let index = 0; index < LegendsFreeSort[0].length; index++) {
                const element = LegendsFreeSort[0][index];
                if (legendsFree1.indexOf(element) != -1 && legendsFree2.indexOf(element) != -1 && legendsFree3.indexOf(element) != -1 ){
                    indexprior = index
                }
            }
            // Si une legends est prioritaire alors on la choisit
            if (indexprior != -1){
                this.choose1 = LegendsFreeSort[0][indexprior]
                LegendsFreeSort[0].splice(indexprior,1)
            // Sinon on choisit une legends random
            } else {
                this.choose1 = generateFirstElement(LegendsFreeSort)
            }
        // Cas usuel
        } else {
            this.choose1 = generateFirstElement(LegendsFreeSort)
        }
        this.choose2 = generateSecondElement(this.mode,LegendsFreeSort,this.choose1)
        this.choose3 = generateThirdElement(LegendsFreeSort,this.choose1,this.choose2)   
        let tempList = [this.choose1,this.choose2,this.choose3]

        // Reorder the list
        let OrderChoose = [-1,-1,-1]
        for (let index = 0; index < OrderChoose.length; index++) {
            OrderChoose[indice[index]] = tempList[index]
        }

        return OrderChoose
    }
    #generate2RandomPlayer(){
        let LegendsFreeSort = [this.legendsFree1,this.legendsFree2]
        this.choose1 = generateFirstElement(LegendsFreeSort)
        this.choose2 = generateSecondElement(this.mode,LegendsFreeSort,this.choose1)
        return [this.choose1,this.choose2]
    }

    generateTwoWeapon() {
        //let categorie1 = generateRedundancy(this.Weapons)
        let ok = []
        console.log(this.Weapons)
    }

    rebuild(){
        this.legendsFree1 = []
        this.legendsFree2 = []
        this.legendsFree3 = []
        this.choose1 = 0
        this.choose2 = 0
        this.choose3 = 0       
    }
}