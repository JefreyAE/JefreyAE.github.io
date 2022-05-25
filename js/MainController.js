import Employee from "../models/Employee.js";
import Helpers from "./Helper.js";


const urlContent = window.location.search;
const urlParams = new URLSearchParams(urlContent);

window.addEventListener('load', () => {
    
    var btn_search = document.getElementById('btn_search');
    var btn_reset = document.getElementById('btn_reset');
    var btn_delete_selected = document.getElementById('btn_delete_selected');

    var employee = new Employee();
    
    var Helper = new Helpers();
    Helper.check_origin();
    Helper.set_check_status();

    if (urlParams.has('type')) {
        var type = urlParams.get('type');
        if (type === 'delete') {

            var origin = Helper.getOrigin();
            
            if(urlParams.has('id')){
                var id = urlParams.get('id');
                if(origin === 'local'){
                    employee.deleteEmployeeById(id, origin);
                    window.location.href = "index.html";
                }else{
                    try{
                        employee.deleteEmployeeById(id, origin).then(
                            data => { list_all(origin); }
                        );
                    }catch(e){
                        window.location.href = "index.html";
                    }
                }
            }else{
                window.location.href = "index.html";
            }
        }

    } else {
        var origin = Helper.getOrigin();
        list_all(origin);
    } 

    btn_delete_selected.addEventListener('click', ()=>{
        var selected = document.getElementsByClassName('check_item');

        var origin = Helper.getOrigin();

        if(origin === 'local'){
            employee.deleteSelected(selected, 'local');
            list_all(origin);
        }else{
            employee.deleteSelected(selected, 'api').then(data => list_all(origin));
        }

    });

    btn_search.addEventListener('click', ()=>{
        var origin = Helper.getOrigin();
        search(origin);
    });

    btn_search.addEventListener('keypress', (e)=>{
        if (e.key === "enter") {
            var origin = Helper.getOrigin();
            search(origin);
        }
    });

    btn_reset.addEventListener('click', ()=>{
        var input_search = document.getElementById('search');
        input_search.value = "";
        var origin = Helper.getOrigin();
        list_all(origin);
    });

    var check_origin = document.getElementById('flexSwitchCheckChecked');

    check_origin.addEventListener('change', ()=>{
        var origin = Helper.getOrigin();
        list_all(origin);
    })

    function list_all(origin){
        
        if(origin == "local"){
            var list_employees = employee.listAllEmployees('local');
            displayEmployeeList(list_employees);
            //add_listeners_btns_delete()
        }else{
            employee.listAllEmployees('api').then(data => {
                displayEmployeeList(data);
                //add_listeners_btns_delete();
            });
        }  
    }

    function search(origin){
        var input_search = document.getElementById('search');
        if(origin == "local"){
            var list_employees = employee.search_list(input_search.value, 'local');
            displayEmployeeList(list_employees);
        }
        if(origin == "api"){
            employee.search_list(input_search.value, 'api').then(data => displayEmployeeList(data));
        }     
    }

    function displayEmployeeList(data) {
        var table_body = document.getElementById('t_body');
        table_body.innerHTML = ""
        var plantilla = ``;

        //data.then(list => console.log(list));
        
        data.forEach(element => {
            plantilla += `<tr><td><input class="check_item" type="checkbox" value="${
                element.id
            }"></td>
        <td>${
                element.first_name
            } ${
                element.last_name
            }</td>
        <td>${
                element.email
            }</td>
        <td class="action-buttons">
            <div class="btn-group">
                <a href="addemployee.html?id=${
                element.id
            }&type=update" type="button" class="btn btn-outline-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    <span class="visually-hidden">Button</span>
                </a>
                <a  href="index.html?id=${
                    element.id
                }&type=delete" type="button" class="btns_delete btn btn-outline-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    <span class="visually-hidden">Button</span>
                </a>  
            </div>
        </td></tr>`
        });
        table_body.innerHTML = plantilla;
    }


    function add_listeners_btns_delete(){
        var btns_delete = document.getElementsByClassName('btns_delete');
        console.log(btns_delete.item(0));
        for(var i = 0; i < btns_delete.length; i++){
            btns_delete.item(i).addEventListener('click', (e)=>{
                console.log(e.target);
                /*var origin = Helper.getOrigin();

                if(origin === 'local'){
                    //employee.deleteEmployeeById(e.target.id, origin);
                    window.location.href = "index.html";
                }else{
                    try{
                        //employee.deleteEmployeeById(e.target.id, origin).then(
                         //   data => { list_all(origin); }
                        //);
                    }catch(e){
                        window.location.href = "index.html";
                    }
                }
                */
            }, false);
        }
    }
})
