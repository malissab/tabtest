const str=document.body.innerText
const removedChar=[]
const url='https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json'


fetch(url)
.then(res => res.text())
.then(data=>{
    removedChar.push(...JSON.parse(data))
    console.log(replaceCommonText(str, 24, removedChar))
})

function replaceCommonText(str, n, removedChar){
    let cleanStr=str.replace(/([\b\f\n\r\t\v])/gm," ").toLowerCase()                
    cleanStr=cleanStr.replace(/[:;!?,’\']/g, "")                                    
    cleanStr=cleanStr.replace(/[-()/[\[\]=><"^+*.\u2013\u2014]+/g, " ")          
    const uniques = cleanStr.split(' ').filter((word,index,array) =>
            !/[^a-z]/gi.test(word)                                                 
            && word.length > 1                                                        
            && index == array.indexOf(word)                                          
            && !removedChar.includes(word)                                 
        ) 

    const mostCommonWords=                                                            
        uniques
        .map(word=>[word,cleanStr.match(new RegExp(`\\b${word}\\b`,'g')).length])
        .sort((a, b)=>b[1]-a[1])
        .slice(0, n+1)
    return mostCommonWords                                                         
}

function replacedText(str){
    const commonText=replaceCommonText(str, 24, removedChar)
    let word=str
    commonText.forEach(word=>{
        const regex=new RegExp(`\\b${word[0]}\\b`,'gi')
        const wordCount=word[1]
        word=word.replace(regex, wordCount)
    })
    return word                                                                 
}