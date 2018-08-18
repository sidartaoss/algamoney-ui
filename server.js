/** Aqui, nos vamos declarar uma variavel chamada de express, 
 * importando um modulo que nos ja temos, nao eh um modulo Angular, eh um modulo 
 * Javascript que ja temos chamado Express, isso ja esta em nosso Projeto.
 * 
 * Esse Express eh um Framework Web simples Javascript, a gente usa isso com NodeJS.
 * Nos vamos usar somente o basico de Express para servir o que a gente precisa, que sao
 * aqueles arquivos da pasta dist.
 * 
 * Entao, para comecar, a gente declara, tambem, mais uma variavel chamada app,
 * e vamos chamar uma Funcao chamada express(), que eh, exatamente, o que a gente importou
 * com require('express').
 */
const express = require('express');
/** Esse eh o objeto que representa a nossa Aplicacao, agora falando de Servidor, a gente
 * esta servindo arquivos, Aplicacao Express.
 * E, a partir dessa variavel app que a gente tem, nos podemos chamar alguns metodos.
 * 
 * O primeiro metodo que vamos chamar eh o metodo use(), passando, como parametro, 
 * express.static(). O que esta querendo fazer com isso? Nos queremos servir os arquivos
 * estaticos: Javascript, imagens, CSS, todos os arquivos estaticos, todos os arquivos que
 * estiverem em dist, nos queremos servir, entao, nos definimos use(express.static())
 * __dirname: pega o nome do diretorio atual do arquivo server.js. Entao, esta pegando,
 * dinamicamente, qual que eh todo o caminho do meu diretorio para concatenar, 
 * agora, com /dist, pois server.js esta na raiz do nosso Projeto. A partir dessa 
 * raiz do Projeto, nos temos que acessar a pasta dist para ter acesso a todos aqueles 
 * arquivos que queremos servir.
 * Entao, concatenamos o __dirname + /dist. Com essa instrucao:
 * app.use(express.static(__dirname + '/dist'))
 * , ja vai servir todos os arquivos dessa pasta.
 * 
 * Mas acontece o seguinte. Quando a gente acessa a nossa Aplicacao Angular, 
 * http://localhost:4200/pessoas, por exemplo, no Navegador, a gente vai acessar, entao,
 * o nosso Servidor HTTP, fazendo um GET em /pessoas. E, veja bem, nao estamos dizendo
 * fazer um GET na API REST, nao tem a ver com isso, estamos falando fazer um GET no 
 * Servidor HTTP quer fornece os nossos arquivos do Front-End, os nossos arquivos da nossa
 * Aplicacao Angular. O que acontece eh que nao existe arquivo /pessoas, nao existe nenhuma
 * configuracao no nosso Servidor, veja que o nosso Servidor HTTP eh este arquivo server.js, nao
 * existe nenhuma configuracao para buscar cada uma dessas Rotas.
 * 
 * Ate poderia definir, tem uma Funcao GET que a gente configura as Rotas. Poderia definir:
 * app.get('/pessoas', function(request, response) {
 *     response.sendFile(__dirname + '/dist/index.html')
 * });
 * app.get('/lancamentos', function() {
 * 
 * });
 * Quando a gente chama a Rota /pessoas, fazemos alguma coisa, quando chamamos a Rota
 * /lancamentos, fazemos outra coisa. O que fariamos seria servir o arquivo.
 * 
 * Para a Function /pessoas, servir qual arquivo? Para a Function /lancamentos, servir
 * qual arquivo? Na verdade, o unico arquivo que a gente deve servir quando nao sao os recursos
 * estaticos, logico, quando nao for CSS, Javascript, imagens, qualquer Requisicao alem disso,
 * a gente deve servir um unico arquivo: eh o arquivo index.html de dentro da pasta dist. Nao
 * existe um outro arquivo so para /pessoas, um outro arquivo so para /lancamentos.
 * 
 * Isso ja ficou claro quando estavamos desenvolvendo a Aplicacao que a gente tem apenas um
 * arquivo index.html e foi ensinado no inicio das aulas como funciona o Bootstrap de uma 
 * Aplicacao, tudo comeca pelo index.html, entao vai carregar o <app-root>, o proprio 
 * Angular injeta os codigos, as importacoes de arquivos Javascript embaixo de <app-rott>,
 * no <body>.
 * 
 * Entao, o unico arquivo que precisamos servir, na verdade, quando a gente tenta acessar
 * /QualquerCoisa que nao seja um recurso "estatico", imagem, Javascript, CSS, eh o index.html
 * que a gente precisa servir.
 * 
 * Entao, o que fazemos eh, a funcao recebe request e response como parametro:
 * app.get('/pessoas', function(request, response) {
 * 
 * });
 * 
 * Quando bater na Rota, por exemplo, /pessoas, vai chamar a funcao passando request, 
 * response. No corpo da funcao, definir:
 * response.sendFile(__dirname + '/dist/index.html')
 * 
 * E vai enviar o arquivo para quem esta nos pedindo, a gente esta criando aqui
 * programando um Servidor HTTP.
 * Pega o diretorio atual, concatena com /dist/index.html.
 * 
 * Acontece que nao vamos ficar configurando uma Rota para cada coisa. Para que
 * vamos ficar fazendo isso, se a Aplicacao tem um grande numero de Rotas?
 * 
 * O que nos vamos fazer, entao, eh definir /* para pegar qualquer coisa que bater aqui
 * no Servidor que esse app.use(express.static(__dirname + '/dist')) nao servir, 
 * nao estiver servindo um recurso estatico, qualquer coisa que bater no Servidor,
 * nos vamos servir apenas o arquivo index.html.
 * 
 * Entao, se a gente tentar acessar assim: /lkladfadldkfdl, qualquer coisa, vai servir
 * o index.html. Esse path /lkladfadldkfdl nao existe, mas vai servir o index.html.
 * 
 * E, entao, nos ja implementamos, nas Rotas do Angular, nos implementamos quando uma Rota
 * eh invalida, a gente direciona o Usuario, falando Pagina Nao Encontrada, mas isso a gente
 * deixa, entao, esse controle de Rota, se existe, se nao existe, que Rota eh, a gente deixou
 * o controle para o Angular, a gente ja fez tudo isso no curso. Aqui a gente so esta servindo
 * index.html.
 * 
 * Feito isso, 
 * app.listen()
 * 
 * , nos vamos escutar em qual porta? Aqui nos escolhemos a porta. Por enquanto, vamos definir
 * aqui a porta 4200, que eh a mesma que o ng serve usa, poderia ser qualquer outra porta.
 * 
 * E, agora, para rodarmos, vamos digitar, no terminal:
 * 
 * node server.js
 * 
 * Como nao foi definido nenhum log no Servidor HTTP (server.js), nao vai aparecer nada no 
 * terminal, mas ja esta rodando.
 * 
 * Entao, a gente vai, agora, acessar http://localhost:4200. Ja esta sendo servido por este
 * Servidor HTTP (server.js).
 * 
 * Ou seja, nos acabamos de criar um pequeno Servico que vai servir os nossos arquivos da 
 * pasta dist, utilizando o protocolo HTTP e usando o Framework Express.
 * 
 * 
 */

 /**
  * Aula Fazendo Deploy em Producao no Heroku.

  * Nesta aula, nos vamos fazer o Deploy da nossa Aplicacao Angular no Heroku, que voce ja 
  * deve conhecer, porque voce fez tambem o Deploy do Back-End no Heroku. Entao, nao vamos 
  * nem falar mais sobre o Heroku, vamos apenas usa-lo para a gente fazer o Deploy da nossa 
  * Aplicacao Angular. Mas, antes de fazer o Deploy, a gente precisa fazer alguns ajustes na 
  * nossa Aplicacao, coisas simples. 

  * O primeiro ajuste que nos iremos fazer eh no arquivo server.js.
  * Nos estamos escutando na porta 4200, mas o Heroku vai fornecer para a gente uma outra
  * porta dinamica. A gente, entao, tem que escutar na porta correta. Se a gente ficar 
  * escutando na porta 4200, nao vai funcionar.
  * 
  * Quando o Heroku inicia a nossa Aplicacao, ele atribui uma variavel de ambiente 
  * chamada PORT, onde la a gente consegue ter acesso a porta que ele esta permitindo
  * entrada de novas Requisicoes.
  * 
  * Entao, vamos definir process.env para pegar as variaveis de ambiente,
  * process.env.PORT ||, ou seja, vamos tentar, primeiramente, ler essa variavel de
  * ambiente PORT para passar, como parametro, para o metodo listen(). Caso nao tenha
  * nada nessa variavel de ambiente, entao, ai sim nos vamos usar a porta que quisermos,
  * como 4200. 
  * 
  * No caso do Heroku, sempre vai ter uma porta na variavel de ambiente, entao, sempre
  * vai funcionar.
  * 
  * O proximo passo eh nos abrirmos o arquivo package.json.
  * Esse arquivo tem alguns scripts:
  * 
  * "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "postinstall": "ng build --prod"
  },
  * 
  * que o Heroku vai acessar quando a gente estiver fazendo build da nossa Aplicacao.
  * Existem outros nomes (valores) que a gente pode definir e outras chaves, outros
  * gatilhos que, quando o Heroku estiver fazendo Build da nossa Aplicacao, 
  * ele vai chamando, como preinstall, postinstall, ele pode ir chamando esses scripts.
  * Um que ele vai chamar, se tiver, claro, eh o postinstall. E o valor a ser 
  * definido para postinstall eh o que queremos que aconteca depois que ele instalar 
  * todas as dependencias da nossa Aplicacao. Queremos que ele execute: ng build --prod. 
  * Entao, antes de iniciar a nossa Aplicacao, ele ainda esta no momento de instalar
  * as dependencias. Depois de instalar as dependencias, vai chamar o postinstall.
  * Ai a gente vai pedir para rodar o build, passando a flag --prod. Depois disso, 
  * entao, ele vai chamar o script start. E, para a chave start, a gente nao vai usar
  * o Angular/CLI para fazer o ng serve, nos vamos usar o nosso codigo Javascript que
  * nos programamos em server.js. Entao vamos definir o valor da chave start como:
  * "node server.js". Quando o Heroku procurar o script start, ele vai rodar o nosso
  * Servidor Javascript.
  * 
  * Proximo passo. No arquivo package.json.
  * O Heroku instala apenas as dependencias que estao em "dependencies": {}, ele nao 
  * instala "devDependencies": {}, nao instala as dependencias de Desenvolvimento.
  * Entao, quando a gente for fazer o Build, a gente nao vai conseguir fazer o Build,
  * vai dar varios erros, porque, para fazer o Build, claro, a gente precisa de 
  * bibliotecas de Desenvolvimento. Isso porque a gente vai fazer o Build no Servidor,
  * se a gente so mandasse todos os arquivos da pasta dist mais o arquivo server.js,
  * por exemplo, nao precisaria das dependencias de Desenvolvimento, mas 
  * como a gente vai fazer o Build no Servidor do Heroku, a gente precisa dessas
  * ferramentas. E o Heroku nao instala devDependencies. Entao, o que vamos fazer
  * eh mover todas as dependencias de Desenvolvimento para "dependencies": {}.
  *
  * Mais uma coisa que eh importante a gente especificar eh a propriedade
  * engines. Dentro dessa propriedade, definimos um objeto Javascript com as 
  * propriedades node, onde iremos especificar qual a versao do Node e a versao do 
  * npm. Nos definimos isso para, em Producao, nos usarmos a mesma versao que a gente esta 
  * usando em Desenvolvimento para evitar qualquer problema de versoes diferentes, que
  * poderia dar algum conflito. Eh uma boa pratica de qualquer tecnologia usar sempre as mesmas 
  * versoes de Producao e Desenvolvimento.
  * 
  * Neste momento, vamos digitar no terminal o comando do Heroku. Vamos criar uma 
  * Aplicacao.
  * 
  * heroku apps:create algamoney-angular-sidartasilva
  * 
  * E, agora, a nossa Aplicacao vai ser criada la no Servidor do Heroku.
  * 
* C:\Users\SEMPR\algamoney-ui>heroku apps:create algamoney-angular-sidartasilva
* !    heroku-cli: update available from 6.15.5-1f03166 to 6.16.18-871efae
* Creating algamoney-angular-sidartasilva... done
* https://algamoney-angular-sidartasilva.herokuapp.com/ | https://git.heroku.com/algamoney-angular-sidartasilva.git
  * 
  * Esta criado, criou um repositorio remoto no GIT do Heroku. Ja temos a URL que a gente 
  * pode acessar: https://algamoney-angular-sidartasilva.herokuapp.com/, lembrando que a nossa API,
  * quando nos vamos chamar a API RESTful, la no Back-End, ela tem a configuracao de CORS,
  * da origem permitida, a URL https://algamoney-angular-sidartasilva.herokuapp.com eh 
  * exatamente o que esta configurado na nossa API. Se definisse outro nome para a URL,
  * teria que avisar quem desenvolveu o Back-End para poder aceitar uma outra origem.
  * 
  * O que precisa fazer agora? Agora, a gente precisa adicionar esses arquivos, todo os 
  * arquivos, na verdade, todo o nosso Projeto no GIT, a gente ja tem um repositorio local
  * do GIT, quando a gente cria uma Aplicacao Angular com Angular/CLI, ele ja cria um
  * repositorio local do GIT, entao nos vamos apenas adicionar todos os arquivos que nao
  * estao ainda nesse nosso repositorio local, entao:
  * 
  * git add . (ponto, ou seja, queremos adiconar todos os arquivos)
  * 
  * E, agora, nos fazemos um commit e, ness commit, nos especificamos uma mensagem 
  * qualquer, especificando por que que estamos alterando esse arquivo:
  * 
  * git commit -m "Deploy"
  * 
  * Depois de feito isso, nos vamos digitar o comando:
  * 
  * git push heroku master
  * 
  * Esse comando quer dizer que nos estamos fazendo um push no GIT para enviar
  * o nosso codigo para o repositorio remoto da Aplicacao no Heroku. Entao, a gente tem o
  * nosso repositorio local, a gente ja adicionou os arquivos nesse repositorio local,
  * fizemos o commit, agora a gente esta jogando esse commit la para o repositorio 
  * remoto do Heroku da nossa Aplicacao, na verdade, la no Heroku e, quando esse commit
  * chegar la, o Heroku vai entender que a gente esta alterando, que a gente tem novos codigos, 
  * uma nova versao da nosssa Aplicacao e ele vai iniciar todo o processo de Build e de 
  * inicializacao da Aplicacao.
  * 
  * A execucao ja foi finalizada, deu tudo certo, nao tivemos nenhum problema, agora ja podemos
  * acessar o endereco https://algamoney-angular-sidartasilva.herokuapp.com/ e a Aplicacao
  * ja esta sendo servida atraves do Heroku.
  * 
  * 
  * 
  */
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html')
});

/** app.listen(4200); **/
app.listen(process.env.PORT || 4200);
