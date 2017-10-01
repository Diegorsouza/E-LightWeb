//apos o carregamento da pagina e executado a funcao abaixo
window.onload = cadastrar;

//area para criação de variaves globais, utilizadas no projeto

var informacoesFormularioJogador;
var refJogador;
var tabelaListarJogador;
var CREATE = "Adicionar Jogador";
var UPDATE = "Atualizar Jogador";
var valorBotao = CREATE;
var refJogadorEditar;

function cadastrar()
{
	//recupera o id do formulario de cadastro das informacoes do Jogador
	informacoesFormularioJogador = document.getElementById("cadastrajogador");
	//recupera o id da tabela que lista os Jogadores
  tabelaListarJogador = document.getElementById("tabela-listar-Jogador");
	//evento acionado quando é submetido o formulario, chamando a funcao cadastrar jogadores
	informacoesFormularioJogador.addEventListener("submit", enviarInformacoesJogador,false);
	//referencia o no raiz e acessa o no filho neste caso jogador
	refJogador = firebase.database().ref().child("jogador");
  exibirJogador();
}


function exibirJogador(){
	refJogador.on("value",function(snap)
		{
		var dadosJogadores = snap.val();
		var infJogadores = "";
		for(var cont in dadosJogadores)
			{
				infJogadores += "<tr>"+
												"<td>" +  dadosJogadores[cont].nome + "</td>"+
												"<td>" +  dadosJogadores[cont].equipe + "</td>"+
												"<td>" +  dadosJogadores[cont].campeao + "</td>"+
												'<td>' +
                            '<button class="btn editar" chaveJogadorLista="'+ cont +'">'+'Editar'+
                            '</button>'+
                        '</td>'+
										 "</tr>"	;
			}
			tabelaListarJogador.innerHTML = infJogadores;
      if(infJogadores != ""){
				var chaveInfJogadorEditar = document.getElementsByClassName("editar");
				for(var i = 0; i <chaveInfJogadorEditar.length; i++){
					chaveInfJogadorEditar[i].addEventListener("click",editarInfJogador,false)
				}
      }


		});

}
function editarInfJogador(){
	var chaveJogadorEditar = this.getAttribute("chaveJogadorLista");
	refJogadorEditar = refJogador.child(chaveJogadorEditar);
	refJogadorEditar.once("value", function(snap) {
		var dadosJogador = snap.val();
		document.getElementById("nome_jogador").value = dadosJogador.nome;
		document.getElementById("nome_equipe_jogador").value = dadosJogador.equipe;
		document.getElementById("nome_campeao").value = dadosJogador.campeao;
	});
	document.getElementById("btn_cadastrar_jogador").value = UPDATE;
	valorBotao = UPDATE;
}

function enviarInformacoesJogador(event)
{
	//entender este comando
	event.preventDefault();
	switch(valorBotao){
		case CREATE:
		refJogador.push(
				{
				nome: event.target.nome_jogador.value,
			  equipe: event.target.nome_equipe_jogador.value,
			  campeao: event.target.nome_campeao.value
				});
		break;
		case UPDATE:
		refJogadorEditar.update(
			{
				nome: event.target.nome_jogador.value,
				equipe: event.target.nome_equipe_jogador.value,
				campeao: event.target.nome_campeao.value
		});
		break;
	}
	//reseta as informações do formulario
	informacoesFormularioJogador.reset();
	valorBotao = CREATE;
	document.getElementById("btn_cadastrar_jogador").value = CREATE;
}
