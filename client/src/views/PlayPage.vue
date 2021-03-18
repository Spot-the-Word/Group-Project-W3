<template>
    <div>
        <div style="padding: 1em;">
            <h2> Kata</h2>
        </div>
        <div style="padding: 1em;">
            <h1> {{ randomRemoveAlphabetByLevel }}</h1>
            <h3> clue disini</h3>
        </div>
        <div class="mb-3" style="padding: 1em;">
            <label for="exampleFormControlInput1" class="form-label" style="padding-top: 10px;">Put Your Anser Here</label><br>
            <input class="form-control" id="answer" placeholder="Your Answer"><br>
            <button type="button" class="btn btn-success">Enter</button>
        </div>
        <div style="padding: 1em;">
            <h3>SCORE</h3>
            <h2> 100</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayPage',
    data () {
        return {
            testWord: 'SEMANGAT'
            // level: 1
        }
    },
    computed: {
        randomRemoveAlphabetByLevel () {
            const removeCount = Math.floor( 0.4 * this.testWord.length ) 
            const indexToRemove = []
            let modifiedWord = ''
            for(let i = 0; i<removeCount; i++){
                let createIndexToRemove = Math.floor(Math.random()*this.testWord.length)
                let flag = true
                for(let j = 0; j < indexToRemove.length; j++){
                    // createIndexToRemove 
                    //checkIndex
                    if(indexToRemove[j] === createIndexToRemove ){
                        j = 0
                        createIndexToRemove = Math.floor(Math.random()*this.testWord.length)
                    }
                }
                if(flag){
                    indexToRemove.push(createIndexToRemove)
                }
            }
            for(let k = 0; k < this.testWord.length; k++){
                let flag = true
                for(let l = 0; l < indexToRemove.length; l++){
                    if( k === indexToRemove[l] ){
                        flag = false
                    }

                }
                if(k === this.testWord.length-1){
                    if(flag){
                        modifiedWord += `${this.testWord[k]}`
                    }
                    else{
                        modifiedWord += "_"
                    }    
                }
                else {
                    if(flag){
                        modifiedWord += `${this.testWord[k]} `
                    }
                    else{
                        modifiedWord += "_ "
                    }
                }
            }
            return modifiedWord
            
            // future feature<<<
            // const removeCount = 0
            // if(this.level >= 5){
            //     while (this.level>= 5){
            //         removeCount++
            //     }

            // }else{
            //     removeCount
            // }
        }
    }
    

}
</script>

<style>

</style>