/** Aqui temos o Ambiente de Producao com a mesma propriedade 
 * production, so que com valor true. 
 */
export const environment = {
  production: true,
  /** Se, por acaso, mudarmos essa URL quando formos colocar em Producao, 
   * por algum motivo, eh so vir aqui e alterar.
   * 
   * Agora, nos temos dois ambientes: ambiente de Desenvolvimento (environment.ts)
   * com apUrl http://localhost:8080 e 
   * e ambiente de Producao (environment.prod.ts)  com apUrl
   * https://algamoney-api-sidartasilva.herokuapp.com/
   * 
   * Agora, vamos comeca em CategoriaService. Ver categoria.service.ts
   * 
   * 
   * Aula Fazendo Build para o Ambiente de Producao

   * Durante a fase de Desenvolvimento de um Projeto Angular, a gente ja sabe como testar esse 
   * Projeto e servi-lo para acessar em nosso Navegador, basta a gente usar o comando: ng serve. 
   * Mas como que a gente faz o Build da nossa Aplicacao para Producao? Ou seja, gerar os 
   * assets, os arquivos Javascript, CSS, HTML, tudo que a gente precisa para a gente colocar 
   * isso em Producao? Eh isso que a gente vai ver nesta aula. 

   * No lugar do comando ng serve, a gente vai usar ng build, ou seja, para construir o 
   * Projeto. Tambem eh um parametro do Angular/CLI. Mas a gente vai passar um parametro a 
   * mais, porque, senao, ele vai construir para ambiente de Desenvolvimento, lembrando 
   * que temos dois ambientes: Desenvolvimento (environment.ts) e Producao 
   * (environment.prod.ts). 

   * ng build --environment=prod

   * Nos vamos passar um parametro --environment com o valor padrao prod. Fazendo isso e 
   * dando <ENTER>, a gente ja vai executar o comando para fazer o Build e vamos ver que sera 
   * criada uma pasta 'dist' dentro do nosso Projeto. Todos os arquivos do Projeto que 
   * precisamos vao estar la dentro.

   * Verificando a pasta dist, ela tem 12.1 MB para a nossa Aplicacao. Entao, nos temos que 
   * colocar esses arquivos, 12.1 MB de arquivos em algum local, em algum Servidor HTTP. 
   * Pode ser qualquer coisa, qualquer Servidor HTTP, pode ser um Apache HTTP Server, pode 
   * ser, inclusive, servindo esses arquivos, usando NodeJS, pode ser em um Tomcat, pode ser 
   * qualquer Servidor que sirva, usando o protocolo HTTP. Nos vamos falar mais sobre o 
   * Servidor HTTP, ate porque nos vamos precisar disso para colocar em Producao, em uma 
   * aula seguinte. Por enquanto, vamos focar um pouco mais nessa pasta 'dist'.

   * 12.1 MB pode ser um tanto grande para uma Aplicacao tao pequena como a gente desenvolveu 
   * nesse Projeto. Sera que tem como a gente reduzir o tamanho dessa pasta desses arquivos, 
   * sera que tem coisas nessa pasta que sao desnecessarias, sera que tem coisas nessa pasta 
   * que poderiam ser otimizadas? Sim, nos podemos otimizar essa pasta. Voltando para o nosso 
   * terminal.

   * Ao inves de passar a propriedade --environment=prod, nos vamos passar --prod. O que isso 
   * significa? Isso eh o que chamamos de Meta-Flag. Uma Meta-Flag adiciona outras flags, 
   * ou seja, a Meta-Flag --prod incluira, inclusive, a flag --environment=prod, alem de 
   * outras flags, alem de outros parametros e isso vai deixar a nossa Aplicacao mais 
   * otimizada.

   * ng build --prod

   * Uma das coisas que a Meta-Flag --prod adiciona eh a Compilacao AoT, Ahead of Time 
   * compilation. Como funciona? 

   * Primeiro vamos explicar como funciona sem o AoT. Antes de o Navegador renderizar a 
   * Aplicacao, os Componentes e Templates sao convertidos para um codigo Javascript 
   * executavel, entao todos os exemplos que a gente vem fazendo nessa aula eh assim que 
   * funciona. Quando a gente vai carregar a Aplicacao, os Componentes, os Templates, etc., 
   * sao convertidos para um codigo Javascript executavel. Por padrao, essa Compilacao eh 
   * feita no Navegador, no Browser do Usuario em tempo de execucao e durante o carregamento 
   * da Aplicacao. Isso tem um custo de performance, uma Aplicacao grande pode demorar mais 
   * no carregamento, quanto mais a Aplicacao vai crescendo, pode demorar mais o carregamento, 
   * porque tem essa Compilacao que o proprio Navegador vai fazer em tempo de execucao, 
   * ou seja, na maquina do Usuario.

   * O codigo da Aplicacao tambem fica maior, porque carrega junto com o codigo da Aplicacao o 
   * codigo do Compilador do Angular de varias outras bibliotecas que sao necessarias para 
   * compilar a Aplicacao que a gente desenvolveu.

   * Quando usamos o Ahead of Time Compilation, tambem conhecido como Compilacao AoT, nos 
   * compilamos a Aplicacao antes e fazemos o deploy da Aplicacao ja compilada. Ou seja, a 
   * gente nao compila, a gente nao deixa o Navegador do Usuario fazer essa compilacao pesada 
   * da Aplicacao, a gente compila isso na nossa maquina de Desenvolvimento antes de colocar 
   * isso em Producao, a gente ja compila isso quando a gente passa, inclusive, esse 
   * parametro --prod, ja compilamos na maquina local, nao deixamos o Navegador fazer essa 
   * compilacao, a gente ja faz isso na nossa maquina. 

   * Entao, o Compilador tambem remove os codigos desnecessarios de toda a hierarquia de 
   * dependencias do Projeto. Entao, se tem alguma dependencia no Projeto que a gente nao 
   * esteja referenciando, que a gente tenha uma biblioteca a mais ou parte de uma biblioteca 
   * que a gente nao esteja usando, nao esteja referenciando, nao faz sentido a nossa Aplicacao 
   * carregar essa biblioteca, os assets da nossa pasta dist, nao faz sentido, isso pode ser 
   * removido. Entao, o Compilador tambem vai fazer essa otimizacao. Entao, dessa forma, o 
   * Usuario baixa um codigo mais enxuto e ja compilado e, por isso, a Aplicacao fica menor 
   * e mais rapida. 

   * Alem disso, o Compilador AoT detecta erros de binding de Templates durante a Compilacao, 
   * entao evita que tenha algum erro em tempo de utilizacao do Usuario que a gente ja poderia 
   * antecipar aqui na Compilacao, quando a gente esta desenvolvendo ainda, no caso, antes 
   * de fazer o Deploy.

   * Vamos ver como funciona. Eh muito facil, porque o Angular/CLI ajuda a gente bastante. 

   * ng build --prod

   * Nao funcionou, tivemos alguns erros. O Compilador detecta alguns erros de binding de 
   * Templates durante a Compilacao, foi isso que aconteceu, ele detectou alguns erros. 
   * Embora funcione, ele esta exigindo que a gente corrija esses erros.

   * ERROR in src\app\core\navbar\navbar.component.html(13,27): : Property 'exibindoMenu' 
   * does not exist on type 'NavbarComponent'.

   * Problema: Esta reclamando que a propriedade exibindoMenu, definida no Template 
   * (navbar.component.html), nao foi definida no Componente (navbar.component.ts).
   * Solucao: Definir a propriedade no Componente.


   * src\app\core\navbar\navbar.component.html(39,32): : Property 'auth' is private and only 
   * accessible within class 'NavbarComponent'.

   * Problema: No Template, usamos a propriedade auth, chamando o metodo temPermissao(). 
   * Ela nao pode ser privada.
   * Solucao: Definir a propriedade auth, no Construtor, como publica.

   * Executamos novamente o comando

   * ng build --prod

   * e nao gerou nenhum erro. O tamanho da pasta dist, que era 12.1 MB, passou para 2.56 MB. 
   * Para colocar essa Aplicacao , a parte Front-End, em Producao, basta disponibilizarmos 
   * todos esses arquivos, esses assets, em algum Servidor HTTP e vai funcionar.
   * Vamos testar isso na proxima aula.
   *
   */

/** 
 * Aula Respondendo Requisicoes com Node.js e Express

 * Nesta aula, vamos aprender como servir todos esses arquivos da pasta dist, 
 * ou seja, os arquivos que a gente teve como resultado do nosso Build da Aplicacao 
 * atraves de um Servidor HTTP. E a gente vai usar, para isso, o NodeJS com um Framework 
 * chamado Express, que eh um Framework Web simples, rapido e flexivel para NodeJS, que, 
 * inclusive, ja vem instalado quando a gente usa o Angular/CLI, ele ja esta na nossa 
 * Aplicacao, entao a gente vai aproveita-lo tambem.

 * Para a gente poder testar, como a gente ainda nao esta colocando a nossa Aplicacao 
 * efetivamente em Producao, a gente ainda esta em uma ambiente na maquina local, 
 * alteramos a configuracao do environment.prod.ts para:

 * apiUrl: 'http://localhost:8080' 

 * , entao, ficou, agora, tanto o environment ambiente de Desenvolvimento quanto o 
 * ambiente de Producao na porta 8080. Mas, ja geramos o build:

 * ng build --prod

 * , passando a flag --prod, entao ja temos esses arquivos na pasta dist, ja gerados com 
 * environment de Producao, porem Producao "ficticio", a gente esta testando na maquina local 
 * com http://localhost:8080, so para podermos testar na maquina local. Em uma aula seguinte,
 * a gente, realmente, vai colocar em Producao e, entao, nos voltamos, eh claro, o 
 * environment.prod para a URL correta.
 * 
 * A gente precisa, entao, de um Servidor HTTP.
 * Por mais simples que seja, a gente precisa de um Servidor que responde requisicoes HTTP,
 * servindo todos os arquivos dessa pasta dist. E a gente vai criar, entao, um para o nosso
 * Projeto. Vamos clicar em New File para criar um novo arquivo e vamos chamar de server.js,
 * um arquivo Javascript.
 * Ver server.js.
 *
 * 
 * **/   
  /** Somente para teste */
  /** apiUrl: "http://localhost:8080" **/

  apiUrl: "https://algamoney-api-sidarta-os-silva.herokuapp.com/",
  /**
   * Aula 25.07. Atualizando o modulo JWT
   * 
   * 12. Definir, aqui, duas novas propriedades:
  * tokenWhitelistedDomains: [ /localhost:8080 ],
  * tokenBlacklistedDomains: [ /\/oauth\/token/ ]
  * 
  * 13. tokenWhitelistedDomains sao os dominios e o que nos permitimos em que nos permitimos que o nosso token seja enviado. O 
  * Auth0/angular-jwt nao envia para qualquer lugar, nos temos que definir para onde permitir enviar.
  * 
  * 14. Corrigir o dominio 'localhost' para o dominio correto de Producao, 'algamoney-api-sidarta-os-silva.herokuapp.com'
  * 
  * 15. Lembrando que o que esta definido em vermelho eh uma expressao regular, nao eh simplesmente uma string, por isso que esta
  * em vermelho.
  * 
  * 16. Voltar para seguranca.module.ts.
  * 
   */
  /**
   * Aula 25.11. Rodando o Comando nb build

    * Nesta aula, o que a gente vai fazer eh rodar o comando 
    * 
    * ng build --prod
    * 
    * que eh para montar o nosso pacote para a gente conferir se nao tem problema nenhum, se a gente nao vai ter problemas na 
    * hora de montar o nosso pacote, porque, as vezes estamos desenvolvendo a nossa Aplicacao, vai tudo ocorrendo bem, mas, quando a gente 
    * tenta montar o nosso pacote de Producao, ele nao passa em algumas validacoes. 
    * 
    * Vamos rodar o comando agora
    * 
    * ng build --prod
    * 
    * Deu erro em seguranca.module.ts,
    * 
    * ERROR in src\app\seguranca\seguranca.module.ts(156,29): Error during template compile of 'SegurancaModule'
    *   Expression form not supported in 'environment'
    *     'environment' contains the error at src\environments\environment.ts(192,30).
    *   
    * Vamos abrir os arquivos environment.ts e environment.prod.ts.
    * O erro refere-se a,
    * /algamoney-api-sidarta-os-silva.herokuapp.com/
    * ou seja, a utilizacao de expressao regular dessa forma, ou seja,  /algamoney-api-sidarta-os-silva.herokuapp.com/,
    * 
    * 1. Entao, iremos definir dessa forma,
    * new RegExp('algamoney-api-sidarta-os-silva.herokuapp.com')
    * 
    * 2. Basicamente, a gente esta substituindo a barra que existe no inicio e no final pela Classe RegExp, de Regular Expression,
    * new RegExp('\/oauth\/token').
    * 
    * 3. Vamos, agora, tambem corrigir o arquivo environment.ts.
    * Ver enrironment.ts.
      */
  /** tokenWhitelistedDomains: [ /algamoney-api-sidarta-os-silva.herokuapp.com/ ], **/
  tokenWhitelistedDomains: [ new RegExp('algamoney-api-sidarta-os-silva.herokuapp.com') ],
  /** tokenBlacklistedDomains: [ /\/oauth\/token/ ] **/
  tokenBlacklistedDomains: [ new RegExp('\/oauth\/token') ]
};
