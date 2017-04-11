window.onload= function(){
    function GetUsers(){

    };
    GetUsers.prototype.init= function(){
        var self= this;
        this._btn= document.getElementById('btn');
        this.actionUi(self);
    };
    GetUsers.prototype.actionUi= function(self, trs){
        this._btn.onclick= function(event){
            event.preventDefault(); 
            self.request(self);          
        };
    };
    GetUsers.prototype.request= function(self){
        var xhr= new XMLHttpRequest();
        xhr.open("GET", "json/user.json", true);
        xhr.send();
        xhr.timeout= 10000;
        xhr.ontimeout= function(){
            alert('Нет ответа от сервера!')
        };
        xhr.onreadystatechange= function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                self._btn.style.display= "none";
                self.jsonParse(self, xhr);
            };
        };
    };
    GetUsers.prototype.jsonParse= function(self, xhr){
        var divWithInput= document.getElementById('divIn');
        var html= "<table><tr></tr></table>"
        divWithInput.insertAdjacentHTML("afterEnd", html);
        var tbody= document.querySelector("tbody");
        var data= JSON.parse(xhr.responseText);
        for(var i= 0, max= data.length; i<max; i++){
            var lastTr= tbody.lastElementChild;
            if(lastTr.childElementCount < 5){
                this.addTd(lastTr, data[i].name);
            }else{
                var tr= document.createElement('tr');
                tbody.appendChild(tr);
                this.addTd(tr, data[i].name);
            };
        };
        var tds= document.querySelectorAll("td");
        this.clickOnUser(self, data, tds);
    };
    GetUsers.prototype.addTd= function(tr, name){
        var td= document.createElement('td')
        var a= document.createElement('a');
        a.className= "waves-effect waves-light btn";
        a.textContent= name;
        td.appendChild(a);
        tr.appendChild(td);
    };
    GetUsers.prototype.clickOnUser= function(self, data, tds){
        for(var i= 0, max= tds.length; i<max; i++){
            tds[i].onclick= function(event){
                var nameFromTd= this.firstElementChild.textContent;
                for(var i= 0, max= data.length; i<max; i++){
                    if(nameFromTd == data[i].name){
                        data[i].createStr= function(){
                            return "Name: " + data[i].name + "<br>Gender: " + data[i].gender + "<br>Job: " + data[i].job;
                        };
                        var overlay= document.querySelector(".modal-overlay");
                        var modal= document.getElementById("modal1");
                        var span= document.querySelector(".container-text");
                        span.innerHTML= data[i].createStr();
                        overlay.style.display= "block";
                        modal.style.display= "block";
                        self.closeOnClick(modal, overlay, span);
                        break;
                    };
                };
            };
        };
    };
    GetUsers.prototype.closeOnClick= function(modal, overlay, span){
        var close= document.querySelector(".close");
        close.onclick= function(){
            overlay.style.display= "none";
            modal.style.display= "none";
        };
    };
    var users= new GetUsers();
    users.init();    
};