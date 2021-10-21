document.getElementById('show_answer').addEventListener("click",answer_show)
var prev_index=0
var right = []
var wrong = []

function ButtonsDom(start,width,max_block_size){
    var [questions_array,answers_array] = QuestionArrayMaker(start,width,max_block_size)
    window.questions_array=questions_array
    window.answers_array=answers_array
    make_buttons_list_in_dom(questions_array.length)
}
function make_buttons_list_in_dom(button_count){
    document.getElementById('buttons').innerHTML=''
    for(var i=0;i<button_count;i++){
        var new_button=document.createElement('button');
        new_button.innerText=`${i}`
        new_button.addEventListener("click",change);
        document.getElementById('buttons').appendChild(new_button)
    }
}

function change(){
    //color handle
    var index = this.innerText;
    lastSelected_and_CurrentlySelected_buttonColorChanger(prev_index,index);
    prev_index=index;

    //update dom
    documentByIdInnerTextChanger({
        'question_read':`Question ${index}. ${questions_array[index].text}`,
        'question_content':questions_array[index].content,
        'surah':answers_array[index].surah,
        'ayat':answers_array[index].ayat,
        'pageNumber':answers_array[index].pageNumber
    })
    documentUpdateAnswerContent('answer_content',index);
    document.getElementById('question_audio').src=`file:///C:/Users/shabbir%20jodhpurwala/Desktop/shabbirj/quran_json/source/audio/${threezeroconvertor(answers_array[index].surah)}/${threezeroconvertor(answers_array[index].ayat)}.mp3`
    //hides answer
    document.getElementById('answer').style.display="none"
}
function lastSelected_and_CurrentlySelected_buttonColorChanger(prev_index,index){
    document.getElementById('buttons').childNodes[prev_index].style.backgroundColor="white";
    document.getElementById('buttons').childNodes[index].style.backgroundColor="aqua";
}
function documentUpdateAnswerContent(id_name,index){
    document.getElementById(id_name).innerHTML='';
    for(let i=0;i<answers_array[index].content.length;i++){
        var new_p=document.createElement('p');
        new_p.style='text-align:right;'
        new_p.innerText=answers_array[index].content[i];
        document.getElementById('answer_content').appendChild(new_p)
    }
}
function documentByIdInnerTextChanger(param){
    for (const key in param) {
        const element = param[key];
        document.getElementById(key).innerText=element;
    }
}
function threezeroconvertor(number){
    b=JSON.stringify(number);
    c=b.padStart(3,"0");
    return c;
}
function answer_show(){
    document.getElementById('answer').style.display="block"
    const r = document.getElementById('right')
    const w = document.getElementById('wrong')
    r.style="background-color:green;"
    w.style="background-color:red;"
}
function rightClicked(){
    const r = wrong.findIndex(e=>e==prev_index)
    if(r>-1){
        wrong.splice(r,1)
    }
    right.push(prev_index);
}
function wrongClicked(){
    const r = right.findIndex(e=>e==prev_index)
    if(r>-1){
        right.splice(r,1)
    }
    wrong.push(prev_index)
}