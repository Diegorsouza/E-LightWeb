//apos o carregamento da pagina e executado a funcao abaixo
window.onload = cadastrar;

//area para criação de variaves globais, utilizadas no projeto

var informacoesFormularioEquipe;
var refEquipe;
var tabelaListarEquipe;
var CREATE = "Adicionar Equipe";
var UPDATE = "Atualizar Equipe";
var valorBotao = CREATE;
var refEquipeEditar;

function cadastrar()
{
	//recupera o id do formulario de cadastro das informacoes da equipe
	informacoesFormularioEquipe = document.getElementById("cadastraequipe");
	//recupera o id da tabela que lista Equipe
  tabelaListarEquipe = document.getElementById("tabela-listar-Equipe");
	//evento acionado quando é submetido o formulario, chamando a funcao cadastrar equipe
	informacoesFormularioEquipe.addEventListener("submit", enviarInformacoesEquipe,false);
	//referencia o no raiz e acessa o no filho neste caso Equipe
	refEquipe = firebase.database().ref().child("equipe");
  exibirEquipe();
}


function exibirEquipe(){
	refEquipe.on("value",function(snap)
		{
		var dadosEquipe = snap.val();
		var infEquipe = "";
		for(var cont in dadosEquipe)
			{
				infEquipe += "<tr>"+
												"<td>" +  dadosEquipe[cont].nome + "</td>"+
												'<td>'+'<img src="'+  dadosEquipe[cont].logo + '">' +"</td>"+

                        //chaveEquipe terá a posição que será excluida
												'<td>' +
                            '<button class="btn apagar" chaveEquipeLista="'+ cont +'">'+'Excluir'+
                            '</button>'+
                        '</td>'+
												'<td>' +
                            '<button class="btn editar" chaveEquipeLista="'+ cont +'">'+'Editar'+
                            '</button>'+
                        '</td>'+
										 "</tr>"	;
			}
			tabelaListarEquipe.innerHTML = infEquipe;
      if(infEquipe != ""){
        var chaveInfEquipeApagar = document.getElementsByClassName("apagar");
        for(var i = 0; i <chaveInfEquipeApagar.length; i++){
          chaveInfEquipeApagar[i].addEventListener("click",apagarInfEquipe,false)
        }
				var chaveInfEquipeEditar = document.getElementsByClassName("editar");
				for(var i = 0; i <chaveInfEquipeEditar.length; i++){
					chaveInfEquipeEditar[i].addEventListener("click",editarInfEquipe,false)
				}
      }


		});

}
function editarInfEquipe(){
	var chaveEquipeEditar = this.getAttribute("chaveEquipeLista");
	refEquipeEditar = refEquipe.child(chaveEquipeEditar);
	refEquipeEditar.once("value", function(snap) {
		var dadosEquipe = snap.val();
		document.getElementById("nome_equipe").value = dadosEquipe.nome;
		document.getElementById("logo_equipe").value = dadosEquipe.logo;

	});
	document.getElementById("btn_cadastrar_equipe").value = UPDATE;
	valorBotao = UPDATE;
}

function enviarInformacoesEquipe(event)
{
	//entender este comando
	event.preventDefault();
	switch(valorBotao){
		case CREATE:
		refEquipe.push(
				{
				nome: event.target.nome_equipe.value,
				logo: event.target.logo_equipe.value
				});
		break;
		case UPDATE:
		refEquipeEditar.update(
			{
				nome: event.target.nome_equipe.value,
				logo: event.target.logo_equipe.value
		});
		break;

	}
	//reseta as informações do formulario
	informacoesFormularioEquipe.reset();
	valorBotao = CREATE;
	document.getElementById("btn_cadastrar_equipe").value = CREATE;

}

function apagarInfEquipe(){
  var chaveEquipeApagar = this.getAttribute("chaveEquipeLista");
  var refEquipeApagar = refEquipe.child(chaveEquipeApagar);
  refEquipeApagar.remove();
}
