const request = require('request')
const cheerio = require('cheerio')

const $ = (html) => {
    return cheerio.load(html)
}
const tree = {}
const getAllTags = (obj) =>{
    obj.map(tag => {
        if(tag.type === 'tag' || tag.type === 'script'){
            const pai = !!tag.parent?tag.parent.name:''
            
            // console.log(!!tag.parent?tag.parent.name:'')
            
            createTree(tag)[tag.name].map(t=>{
                if(t == tag.name){
                }
                console.log(t)
            })
            // console.log(tag)
            getAllTags(tag.children)
        }
    })
} 
const createTree = (tag) =>{
    const tr = {}
    const allObj = []
    tag.children.map(t=>{
        if(t.type === 'tag'){
            allObj.push(t.name)
        }
    })
    tr[tag.name] = allObj
    return tr
}

request('http://www.example.com')
    .on('data', data=>{
        getAllTags($(data.toString())._root.children)
    })

