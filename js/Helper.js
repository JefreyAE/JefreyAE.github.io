
export default class Helpers{

    constructor(){
        var origin = localStorage.getItem('origin');

        if(origin == null){
            localStorage.setItem('origin', 'local');
        }

    }

    getOrigin(){
        var origin = localStorage.getItem('origin');

        if(origin == 'local'){
            return origin;
        }else{
            return 'api';
        }
    }

    set_check_status(){
        var check_origin = document.getElementById('flexSwitchCheckChecked');

        var origin = localStorage.getItem('origin');

        if(origin == 'local'){
            check_origin.checked = false;
        }else{
            check_origin.checked = true;
        }
    }
    

    check_origin(){

        var check_origin = document.getElementById('flexSwitchCheckChecked');

        check_origin.addEventListener('change', ()=>{

            var origin = localStorage.getItem('origin');

            if(origin == null){
                localStorage.setItem('origin', 'local');
            }

            if(check_origin.checked){
                localStorage.setItem('origin', 'api');
            }else{
                localStorage.setItem('origin', 'local');
            }

        })
    }

}