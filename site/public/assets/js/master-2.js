function getE(idname){
    return document.getElementById(idname)
}

var i = 0;
var j = 0;
var k = 0;

function resetResults(key){
    getE('dpe-'+key+'-results').innerHTML = ''
    getE('dpe-'+key+'-value').value = ''
    getE('dpe-'+key+'-value2').value = ''
    getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-off'
}
function inArray(haystack,needle){
    var is_in_array = false
    for(var e = 0;e<haystack.length;e++){
        if(haystack[e]==needle){
            is_in_array = true
        }
    }
    return is_in_array
}

function findIdDepartamentos(needle, haystack){
    var id_needle = -1
    for (var h = 0;h<haystack.length;h++){
        if(haystack[h][0]==needle){
            id_needle = haystack[h][1]
        }
    }
    return id_needle
}

function findAnexoPlan(plan_txt){
    var plan_anexo = ''
    if(plan_txt=='Preferencial'){
        plan_anexo = ' - Antiguo Preferencial (PAC)'
    }else if(plan_txt=='Clasico'){
        plan_anexo = ' - Antiguo Plus (PAC)'
    }else if(plan_txt=='Esencial'){
        plan_anexo = ' - Antiguo Básico (PAC)'
    }
    return plan_anexo
}

var departamentos = []
var departamentos_id = []
var ciudades = []
var ciudades_id = []
var planes = []
var planes_id = []


function updateResults(key,values){
    var html = ''
    var repetidos = []
    
    if(key=='departamento'){
        departamentos = []
        departamentos_id = []
        for(i = 0;i<items_data.length;i++){
            var item_data = items_data[i]
            
            if(!inArray(repetidos,item_data.departamento)){
                departamentos.push(item_data.departamento)
                departamentos_id.push([item_data.departamento, item_data.id])
                repetidos.push(item_data.departamento)
            }
        }

        //ordenarlos
        departamentos.sort()

        for(i = 0;i<departamentos.length;i++){
            var id_departamento = findIdDepartamentos(departamentos[i],departamentos_id)
            html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(departamentos[i]).toLowerCase())+'" value="'+departamentos[i]+'" onclick="clickItemBuscador('+id_departamento+',this,'+"'departamento'"+')">'
                html+='<p>'+departamentos[i]+'</p>'
            html+='</div>'
        }
        
    }else if(key=='ciudad'){
        ciudades = []
        ciudades_id = []
        for(i = 0;i<items_data.length;i++){
            var item_data = items_data[i]
            if(item_data.departamento==values[0]){
                if(!inArray(repetidos,item_data.ciudad)){
                    ciudades.push(item_data.ciudad)
                    ciudades_id.push([item_data.ciudad, item_data.id])
                    repetidos.push(item_data.ciudad)
                }
            }
        }

        //ordenarlos
        ciudades.sort()

        for(i = 0;i<ciudades.length;i++){
            var id_ciudad = findIdDepartamentos(ciudades[i],ciudades_id)
            //value2 = departamento
            //value = ciudad
            html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(ciudades[i]).toLowerCase())+'" value="'+ciudades[i]+'" value2="'+values[0]+'" onclick="clickItemBuscador('+id_ciudad+',this,'+"'ciudad'"+')">'
                html+='<p>'+ciudades[i]+'</p>'
            html+='</div>'
        }
    }else if(key=='plan'){
        planes = []
        planes_id = []

        for(i = 0;i<items_data.length;i++){
            var item_data = items_data[i]
            if(item_data.ciudad==values[0]&&item_data.departamento==values[1]){
                if(!inArray(repetidos,item_data.plan)){
                    planes.push(item_data.plan)
                    planes_id.push([item_data.plan, item_data.id])
                    repetidos.push(item_data.plan)
                }
            }
        }
        //ordernarlos
        planes.sort()

        for(i = 0;i<planes.length;i++){
            var id_plan = findIdDepartamentos(planes[i],planes_id)
            var anexo_plan = findAnexoPlan(planes[i])
            html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(planes[i]).toLowerCase())+'" value="'+planes[i]+'" onclick="clickItemBuscador('+id_plan+',this,'+"'plan'"+')">'
                html+='<p>'+planes[i]+anexo_plan+'</p>'
            html+='</div>'
        }
    }
    getE('dpe-'+key+'-results').innerHTML = html
}

