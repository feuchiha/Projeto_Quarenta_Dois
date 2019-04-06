// window.onload=function(){
//     var modal = document.getElementById("ButtonImportURL");
//     modal.addEventListener("click", carregaModal);
//     var fechaM = document.getElementById("close");
//     fechaM.addEventListener("click", fechaModal);

// }

function carregaModal() {
    document.querySelector('.bg-modal').style.display = "flex";
}

function fechaModal() {
    document.querySelector('.bg-modal').style.display = "none";
}

$(document).ready(function(){
    var modal = document.getElementById("ButtonImportURL");
    modal.addEventListener("click", carregaModal);
    var fechaM = document.getElementById("close");
    fechaM.addEventListener("click", fechaModal);
})