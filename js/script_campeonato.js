//apos o carregamento da pagina e executado a funcao abaixo
window.onload = cadastrar;

//area para criação de variaves globais, utilizadas no projeto

var informacoesFormularioCampeonato;
var refCampeonato;
var tabelaListarCampeonato;
var CREATE = "Adicionar Campeonato";
var UPDATE = "Atualizar Campeonato";
var valorBotao = CREATE;
var refCampeonatoEditar;

function cadastrar()
{
	//recupera o id do formulario de cadastro das informacoes do Campeonato
	informacoesFormularioCampeonato = document.getElementById("cadastracampeonato");
	//recupera o id da tabela que lista os Campeonatos
  tabelaListarCampeonato = document.getElementById("tabela-listar-Campeonato");
	//evento acionado quando é submetido o formulario, chamando a funcao cadastrar campeonato
	informacoesFormularioCampeonato.addEventListener("submit", enviarInformacoesCampeonato,false);
	//referencia o no raiz e acessa o no filho neste caso Campeonato
	refCampeonato = firebase.database().ref().child("campeonato");
  exibirCampeonato();
}


function exibirCampeonato(){
	refCampeonato.on("value",function(snap)
		{
		var dadosCampeonato = snap.val();
		var infCampeonato = "";
		for(var cont in dadosCampeonato)
			{
				infCampeonato += "<tr>"+
												"<td>" + cont + "</td>" +
												"<td>" +  dadosCampeonato[cont].nome + "</td>"+
                        //chaveCampeonato terá a posição que será excluida
												'<td>' +
                            '<button class="btn apagar" chaveCampeonatoLista="'+ cont +'">'+'Excluir'+
                            '</button>'+
                        '</td>'+
												'<td>' +
                            '<button class="btn editar" chaveCampeonatoLista="'+ cont +'">'+'Editar'+
                            '</button>'+
                        '</td>'+
										 "</tr>"	;
			}
			tabelaListarCampeonato.innerHTML = infCampeonato;
      if(infCampeonato != ""){
        var chaveInfCampeonatoApagar = document.getElementsByClassName("apagar");
        for(var i = 0; i <chaveInfCampeonatoApagar.length; i++){
          chaveInfCampeonatoApagar[i].addEventListener("click",apagarInfCampeonato,false)
        }
				var chaveInfCampeonatoEditar = document.getElementsByClassName("editar");
				for(var i = 0; i <chaveInfCampeonatoEditar.length; i++){
					chaveInfCampeonatoEditar[i].addEventListener("click",editarInfCampeonato,false)
				}
      }


		});

}
function editarInfCampeonato(){
	var chaveCampeonatoEditar = this.getAttribute("chaveCampeonatoLista");
	refCampeonatoEditar = refCampeonato.child(chaveCampeonatoEditar);
	refCampeonatoEditar.once("value", function(snap) {
		var dadosCampeonato = snap.val();
		document.getElementById("campeonato").value = dadosCampeonato.nome;
	});
	document.getElementById("btn_cadastrar_campeonato").value = UPDATE;
	valorBotao = UPDATE;
}

function enviarInformacoesCampeonato(event)
{
	//entender este comando
	event.preventDefault();
	switch(valorBotao){
		case CREATE:
		refCampeonato.push(
				{
				nome: event.target.campeonato.value
				});
		break;
		case UPDATE:
		refCampeonatoEditar.update(
			{
				nome: event.target.campeonato.value
		});
		break;
	}
	//reseta as informações do formulario
	informacoesFormularioCampeonato.reset();
	valorBotao = CREATE;
	document.getElementById("btn_cadastrar_campeonato").value = CREATE;

}

function apagarInfCampeonato(){
  var chaveCampeonatoApagar = this.getAttribute("chaveCampeonatoLista");
  var refCampeonatoApagar = refCampeonato.child(chaveCampeonatoApagar);
  refCampeonatoApagar.remove();
}