function clickItemBuscador(id,div,key){
    getE('dpe-'+key+'-value').value = id
    getE('dpe-'+key+'-value2').value = div.getAttribute('value')
    getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-off'

    if(key=='departamento'){
        //reiniciar los de abajo
        resetResults('ciudad')
        resetResults('plan')

        updateResults('ciudad',[div.getAttribute('value')])
        getE('dpe-ciudad-value2').focus()
    }else if(key=='ciudad'){
        //reiniciar los de abajo
        resetResults('plan')
        
        updateResults('plan',[div.getAttribute('value'), div.getAttribute('value2')])
        getE('dpe-plan-value2').focus()
    }else if(key=='plan'){
        
    }

    //comprobar que si haya valor en los 3
    
    var val_departamento = getE('dpe-departamento-value').value
    var val_ciudad = getE('dpe-ciudad-value').value
    var val_plan = getE('dpe-plan-value').value
    
    if(isempty(val_departamento)||isempty(val_ciudad)||isempty(val_plan)){
    //if(isempty(val_departamento)||isempty(val_ciudad)){
        getE('dpe-buscar-btn').className = 'dpe-buscar-btn-locked'
        getE('dpe-buscar-btn').disabled = true
    }else{
        getE('dpe-buscar-btn').classList.remove('dpe-buscar-btn-locked')
        getE('dpe-buscar-btn').disabled = false
    }
}

function buscarItemBuscador(input,key){
    var texto = input.value
    if(!isempty(texto)){
        var items_div = getE('dpe-'+key+'-results').getElementsByClassName('dpe-buscador-result')
        //set all hidde
        for(i = 0;i<items_div.length;i++){
            items_div[i].className = 'dpe-buscador-result dpe-buscador-result-hidden'
        }

        for(i = 0;i<items_div.length;i++){
            var tag1 = items_div[i].getAttribute('tag')
            var tag = htmlscope(tag1)
            var txt_min = texto.toLowerCase()
            var texto_min = htmlscope(txt_min)

            if(tag.indexOf(texto_min)!=-1){
                items_div[i].className = 'dpe-buscador-result'
            }
        }
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-on'
    }else{
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-off'
    }
}

function selectItemBuscador(input,key){
    var texto = input.value

    //mirar opciones del result
    var opciones = getE('dpe-'+key+'-results').getElementsByClassName('dpe-buscador-result')
    if(opciones.length>0){
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-on'
    }
    
    getE(key+'-field').classList.add('dpe-buscador-input-selected')

    if(key=='departamento'){
        getE('dpe-ciudad-results').className = 'dpe-buscador-results dpe-buscador-results-off'
    }else if(key=='ciudad'){
        getE('dpe-plan-results').className = 'dpe-buscador-results dpe-buscador-results-off'
    }else if(key=='plan'){

    }
}

function cancelItemBuscador(key){
    getE('dpe-'+key+'-value').value = ''
    getE('dpe-'+key+'-value2').value = ''
    getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-off'
    getE(key+'-field').classList.remove('dpe-buscador-input-selected')
}


/******************************************/


function buscarResultados(btn){
    //optener servicios seleccionados
    
    var departamento_txt = getE('dpe-departamento-value2').value
    var ciudad_txt = getE('dpe-ciudad-value2').value
    var plan_txt = getE('dpe-plan-value2').value

    var error_txt = ""
    if(isempty(departamento_txt)){
        error_txt = 'Debes seleccionar un departamento'
    }
    if(isempty(ciudad_txt)){
        error_txt = 'Debes seleccionar una ciudad'
    }
    if(isempty(plan_txt)){
        error_txt = 'Debes seleccionar un plan'
    }

    if(error_txt!=""){
        setAlertText('dpe-resultados-alert','<span></span> '+error_txt)
    }else{
        btn.innerHTML = '<span></span>BUSCANDO'
        getE('dpe-resultados-alert').className = 'dpe-resultados-off'
        getE('dpe-resultados-loader').className = 'dpe-resultados-on'
        getE('dpe-resultados-table').className = 'dpe-resultados-off'

        obtenerDatosView(departamento_txt,ciudad_txt,plan_txt,function(result){
            btn.innerHTML = '<span></span>BUSCAR'
            getE('dpe-resultados-loader').className = 'dpe-resultados-off'

            //console.log(result)
            global_data = result
            if(global_data.length=='0'){
                getE('dpe-resultados-alert').className = 'dpe-resultados-on'
                setAlertText('dpe-resultados-alert','No se encontraron resultados con estas características')
            }else{
                getE('dpe-resultados-table').className = 'dpe-resultados-on'
                loadResults()
            }
        })
        
    }
}

var global_data = null
var global_data_ordered = []
var letters_ordered = []
var letters_ref = [
    {x:1,v:'a'},
    {x:2,v:'b'},
    {x:3,v:'c'},
    {x:4,v:'d'},
    {x:5,v:'e'},
    {x:6,v:'f'},
    {x:7,v:'g'},
    {x:8,v:'h'},
    {x:9,v:'i'},
    {x:10,v:'j'},
    {x:11,v:'k'},
    {x:12,v:'l'},
    {x:13,v:'m'},
    {x:14,v:'n'},
    {x:15,v:'ñ'},
    {x:16,v:'o'},
    {x:17,v:'p'},
    {x:18,v:'q'},
    {x:19,v:'r'},
    {x:20,v:'s'},
    {x:21,v:'t'},
    {x:22,v:'u'},
    {x:23,v:'v'},
    {x:24,v:'w'},
    {x:25,v:'x'},
    {x:26,v:'y'},
    {x:27,v:'z'}
]

