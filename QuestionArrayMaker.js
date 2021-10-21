var quran_majeed_ = quran_majeed;
var quran = quran_majeed_;

function QuestionArrayMaker(start,width,max_block_size){
    var a = [];
    BlockLogic(a,width,max_block_size)

    console.log(a);

    var [questions_array,answers_array] = makeQuestionsAnswerArray(a,start);

    return [questions_array,answers_array]
}
function makeQuestionsAnswerArray(a,start){
    var questions_array=[];
    var answers_array=[];

    var block_number=1;
    while(1){
        var {length,starting_index,flag} = identifyBlock(a,block_number)
        if(flag==1){
            questionsAnswerArrayPusher(starting_index,length,questions_array,answers_array,start);
            block_number++;
        }else{
            break;
        }
    }
    return [questions_array,answers_array]
}
function identifyBlock(a,block_number){
    var length=0;
    var starting_index;
    var flag=0;
    for(let i=0;i<a.length;i++){
        if(block_number==a[i] && flag==0){
            starting_index=i;
            flag=1;
        } else if(block_number==a[i] && flag==1) {
            length++;
        }else if(block_number!=a[i] && flag==1){
            break;
        }
    }
    return {length,starting_index,flag}
}
function questionsAnswerArrayPusher(increment,ayatBlockLength,questions_array,answers_array,start){
    //questions object
    var questions={};
    questions.havetoread=ayatBlockLength;
    questions.text="Read more "+ayatBlockLength+" ayats from"+"\n";
    questions.content=quran[start+increment].content;
    questions_array.push(questions);
    //answers object
    var answers={};
    answers.surah=quran[start+increment].surah_number;
    answers.ayat=quran[start+increment].verse_number;
    answers.pageNumber=getPageNumber(answers.surah,answers.ayat)
    console.log(answers.pageNumber)
    answers.hadtoread=ayatBlockLength;
    answers.content=[];
    for(let index=0;index<=ayatBlockLength;index++){
        answers.content.push(quran[start+increment+index].content)
    }
    answers.marks=0
    answers_array.push(answers);
}
function getPageNumber(surah,ayat){
    for(let i=0;i<pageData.length;i++){
        const pageStart = [pageData[i][0],pageData[i][1]];
        const pageEnd = [pageData[i][2],pageData[i][3]];
        if(surah===pageStart[0] && ayat===pageStart[1]) return i+1;
        if(surah===pageEnd[0] && ayat===pageEnd[1]) return i+1;
        // 2 1 2 30
        if(pageStart[0]===pageEnd[0] && pageStart[0]===surah){
            if(ayat>pageStart[1] && ayat<pageEnd[1]) return i+1;
        }
        // 2 126 3 5
        if((pageStart[0]===surah || pageEnd[0]===surah) && pageEnd[0]>pageStart[0]){
            if(surah===pageStart[0]){
                if(ayat>pageStart[1]) return i+1;
            }
            if(surah===pageEnd[0]){
                if(ayat<pageEnd[1]) return i+1;
            }
        }
    }
}

