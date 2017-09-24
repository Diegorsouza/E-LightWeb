//apos o carregamento da pagina e executado a funcao abaixo
window.onload = cadastrar;

//area para criação de variaves globais, utilizadas no projeto

var informacoesFormularioPartida;
var refPartida;
var tabelaListarPartida;
var CREATE = "Adicionar Partida";
var UPDATE = "Atualizar Partida";
var valorBotao = CREATE;
var refPartidaEditar;

function cadastrar()
{
	//recupera o id do formulario de cadastro das informacoes da Partida
	informacoesFormularioPartida = document.getElementById("cadastrapartida");
	//recupera o id da tabela que lista as Partidas
  tabelaListarPartida = document.getElementById("tabela-listar-Partida");
	//evento acionado quando é submetido o formulario, chamando a funcao cadastrar Partida
	informacoesFormularioPartida.addEventListener("submit", enviarInformacoesPartida,false);
	//referencia o no raiz e acessa o no filho neste caso Partida
	refPartida = firebase.database().ref().child("partida");
  exibirPartida();
}


function exibirPartida(){
	refPartida.on("value",function(snap)
		{
		var dadosPartida = snap.val();
		var infPartida = "";
		for(var cont in dadosPartida)
			{
				infPartida += "<tr>"+
												"<td>" +  dadosPartida[cont].campeonato + "</td>"+
												"<td>" +  dadosPartida[cont].dataInicio + "</td>"+
												"<td>" +  dadosPartida[cont].dataTermino + "</td>"+
												"<td>" +  dadosPartida[cont].equipeAzul + "</td>"+
												"<td>" +  dadosPartida[cont].equipeVermelha + "</td>"+
												"<td>" +  dadosPartida[cont].tipo + "</td>"+
												"<td>" +  dadosPartida[cont].tipoPartida + "</td>"+

                        //chavePartida terá a posição que será excluida
												'<td>' +
                            '<button class="btn apagar" chavePartidaLista="'+ cont +'">'+'Excluir'+
                            '</button>'+
                        '</td>'+
												'<td>' +
                            '<button class="btn editar" chavePartidaLista="'+ cont +'">'+'Editar'+
                            '</button>'+
                        '</td>'+
										 "</tr>"	;
			}
			tabelaListarPartida.innerHTML = infPartida;
      if(infPartida != ""){
        var chaveInfPartidaApagar = document.getElementsByClassName("apagar");
        for(var i = 0; i <chaveInfPartidaApagar.length; i++){
          chaveInfPartidaApagar[i].addEventListener("click",apagarInfPartida,false)
        }
				var chaveInfPartidaEditar = document.getElementsByClassName("editar");
				for(var i = 0; i <chaveInfPartidaEditar.length; i++){
					chaveInfPartidaEditar[i].addEventListener("click",editarInfPartida,false)
				}
      }


		});

}
function editarInfPartida(){
	var chavePartidaEditar = this.getAttribute("chavePartidaLista");
	refPartidaEditar = refPartida.child(chavePartidaEditar);
	refPartidaEditar.once("value", function(snap) {
		var dadosPartida = snap.val();
		document.getElementById("nome_campeonato").value = dadosPartida.campeonato;
		document.getElementById("data_inicio").value = dadosPartida.dataInicio;
		document.getElementById("data_termino").value = dadosPartida.dataTermino;
		document.getElementById("equipe_azul").value = dadosPartida.equipeAzul;
		document.getElementById("equipe_vermelha").value = dadosPartida.equipeVermelha;
		document.getElementById("tipo").value = dadosPartida.tipo;
		document.getElementById("tipo_partida").value = dadosPartida.tipoPartida;

	});
	document.getElementById("btn_cadastrar_partida").value = UPDATE;
	valorBotao = UPDATE;
}

function enviarInformacoesPartida(event)
{
	//entender este comando
	event.preventDefault();
	switch(valorBotao){
		case CREATE:
		refPartida.push(
				{
				campeonato: event.target.nome_campeonato.value,
				dataInicio: event.target.data_inicio.value,
				dataTermino: event.target.data_termino.value,
				equipeAzul: event.target.equipe_azul.value,
				equipeVermelha: event.target.equipe_vermelha.value,
				tipo: event.target.tipo.value,
				tipoPartida: event.target.tipo_partida.value
				});
		break;
		case UPDATE:
		refPartidaEditar.update(
			{
				campeonato: event.target.nome_campeonato.value,
				dataInicio: event.target.data_inicio.value,
				dataTermino: event.target.data_termino.value,
				equipeAzul: event.target.equipe_azul.value,
				equipeVermelha: event.target.equipe_vermelha.value,
				tipo: event.target.tipo.value,
				tipoPartida: event.target.tipo_partida.value
		});
		break;
	}
	//reseta as informações do formulario
	informacoesFormularioPartida.reset();
	valorBotao = CREATE;
	document.getElementById("btn_cadastrar_partida").value = CREATE;

}

function apagarInfPartida(){
  var chavePartidaApagar = this.getAttribute("chavePartidaLista");
  var refPartidaApagar = refPartida.child(chavePartidaApagar);
  refPartidaApagar.remove();
}