function findLetter(l){
    var indx = 0
    for(var ix = 0;ix<letters_ref.length;ix++){
        if(letters_ref[ix].v==l){
            indx = letters_ref[ix].x
        }
    }
    return indx
}

function loadResults(){
    getE('dpe-resultados-body').innerHTML = ''
    
    //ordernar
    global_data_ordered = []
    letters_ordered = []

    for(i = 0;i<letters_ref.length;i++){
        var l = letters_ref[i].v

        for(j = 0;j<global_data.length;j++){
            var l1 = global_data[j].especificacion[0].toLowerCase()
            //var l2 = global_data[i].especificacion[1].toLowerCase()

            if(l1==l){
                //l_array.push(id:global_data[j].id,l1)
                letters_ordered.push([global_data[j].id,j])
            }
        }
    }

    for(i = 0;i<letters_ordered.length;i++){
        var div_row = document.createElement('div')
        div_row.className = 'dpe-resultados-row'
        var h = ''
        
        var result_data = global_data[letters_ordered[i][1]]
        h+='<div class="dpe-resultados-col">'+result_data.nombre_proveedor+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.servicio+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.especificacion+'</div>'
        h+='<div class="dpe-resultados-col"><button type="button" onclick="mostrarMas('+result_data.id+','+letters_ordered[i][1]+')" class="dpe-ver-servicios-btn">Ver más</button></div>'
        div_row.innerHTML = h

        getE('dpe-resultados-body').appendChild(div_row)
    }

    /*for(i = 0;i<global_data.length;i++){
        var div_row = document.createElement('div')
        div_row.className = 'dpe-resultados-row'
        var h = ''
        
        var result_data = global_data[i]
        h+='<div class="dpe-resultados-col">'+result_data.nombre_proveedor+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.servicio+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.especificacion+'</div>'
        h+='<div class="dpe-resultados-col"><button type="button" onclick="mostrarMas('+result_data.id+','+i+')" class="dpe-ver-servicios-btn">Ver más</button></div>'
        div_row.innerHTML = h

        getE('dpe-resultados-body').appendChild(div_row)
        
    }*/
    jQuery('html, body').animate({
        scrollTop: jQuery("#dpe-resultados-container").offset().top
        //scrollTop: 0
    }, 500);
}


function mostrarMas(id,ind){
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[0].innerHTML = global_data[ind].plan
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[1].innerHTML = global_data[ind].departamento
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[2].innerHTML = global_data[ind].ciudad
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[3].innerHTML = global_data[ind].nombre_proveedor
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[4].innerHTML = global_data[ind].servicio
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[5].innerHTML = global_data[ind].especificacion
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[6].innerHTML = global_data[ind].nit
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[7].innerHTML = global_data[ind].direccion
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[8].innerHTML = global_data[ind].complemento_direccion
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[9].innerHTML = global_data[ind].telefonos
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[10].innerHTML = global_data[ind].horario_semana
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[11].innerHTML = global_data[ind].horario_festivo

    if(global_data[ind].horario_semana==""){
        getE('horario_semana_row').style.display = 'none'
    }else{
        getE('horario_semana_row').style.display = 'flex'
    }

    if(global_data[ind].horario_festivo==""){
        getE('horario_festivo_row').style.display = 'none'
    }else{
        getE('horario_festivo_row').style.display = 'flex'
    }

    getE('modal-red').className = 'modal-red-on'
    //obtener window height
}



function unsetModalRed(){
    getE('modal-red').className = 'modal-red-off'
}

function setAlertText(idname,msg){
    getE(idname).innerHTML = '<div><span></span>'+msg+'</div>'
}

function IsJsonString(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isempty(value){
    var value1 = value.trim()
    if(value1==""){
        return true
    }else{
        return false
    }
}

function htmlscope(txt){
    var t1 = txt.replace(new RegExp('á', 'g'),'a')
    var t2 = t1.replace(new RegExp('é', 'g'),'e')
    var t3 = t2.replace(new RegExp('í', 'g'),'i')
    var t4 = t3.replace(new RegExp('ó', 'g'),'o')
    var t5 = t4.replace(new RegExp('ú', 'g'),'u')
    var t6 = t5.replace(new RegExp('ü', 'g'),'u')
    return t6
}

function parseHtmlEntities(str){
    var txta = document.createElement('textarea');
	txta.innerHTML = str;
    var value = txta.value
    txta = null
	return value;
    
}
