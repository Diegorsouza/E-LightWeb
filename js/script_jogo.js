//apos o carregamento da pagina e executado a funcao abaixo
window.onload = cadastrar;

//area para criação de variaves globais, utilizadas no projeto

var informacoesFormularioJogo;
var refJogo;
var tabelaListarJogo;
var CREATE = "Adicionar Jogo";
var UPDATE = "Atualizar Jogo";
var valorBotao = CREATE;
var refJogoEditar;

function cadastrar()
{
	//recupera o id do formulario de cadastro das informacoes do Jogo
	informacoesFormularioJogo = document.getElementById("cadastrajogo");
	//recupera o id da tabela que lista os Jogos
  tabelaListarJogo = document.getElementById("tabela-listar-Jogo");
	//evento acionado quando é submetido o formulario, chamando a funcao cadastrar Jogos
	informacoesFormularioJogo.addEventListener("submit", enviarInformacoesJogo,false);
	//referencia o no raiz e acessa o no filho neste caso Jogo
	refJogo = firebase.database().ref().child("jogo");
  exibirJogo();
}


function exibirJogo(){
	refJogo.on("value",function(snap)
		{
		var dadosjogo = snap.val();
		var infJogo = "";
		var infBansAzul = "";
		for(var cont in dadosjogo)
			{
				infJogo += "<tr>"+
												"<td>" +  dadosjogo[cont].equipeCampea + "</td>"+
												"<td>" +  dadosjogo[cont].inicio + "</td>"+
												"<td>" +  dadosjogo[cont].termino + "</td>"+
												"<td>" +  dadosjogo[cont].partida + "</td>"+
												"<td>" +  dadosjogo[cont].moedasEquipeAzul + "</td>"+
												"<td>" +  dadosjogo[cont].moedasEquipeVermelha + "</td>"+
												"<td>" +  dadosjogo[cont].torresEquipeAzul + "</td>"+
												"<td>" +  dadosjogo[cont].torresEquipeVermelha + "</td>"+
												"<td>" +  dadosjogo[cont].bansAzul[0] + ", " +
																  dadosjogo[cont].bansAzul[1] + ", " +
																	dadosjogo[cont].bansAzul[2] + ", " +
																	dadosjogo[cont].bansAzul[3] + ", " +
																	dadosjogo[cont].bansAzul[4] + ", " +
												"</td>"+
												"<td>" +  dadosjogo[cont].bansVermelho[0] + ", " +
																  dadosjogo[cont].bansVermelho[1] + ", " +
																	dadosjogo[cont].bansVermelho[2] + ", " +
																	dadosjogo[cont].bansVermelho[3] + ", " +
																	dadosjogo[cont].bansVermelho[4] + ", " +
												"</td>"+
                        //chaveJogo terá a posição que será excluida
												'<td>' +
                            '<button class="btn apagar" chaveJogoLista="'+ cont +'">'+'Excluir'+
                            '</button>'+
                        '</td>'+
												'<td>' +
                            '<button class="btn editar" chaveJogoLista="'+ cont +'">'+'Editar'+
                            '</button>'+
                        '</td>'+
										 "</tr>" ;
			}
			tabelaListarJogo.innerHTML = infJogo;
      if(infJogo != ""){
        var chaveInfJogoApagar = document.getElementsByClassName("apagar");
        for(var i = 0; i <chaveInfJogoApagar.length; i++){
          chaveInfJogoApagar[i].addEventListener("click",apagarInfJogo,false)
        }
				var chaveInfJogoEditar = document.getElementsByClassName("editar");
				for(var i = 0; i <chaveInfJogoEditar.length; i++){
					chaveInfJogoEditar[i].addEventListener("click",editarInfJogo,false)
				}
      }


		});

}
function editarInfJogo(){
	var chaveJogoEditar = this.getAttribute("chaveJogoLista");
	refJogoEditar = refJogo.child(chaveJogoEditar);
	refJogoEditar.once("value", function(snap) {
		var dadosJogo = snap.val();
		document.getElementById("equipe_campea").value = dadosJogo.equipeCampea;
		document.getElementById("dt_inicio_jogo").value = dadosJogo.inicio;
		document.getElementById("dt_term_jogo").value = dadosJogo.termino;
		document.getElementById("partida").value = dadosJogo.partida;
		document.getElementById("moedas_equipe_azul").value = dadosJogo.moedasEquipeAzul;
		document.getElementById("moedas_equipe_verm").value = dadosJogo.moedasEquipeVermelha;
		document.getElementById("torres_equipe_azul").value = dadosJogo.torresEquipeAzul;
		document.getElementById("torres_equipe_verm").value = dadosJogo.torresEquipeVermelha;
		document.getElementById("bans_azul_0").value = dadosJogo.bansAzul[0];
		document.getElementById("bans_azul_1").value = dadosJogo.bansAzul[1];
		document.getElementById("bans_azul_2").value = dadosJogo.bansAzul[2];
		document.getElementById("bans_azul_3").value = dadosJogo.bansAzul[3];
		document.getElementById("bans_azul_4").value = dadosJogo.bansAzul[4];
		document.getElementById("bans_verm_0").value = dadosJogo.bansVermelho[0];
		document.getElementById("bans_verm_1").value = dadosJogo.bansVermelho[1];
		document.getElementById("bans_verm_2").value = dadosJogo.bansVermelho[2];
		document.getElementById("bans_verm_3").value = dadosJogo.bansVermelho[3];
		document.getElementById("bans_verm_4").value = dadosJogo.bansVermelho[4];

	});
	document.getElementById("btn_cadastrar_jogo").value = UPDATE;
	valorBotao = UPDATE;
}

function enviarInformacoesJogo(event)
{
	//entender este comando
	event.preventDefault();
	switch(valorBotao){
		case CREATE:
		refJogo.push(
				{
				equipeCampea: event.target.equipe_campea.value,
				inicio: event.target.dt_inicio_jogo.value,
				termino: event.target.dt_term_jogo.value,
				partida: event.target.partida.value,
				moedasEquipeAzul: event.target.moedas_equipe_azul.value,
				moedasEquipeVermelha: event.target.moedas_equipe_verm.value,
				torresEquipeAzul: event.target.torres_equipe_azul.value,
				torresEquipeVermelha: event.target.torres_equipe_verm.value,
				
				});
		break;
		case UPDATE:
		refJogoEditar.update(
			{
				equipeCampea: event.target.equipe_campea.value,
				inicio: event.target.dt_inicio_jogo.value,
				termino: event.target.dt_term_jogo.value,
				partida: event.target.partida.value,
				moedasEquipeAzul: event.target.moedas_equipe_azul.value,
				moedasEquipeVermelha: event.target.moedas_equipe_verm.value,
				torresEquipeAzul: event.target.torres_equipe_azul.value,
				torresEquipeVermelha: event.target.torres_equipe_verm.value,
		});
		break;
	}
	//reseta as informações do formulario
	informacoesFormularioJogo.reset();
	valorBotao = CREATE;
	document.getElementById("btn_cadastrar_jogo").value = CREATE;

}

function apagarInfJogo(){
  var chaveJogoApagar = this.getAttribute("chaveJogoLista");
  var refJogoApagar = refJogo.child(chaveJogoApagar);
  refJogoApagar.remove();
}
