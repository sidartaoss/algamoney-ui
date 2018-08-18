// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/**
 * 
 * Aula Configurando a Aplicacao com Environment do Angular CLI

 * Em varios locais do codigo do nosso projeto, a gente tem URLs da nossa API RESTful 
 * hardcoded: http://localhost:8080/lancamentos: protocolo, porta, dominio. 
 * Nesse caso, estamos na Classe LancamentoService, mas, se entrarmos tambem em 
 * CategoriaService, a mesma coisa, a gente tem repetido hardcoded a nossa URL. 
 * E por ai vai, tem varios locais, como OauthService, LogoutService e tem outros lugares que 
 * a gente tem que procurar. 

 * Qual que eh o problema disso? O problema eh que, em Desenvolvimento, 
 * na nossa maquina, funciona. Mas, quando formos colocar isso em Producao, 
 * a gente vai ter que sair buscando isso no codigo e alterar para Producao, 
 * alterar para o Dominio de Producao. Nao eh nada legal fazer isso, porque podemos esquecer, 
 * errar, implantar em Producao com uma URL errada, uma URL de Desenvolvimento. 
 * Ao mesmo tempo, podemos tentar fazer algum teste em Desenvolvimento com uma URL de Producao. 
 * Entao, nao da certo isso, precisamos resolver esse problema. 

 * O Angular CLI pode nos ajudar, porque ele tem o conceito de diferentes ambientes, 
 * como, por exemplo, ambiente de Desenvolvimento, ambiente de Producao, 
 * isso eh o basico, termos um ambiente de Desenvolvimento e um ambiente de Producao, no minimo. 
 * Entao, o Angular CLI ja nos ajuda com esse conceito: para isso, tem a pasta environments e, 
 * dentro dela, tem dois arquivos: environment.prod.ts e environment.ts. environment.ts eh o 
 * ambiente padrao. 
 * 
 */

 /** environment eh um objeto Javascript com propriedades e a unica propriedade que ja
  * vem por padrao eh production: false, ou seja, esse nao eh o ambiente de Producao,
  * eh o ambiente padrao, geralmente o ambiente de Desenvolvimento.
  * 
  * Agora, o que podemos fazer, em Ambiente de Desenvolvimento, eh adicionar uma nova
  * propriedade, que vamos chamar de apiUrl. Essa eh a propriedade que vamos usar depois 
  * como referencia para a gente ter a URL da nossa API.
  * E vamos definir aqui, como eh Ambiente de Desenvolvimento, http://localhost:8080,
  * ou seja, qual que eh o protocolo, dominio e porta da nossa API de Desenvolvimento.
  * 
  * E vamos definir tambem apiUrl em Ambiente de Producao. Ver environment.prod.ts.
  * 
  * Quando nos iniciamos a nossa Aplicacao usando ng serve, a gente ja vai, 
  * automaticamente, usar o ambiente de Desenvolvimento, nao eh o ambiente de Producao. 
  * Mas como que fazemos se quisermos usar o ambiente de Producao? Isso a gente vai ver em uma 
  * proxima aula. Por enquanto, veremos apenas se esta funcionando o ambiente de 
  * Desenvolvimento. Por padrao, se a gente nao especifica nada, a gente ja usa o ambiente de
  * Desenvolvimento.
  */
 /**
  * Aula 25.07. Atualizando o modulo JWT
  * 
  * 8. Definir, aqui, duas novas propriedades:
  * tokenWhitelistedDomains: [ /localhost:8080 ],
  * tokenBlacklistedDomains: [ /\/oauth\/token/ ]
  * 
  * 9. tokenWhitelistedDomains sao os dominios e o que nos permitimos em que nos permitimos que o nosso token seja enviado. O 
  * Auth0/angular-jwt nao envia para qualquer lugar, nos temos que definir para onde permitir enviar.
  * 
  * 10. E tokenBlacklistedDomains eh para onde nao queremos enviar. Nos nao queremos enviar para /oauth/token, porque, geralmente,
  * ou nos estamos requisitando o token ou nos estamos dando um Refresh no nosso Token. Entao, nao eh necessario enviar.
  * 
  * 11. Copiar essas propriedades e colar em environment.prod.ts.
  * Ver environment.prod.ts.
  * 
  */
 /**
  * Aula 25.11. Rodando o Comando nb build
  * 
  * 4. Vamos definir o valor das propriedades tokenWhitelistedDomains, tokenBlacklistedDomains, substituindo as duas barras // por 
  * new RegExp(), para evitar erro de que nao reconhece o formato de Expressao Regular ao rodar o comando de build para Producao,
  * ng build --prod
  * 
  * 5. Agora, vamos rodar novamente o comando,
  * 
  * ng build --prod
  * 
  * 6. Okay, rodou o comando com sucesso. Agora, vamos levantar o Projeto, ng serve. Ao testar, http://localhost:4200,
  * verificamos que esta tudo funcionando. Navegando entre os links, verificamos que esta tudo Okay. Ao editar os registros de Pessoas
  * e Lancamentos, verificamos que esta tudo Okay.
  * 
  */
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080",

  /** tokenWhitelistedDomains: [ /localhost:8080/ ], **/
  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],
  /** tokenBlacklistedDomains: [ /\/oauth\/token/ ] **/
  tokenBlacklistedDomains: [ new RegExp('\/oauth\/token') ]
};
