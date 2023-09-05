function entrance(){
let name = localStorage.getItem("name");
let nameDate =localStorage.getItem("date");

if(name != null){
    alert('Добрый день, ' +name+'! Давно не виделись. В последний раз вы были у нас '+nameDate)
}
else{
    let date = new Date();
    let timeCheck = date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    let yourName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя.', 'Елена');
    localStorage.setItem("name", yourName);
    localStorage.setItem("date", timeCheck);
    
  }
}
entrance();