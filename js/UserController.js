import Employee from "../models/Employee.js";
import Helpers from "./Helper.js";

window.addEventListener('load', () => {
    
    const urlContent = window.location.search;
    const urlParams = new URLSearchParams(urlContent);
    var title = document.getElementById('title');

    var Helper = new Helpers();
    Helper.check_origin();
    Helper.set_check_status();

    if ( urlParams.has('type')) {

        var type = urlParams.get('type');
  
        if (type === 'update') {
            if (!urlParams.has('id')){
                window.location.href = "index.html";
            }
            var switch_origin = document.getElementById('switch_origin');
            switch_origin.setAttribute('class','not_display');

            var form = document.getElementById('form_employee');
            var first_name = document.getElementById('first_name');
            var last_name = document.getElementById('last_name');
            var email = document.getElementById('email');

            var id = urlParams.get('id');
            title.innerHTML = "Update employee";
            var employee = new Employee("","","");
            var origin = Helper.getOrigin();

            if(origin == 'local'){
                employee.getEmployeeById(id, origin);

                first_name.value = employee.getFirst_name();
                last_name.value = employee.getLast_name();
                email.value = employee.getEmail();
            }else{
                employee.getEmployeeById(id, origin).then( data => {
                        first_name.value = employee.getFirst_name();
                        last_name.value = employee.getLast_name();
                        email.value = employee.getEmail();
                    }
                );     
            }

            form.addEventListener('submit',(e)=>{
                e.preventDefault();

                var employee = new Employee(first_name.value,last_name.value,email.value);
                employee.updateEmployeeById(id,origin);
                var div = document.createElement('div');
                div.setAttribute('class','alert alert-success');
                div.innerHTML = "Registry updated successfully";
                form.prepend(div);
                alert("Registry updated successfully");
                window.location.href = "index.html";
            })   
        }

        if (type === 'delete') {
            if (!urlParams.has('id')){
                window.location.href = "index.html";
            }
            var id = urlParams.get('id');
        }
        
        if (type === 'create') {
            title.innerHTML = "Create employee";

            var form = document.getElementById('form_employee');

            form.addEventListener('submit',(e)=>{
                e.preventDefault();

                var first_name = document.getElementById('first_name');
                var last_name = document.getElementById('last_name');
                var email = document.getElementById('email');

                var employee = new Employee(first_name.value,last_name.value,email.value);
                var origin = Helper.getOrigin();
                employee.createEmployee(origin);
                var div = document.createElement('div');
                div.setAttribute('class','alert alert-success');
                div.innerHTML = "Registry created successfully";
                form.prepend(div);
                alert("Registry created successfully");
                window.location.href = "index.html";
            })           

        } 

    } else {
        
        window.location.href = "index.html";
    
    }
})
