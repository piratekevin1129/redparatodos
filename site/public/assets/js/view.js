function obtenerDatosView(d,c,p,callback){
    var object_list = []
    for(i = 0;i<globaldata.data.length;i++){
        var item_data = globaldata.data[i]
        
        if(item_data.departamento==d&&item_data.ciudad==c&&item_data.plan==p){            
        //if(item_data.departamento==d&&item_data.ciudad==c){
            object_list.push({
                id:globaldata.data[i].id,
                plan:globaldata.data[i].plan,
                departamento:globaldata.data[i].departamento,
                ciudad:globaldata.data[i].ciudad,
                nombre_proveedor:globaldata.data[i].nombre_proveedor,
                servicio:globaldata.data[i].servicio,
                especificacion:globaldata.data[i].especificacion,
                nit:globaldata.data[i].nit,
                direccion:globaldata.data[i].direccion,
                complemento_direccion:globaldata.data[i].complemento_direccion,
                telefonos:globaldata.data[i].telefonos,
                horario_semana:globaldata.data[i].horario_semana,
                horario_festivo:globaldata.data[i].horario_festivo,
            })
        }
    }
    callback(object_list)
}