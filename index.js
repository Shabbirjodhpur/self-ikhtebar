var surah_list=surah_txt
var juz_list=juz_all_data
var start,width;

function juzselected(num){
    var {   singlejuz,
            multiplefirstjuz,
            multiplelastjuz,
            singlejuz_blocksize,
            multiplejuz_blocksize } = documentByIdTextBoxValueExtractor([
        'singlejuz',
        'multiplefirstjuz',
        'multiplelastjuz',
        'singlejuz_blocksize',
        'multiplejuz_blocksize'
    ]);
    //juz is defined
    if(num==1) {
        anon(1,[singlejuz],singlejuz_blocksize)
    }
    if(num==2){
        anon(1,[multiplefirstjuz,multiplelastjuz],multiplejuz_blocksize)
    }
}
function surahwise(k){
    var {   surah_start,
            ayat_start,
            surah_end,
            ayat_end,
            surahwise_blocksize } = documentByIdTextBoxValueExtractor([
        'surah_start',
        'ayat_start',
        'surah_end',
        'ayat_end',
        'surahwise_blocksize'
    ]);
    anon(0,{surah_start,surah_end,ayat_start,ayat_end},surahwise_blocksize)
}
function execute(max_block_size){
    documentByIdInnerTextChanger({'dom_block':max_block_size})
    // function addButtonsToDom(start,width,max_block_size)
    ButtonsDom(start,width,max_block_size)
}
function anon(juz_defined,parameters,max_block_size){
    if(juz_defined==1){
        //juz wise
        if(parameters.length==1){
            var {surah_start,ayat_start,surah_end,ayat_end} = juzCalculator('single',parameters);
        }
        if(parameters.length==2){
            var {surah_start,ayat_start,surah_end,ayat_end} = juzCalculator('multiple',parameters)
        }
    }
    if(juz_defined==0){
        //surah wise
       var {surah_start,surah_end,ayat_start,ayat_end} = parameters
    }
    [start,width] = getStartAndWidth({surah_start,ayat_start,surah_end,ayat_end})

    documentByIdInnerTextChanger({
        'dom_surahstart':surah_start,
        'dom_ayatstart':ayat_start,
        'dom_surahend':surah_end,
        'dom_ayatend':ayat_end,
        'start':start,
        'width':width
    })
    execute(max_block_size)
}
function juzCalculator(singleormultiple,parameters) {
    if(singleormultiple=='single'){
        var {surah_start,ayat_start} = getSurahAyatStarting(parameters[0])
        var {surah_end,ayat_end} = getSurahAyatEnding(parameters[0])
    }
    if(singleormultiple=='multiple'){
        var {surah_start,ayat_start} = getSurahAyatStarting(parameters[0])
        var {surah_end,ayat_end} = getSurahAyatEnding(parameters[1])
    }
    return {surah_start,surah_end,ayat_start,ayat_end}
}
function getSurahAyatStarting(juz_start){
    var surah_start=juz_list[juz_start][0].surah;
    var ayat_start=Number(juz_list[juz_start][0].verse.start.split("_")[1])
    return {surah_start,ayat_start}
}
function getSurahAyatEnding(juz_end){
    var surah_end=juz_list[juz_end][juz_list[juz_end].length-1].surah;
    var ayat_end=Number(juz_list[juz_end][juz_list[juz_end].length-1].verse.end.split("_")[1]);
    return {surah_end,ayat_end}
}
function getStartAndWidth(param){
    var {surah_start,surah_end,ayat_start,ayat_end} = param
    var start=0; var width=0;

    //defining start
    for(let i=0;i<surah_start-1;i++){
        start+=surah_list[i].verse_count;
    }
    start+=(ayat_start-1);

    //defining width
    if(surah_start==surah_end){
        width+=(ayat_end-ayat_start);
    } else if(surah_end==(surah_start+1)){
        width+=surah_list[surah_start-1].verse_count-ayat_start;
        width+=ayat_end;
    } else {
        width+=surah_list[surah_start-1].verse_count-ayat_start;
        let i=surah_start+1;
        while(i<surah_end){
            width+=surah_list[i-1].verse_count;
            i++;
        }
        width+=ayat_end;
    }
    return [start,width]
}
function documentByIdTextBoxValueExtractor(params){
    var parent = {};
    for(let i = 0;i < params.length;i++){
        parent[params[i]] = document.getElementById(params[i]).value;
    }
    return parent;
}