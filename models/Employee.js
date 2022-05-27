export default class Employee{

    constructor(first_name, last_name, email){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        //this.url_base = "https://api-test-jefrey.000webhostapp.com/";
        this.url_base = "http://api-employees.com.devel/";
    }

    setFirst_name(first_name){
        this.first_name = first_name;
    }

    getFirst_name(){
        return this.first_name;
    }

    setLast_name(last_name){
        this.last_name = last_name;
    }

    getLast_name(){
        return this.last_name;
    }

    setEmail(email){
        this.email = email;
    }

    getEmail(){
        return this.email;
    }
    
    createEmployee(origin){
        if(origin === "local"){
            var data = [];
            var database = localStorage.getItem('database');

            if(database == null){
                localStorage.setItem('database','[]');
            }

            database = localStorage.getItem('database');
            data = JSON.parse(database);

            var id = 0;
            var size = data.length;

            if(size == 0){
                var id = 0;
            }else{
                var last_item = data[size -1];
                id = last_item.id + 1;
            }

            var employee = {
                'id'        : id,
                'first_name': this.first_name,
                'last_name' : this.last_name,
                'email'     : this.email
            }

            data.push(employee);
            database = JSON.stringify(data);
            localStorage.setItem('database',database);
            
        }
        if(origin === "api"){
            
            var url = this.url_base + 'api/employee/create';
            var employee = {
                "first_name": this.first_name,
                "last_name" : this.last_name,
                "email"     : this.email
            }

            var str = JSON.stringify(employee);
            const data = new URLSearchParams();
            data.append('json', str);

            postData(url,data);
            
        }
    }

    getEmployeeById(id, origin){

        if(origin === "local"){
            var data_base = localStorage.getItem('database');
                
            if(data_base != null){

                var data = JSON.parse(data_base);

                data.forEach(employee => {
                    if(employee.id == id){
                        this.id = employee.id;
                        this.last_name = employee.last_name;
                        this.first_name = employee.first_name;
                        this.email = employee.email;                  
                    }
                })

                return {};
            }
            return {};
        }

        if(origin === "api"){
            var url = this.url_base + 'api/employee/'+id;
            var data = getEmployee(url).then( response => response.json())
            .then(data => {
                this.id = data.id;
                this.last_name = data.last_name;
                this.first_name = data.first_name;
                this.email = data.email;                   
            });     
            //console.log( await getData(url));
            return data;
        }
    }

    async deleteSelected(selected, origin){

        if(origin === "local"){
            var data_base = localStorage.getItem('database');
            
            if(data_base != null){

                var data = JSON.parse(data_base);
                //console.log(selected.length);
                for(var i = 0; i < selected.length; i++){
                    
                    data.forEach((employee, index) => {
                        //console.log(selected.item(i).checked);
                        if(employee.id == selected.item(i).value && selected.item(i).checked){
                            data.splice(index,1);            
                        }
                    })       
                }           
            }

            localStorage.removeItem('database');
            var database = JSON.stringify(data);
    
            localStorage.setItem('database', database);
        }

        if(origin === "api"){

            var ids = "";
            var selected_checked =  [];
            for(var i = 0; i < selected.length; i++){       
                if(selected.item(i).checked){
                    console.log(selected.item(i).value);
                    ids += selected.item(i).value +"_";
                    selected_checked.push(selected.item(i).value);           
                }               
            }  

            var str_selected_checked = JSON.stringify(selected_checked);

            const form = new URLSearchParams();
            form.append('json', str_selected_checked);

            var url = this.url_base + 'api/employee/delete_selected/'+ids;
            var data = await deleteEmployees_selected(url)
            .then(data => {
                return data;
            });          
            //console.log( await getData(url));
            return data;

        }    
       
    }

    async deleteEmployeeById(id, origin){
        if(origin === "local"){
            var data_base = localStorage.getItem('database');
            
            if(data_base != null){

                var data = JSON.parse(data_base);

                data.forEach((employee, index) => {
                    if(employee.id == id){
                        data.splice(index,1);            
                    }
                })
            }

            localStorage.removeItem('database');
            var database = JSON.stringify(data);
    
            localStorage.setItem('database', database);
        }
        
        if(origin === "api"){
            var url = this.url_base + 'api/employee/delete_employee/'+id;
            var data = await deleteEmployee(url)
            .then(data => {
                return data;
            });          
            //console.log( await getData(url));
            return data;
        }
    }

    updateEmployeeById(id, origin){
        if(origin === "local"){
            var data_base = localStorage.getItem('database');
            
            if(data_base != null){

                var data = JSON.parse(data_base);

                data.forEach(employee => {
                    if(employee.id == id){
                        employee.last_name = this.last_name;
                        employee.first_name = this.first_name;
                        employee.email = this.email;                   
                    }
                })
            }
        
        
            localStorage.removeItem('database');
            var database = JSON.stringify(data);

            localStorage.setItem('database', database);
        }

        if(origin === "api"){
            
            var url = this.url_base + 'api/employee/update';
            var employee = {
                "id": id,
                "first_name": this.first_name,
                "last_name" : this.last_name,
                "email"     : this.email
            }

            var str = JSON.stringify(employee);
            const data = new URLSearchParams();
            data.append('json', str);

            updateData(url, data);
            
        }
    }

    listAllEmployees(origin){
        if(origin === "local"){
            var data_base = localStorage.getItem('database');
            
            if(data_base != null){
                var data = JSON.parse(data_base);
                return data;
            }else{
                return {};
            }
        }
        if(origin === "api"){
            //http://api-test-jefrey.000webhostapp.com/
            var url = this.url_base + 'api/employee/index';
           
            var data = getData(url).then( response => response.json())
            .then(data => {
                return data;
            });     
            //console.log( await getData(url));
            return data;
        }
    }

    async search_list(search, origin){
        if(origin === "local"){
            var data = [];
            var data_filtered = [];

            var data_base = localStorage.getItem('database');
            
            if(data_base != null){

                data = JSON.parse(data_base);

                data.forEach(employee => {
                    if(employee.first_name.toUpperCase() == search.toUpperCase()){
                        data_filtered.push(employee);
                    }
                })

                return data_filtered;
            }else{
                return {};
            }

        }
        if(origin === "api"){
            var url = this.url_base + 'api/employee/search/'+search;
            var data = await getData(url).then( response => response.json())
            .then(data => {
                console.log(data);
                return data;
            });     
            //console.log( await getData(url));
            return data;
        }
    }
}

async function postData(url, data ) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: data 
      });

    return response.json(); 
}

async function deleteEmployee(url) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
      });
      //.then(res => res.text()) // or res.json()
      //.then(res => console.log(res));
    //console.log(response.json());
    return response.json();
}

async function deleteEmployees_selected(url, data) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
    });

    return response.json();
}

async function getData(url) {
    const response = await fetch(url,{
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
    });
    //console.log(response.json());
    return response;
}

async function getEmployee(url) {
    const response = await fetch(url);
    //console.log(response.json());
    return response;
}

async function updateData(url, data ) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          //'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
      });

    return response.json(); 
}