const request = require("request");
const cheerio = require("cheerio");
const _ = require("lodash");
const $ = html => {
  return cheerio.load(html);
};
const tree = [];
const getAllTags = obj => {
  obj.map(tag => {
    if (tag.type === "tag" || tag.type === "script") {
      // const pai = !!tag.parent?tag.parent.name:''
      tree.push(createTree(tag));
      getAllTags(tag.children);
    }
  });
};
const createTree = tag => {
  const tr = {};
  const allObj = [];
  tag.children.map(t => {
    if (t.type === "tag") {
      allObj.push(t.name);
    }
  });
  tr[tag.name] = allObj;
  return tr;
};

const handleTree = (tree = []) => {
  const obj = _.assign.apply({}, tree);
  const tags = [];
//   console.log(obj)

  for(let o in obj){
      obj[o]
        .filter(node=>!!node)
        .map((node,i)=>{
            tags.push({[o]:{[i]:node}})
        })
  }
  console.log(_.defaultsDeep(...tags))

};

async function crawler(url) {
  await request(url)
    .on("data", async data => {
      await getAllTags($(data.toString())._root.children);
      handleTree(tree);
    })
    .on("error", error => console.error);
}
try{

    crawler("https://www.google.com/");
}catch(e){
    console.error(e)
}
