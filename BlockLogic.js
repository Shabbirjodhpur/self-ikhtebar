function blockify(a,width,max_block_size){
    intializeWithZeroes(a,width)
    const block = JUMBLE(Blockmaker(width,max_block_size));
    for(let i=0;i<block.length;i++){
        assign(a,block[i].start,block[i].end,i);
    }
}
function Blockmaker(length,block_parameter){
    var blocks = []
    for(let i = 0;i<length;){
        var single_block = {}
        const random = randomRangeNum(1,block_parameter)
        single_block.start=i;
        single_block.end = i + random;
        i+=(random + 1)
        blocks.push(single_block)
    }
    blocks[blocks.length-1].end = length-1
    return blocks
}
function JUMBLE(input){
    var output = []
    while(input.length !==0){
        const random = randomRangeNum(0,input.length-1)
        output.push(input[random])
        input.splice(random,1)
    }
    return output
}
function intializeWithZeroes(a,width){
    for(let i=0;i<=width;i++)
        a.push(0);
}
const randomRangeNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;
function assign(a,startingIndex,lastIndex,block_name){
    for(var i = startingIndex;i<=lastIndex;i++){
        a[i]=block_name;
    }
}
function BlockLogic(a,width,max_block_size){
    blockify(a,width,max_block_size)
}