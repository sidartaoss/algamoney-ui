import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

/**
 * Seguranca do Font-end.

Como funciona a seguranca em uma Aplicacao Web tradicional?

1. Cliente/Navegador
2. Servidor

1. Carregou uma pagina do Servidor, a pagina de login eh carregada pelo Navegador. Usuario informa
 usuario/senha no formulario de login e vai submeter (POST) para o Servidor, informando usuario/senha.

2. Servidor vai validar usuario/senha, checa no banco de dados se usuario/senha esta correto. 
Se estiver correto, Servidor vai armazenar no proprio Servidor uma Session, uma sessão: 
algumas informações dizendo que aquele Usuario, agora, esta logado. E retorna para o Navegador 
o HTML, e.g., a primeira pagina do Sistema e um Cookie. Esse Cookie tem, como uma chave, 
alguns caracteres que identificam que aquele Usuario esta logado e isso eh armazenado no Cookie do Navegador. 

Essa chave que foi armazenada no Cookie do Navegador tambem esta na sessao, na Session do Servidor. 
No Servidor, alem da Session, pode ter o nome do Usuario logado, todas as informações sobre 
esse Usuario que esta logado ficam na Session do Servidor.

No Cliente, fica soh uma chave dentro do Cookie.

Na proxima Requisicao, o Usuario vai acessar uma pagina de Pagamentos. Nessa Requisicao, o 
Navegador vai enviar o Cookie com a chave e o Servidor vai pegar essa chave e vai validar se 
ela esta registrada na sessao, vai pegar os dados do Usuario e vai ver se realmente ele esta logado.

Dessa forma, temos um ambiente Stateful: os dados estao carregados no Servidor. E o Servidor 
vai retornar o HTML com a pagina de pagamentos, caso o Usuario possa acessar a pagina; caso nao 
possa, vai tambem retornar uma pagina HTML falando: voce nao tem acesso a essa pagina.

O Servidor armazena os dados do Usuario logado nele. Caso o Servidor seja desligado sem 
persistir/armazenar os dados da Session em algum lugar e levantar esse Servidor novamente, 
o Usuario automaticamente esta deslogado, porque nao tem mais as informacoes no Servidor, entao o 
Usuario perde o login, ele tem que fazer login novamente.

Apesar de antigo, essa forma de fazer autenticacao ainda eh muito usada e vai continuar sendo usada 
por muito tempo.





Vamos ver outra solucao que eh a que sera utilizada no nosso projeto do Curso.

Nos nao temos uma Aplicacao Web tradicional. Nossa Aplicacao eh uma Single Page Application.

O cenario eh outro. No nosso Cliente, no Navegador, temos a nossa Aplicacao Single Page Application, 
uma aplicacao Angular de uma pagina soh.

Do outro lado, temos a API Restful, os nossos Web Services REST. Essa comunicacao eh feita via 
Servico HTTP no Angular. Toda comunicacao da nossa Aplicacao que esta 100% carregada no Navegador, 
toda essa comunicacao com a API eh via HTTP e, geralmente, a gente usa essa Resposta, 
a API responde em JSON.





Agora vamos falar de Seguranca. A Seguranca esta na API, a nossa API jah tem a Seguranca e nela ja 
esta implementada a Seguranca OAuth2. Como funciona essa Seguranca OAuth2?

Primeiramente, para fazer o Login, nos vamos fazer um HTTP POST para uma determinada URL da nossa 
API, passando usuario/senha e mais alguns parametros, informando que queremos fazer Login nessa API, 
queremos ter acesso para fazer coisas nessa API, e.g., Cadastrar, Consultar, etc.

A API vai verificar se esse Usuario e Senha estao corretos, se estiverem incorretos, jah retorna um 
codigo de erro, mas se estiverem corretos, vai retornar um Access Token (body) e um Refresh Token (Cookie).

O Access Token e o Refresh Token podem ser retornados no Corpo da Resposta ou, ainda, o Refresh 
Token pode ser retornado no Cookie. A nossa implementacao da API retorna um Refresh Token no 
Cookie e, quando estiver em Producao, esse Refresh Token, no Cookie, vai ficar, inclusive, com HTTPS.

O Access Token eh o token que a gente vai usar depois nas proximas requisicoes, por exemplo, 
que fazer uma Pesquisa de Pessoas, uma Pesquisa de Lancamentos, eh o token que a gente vai usar 
para todas as chamadas que vem em seguida para a nossa API. O Access Token eh um token de tempo 
de vida curto, pode durar de alguns minutos a algumas horas, o ideal eh que tenha um tempo de 
vida curto, porque, se for roubado por alguem, alguem interceptar isso, vai ter acesso a nossa 
API por pouco tempo e ele vai expirar depois desse tempo.  

O Refresh Token eh um outro token que tem um tempo de vida mais longo, pode ser varias horas 
ate dias ou meses e, por isso, temos que ter uma preocupacao muito maior com ele. E um lugar 
que eh seguro pra gente colocar eh no Cookie e, quando estiver em Producao, usar HTTPS. Por 
que colocar no Cookie HTTPS? Porque a API retorna, na Resposta, o Cookie definindo que ele soh 
pode ser acessado via HTTP. Entao, a gente nao vai conseguir acessar esse Cookie via JavaScript, 
por exemplo, ate a nossa Aplicacao mesmo nao consegue acessar o Cookie, na verdade, o Refresh 
Token dentro do Cookie. Apenas via Requisicao que esse Refresh Token vai ser enviado para a nossa API. 

Para as proximas Requisicoes, sera necessario o Access Token. Por exemplo, quero fazer Requisicao 
para fazer uma Pesquisa de Pessoas. Faz uma Requisicao HTTP (GET(/pessoas)), mas tem que passar 
o Access Token. O Access Token que vai dar acesso ao que quero fazer: se tiver permissao e se esse 
Access Token ainda nao estiver expirado.
Se estiver qualquer coisa errada, vai retornar um Codigo de Erro.
Se estiver tudo Ok, os dados (JSON) serao retornados. 

O Access Token, quando recebido, tem que ser armazenado em algum lugar, porque a gente vai precisar 
em todas as Requisicoes para fazermos a nossa autenticacao na nossa API. O lugar que a gente vai 
armazenar, no Projeto do Curso, eh o Local Storage, que eh uma area onde as aplicacoes podem armazenar 
dados localmente dentro do Navegador do Usuario. Lembrando que o Refresh Token fica armazenado no 
Cookie e a nossa Aplicacao, via JavaScript, nao consegue acessar o Refresh Token que esta dentro do Cookie.

Imagine que a Requisicao expirou. A gente consegue, antes mesmo de mandar uma Requisicao para a API, 
a gente consegue, na nossa propria aplicacao Angular, a gente consegue saber se o nosso Access Token 
esta expirado ou nao, nao precisa nem tentar fazer essa chamada para a API, que a gente ja consegue 
identificar aqui mesmo, lendo-o, consegue-se saber se ja expirou ou nao.

Entao, vamos ter que enviar, quando esse Access Token estiver expirado, uma nova Requisicao na API 
pedindo para renovar o Access Token, passando o Refresh Token do Cookie. Nao eh a nossa Aplicacao 
que envia o Refresh Token, eh o proprio Navegador que jah envia o Cookie automaticamente quando a 
gente faz uma Requisicao para uma URL da API.

O Navegador tem acesso ao Cookie, a nossa Aplicacao nao. O proprio Navegador jah vai enviar o Cookie, 
que tem o Refresh Token, para a API. E, ai, a API vai ver se esse Refresh Token eh valido realmente, 
se nao expirou, se esta tudo certo e vai retornar um novo Access Token para a Aplicacao. 

Com esse novo Access Token, substituimos o antigo no Local Storage e, a partir dai, podemos continuar 
usando a nossa API, porque temos um novo Access Token. Entao, podemos fazer uma nova Requisicao HTTP, 
passando o novo Access Token e o ciclo vai continuando: esse novo Access Token vai expirar daqui algum 
tempo e a gente vai precisar fazer uma renovacao novamente, usando Refresh Token, e assim continua. 

Na hora que o Refresh Token expirar, que pode ser varios dias, ai o usuario vai ter que fazer Login novamente.





O que acontece quando o Usuario faz Logout?
No desenvolvimento web tradicional, quando o Usuario faz Logout, a gente tem que apagar, excluir os dados 
da Sessao que fica no Servidor e, ai, a gente perde a Sessao daquele Usuario e ele fez Logout. Nesse caso 
aqui, a gente nao tem Sessao, a nossa API eh Stateless, ou seja, ela nao mantem estado nenhum. Inclusive, 
se a gente derrubar a maquina da API e levantar de novo, nao influencia em nada o login do Usuario, ele 
continua logado normalmente. Quando a gente faz o Logout, eh apenas o trabalho de a gente remover o Access 
Token do Local Storage e a gente tambem pode fazer uma chamada na API para remover o Cookie, para a gente 
nao ter mais esse Cookie de Refresh Token.

A Seguranca, no Front-end, eh mais um trabalho de usabilidade do que Seguranca propriamente dito. A API 
tem que garantir a Seguranca 100%, a API nao pode falhar. Mas o Front-end apenas segue as regras de 
Seguranca que a API define e evita que o Usuario perca o seu tempo; e soh uma questao de usabilidade, 
eh soh para evitar que o Usuario perca tempo tentando fazer coisas que ele nao tem acesso mesmo. Por exemplo, 
nao faz sentido mostrar um botao que a gente sabe que o Usuario nao vai ter acesso. Eh uma questao de 
usabilidade: se o Usuario clicar no botao e esse botao, por acaso, fizer uma Requisicao na API, a API 
jah vai garantir a Seguranca e falar que nao tem acesso. Entao, para que mostrar esse botao?

O modelo de desenvolvimento de uma Aplicacao Single Page Applicaton eh diferente, a arquitetura eh 
diferente e quem garante a seguranca de verdade eh a API. O Front-end garante apenas a usabilidade. A 
gente implementa a seguranca no Front-end, mas entendendo que isso nao eh a garantia, a garantia eh na API. 





O Access Token eh um token JWT, JSON Access Token, que eh um padrao aberto que define uma forma para 
transmitir informacoes entre componentes de software de forma segura, no formato JSON. A informacao pode 
ser verificada com confianca porque ela eh assinada digitalmente. Dentro de um token JWT, tem informacoes 
importantes para identificar um Usuario, como o Nome do Usuario, as Permissoes que ele possui, etc. Isso 
evita que a gente precise fazer consultas no banco de dados varias vezes sempre que a gente quiser, por 
exemplo, saber qual as permissoes que aquele usuario tem, qual que eh o nome daquele Usuario, etc.
 * 
 */

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private title: Title,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  login(usuario: string, senha: string) {
    /** console.log(`Usuário: ${usuario}, Senha: ${senha}`);     **/
    /** Por enquanto nao vai fazer o tratamento do retorno, da Promessa que a gente tem 
     * como retorno desse metodo.
     * 
     */
    this.auth.login(usuario, senha)
        /** Tratar o caso de sucesso. */
        .then(() => {
          /** Fazer o Usuario navegar para outra Pagina. Para isso, eh necessario injetar
           * no Construtor o Router.
          */
        /**
         * Aula 23.01. Criando o Modulo Dashboard
         * 9. Ao inves de /lancamentos, vamos definir /dashboard.
         * Entao, nos alteramos em dois lugares: aqui no metodo login do componente login-form e o 
         * o segundo foi app-routing.module.ts para que a pagina inicial seja a pagina de Dashboard
         * e nao mais a pagina de Pesquisa de Lancamentos.
         * Voltar para dashboard-routing.module.ts.
         * **/
         this.router.navigate(['/dashboard']);
        })
        /** Tratar casos de erro. */
        .catch(erro => this.errorHandler.handle(erro));
  }

}
