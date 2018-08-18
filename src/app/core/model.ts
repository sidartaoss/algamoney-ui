/**
 * 
 * Classes de Modelo para deixar o codigo tipado. Eh uma especie de documentacao.
 */

/** Aula 23.11. Listando Contatos na Tela Mestre-Detalhe 
 * 8. Vamos criar o atributo contatos na Classe Pessoa. Mas, primeiramente, vamos criar a Classe Contato.
 * Ela vai ter os atributos codigo: number, nome: string, email: string, telefone: string.
 * 
 * 9. Em Pessoa, nos vamos ter uma propriedade contatos, que vai ser um novo Array do tipo Contato.
 * 
 * 10. Voltar para pessoa-cadastro.component.html.
*/
/**
 * Aula 23.14. Incluindo um Novo Contato
 * 15. Vamos criar o Construtor de Contato para podermos, em uma linha, ja criar e devolver o Contato.
 * O atributo codigo nao vai ser obrigatorio, entao, define-se com ?, codigo?: number.
 * O atributo nome tambem nao vai ser obrigatorio, entao, define-se com ?, nome?: string.
 * O atributo email tambem nao vai ser obrigatorio, entao, define-se com ?, email?: string.
 * O atributo telefone tambem nao vai ser obrigatorio, entao, define-se com ?, telefone?: string.
 * Agora, sim, nos temos um Construtor e nos podemos utilizar no metodo clonarContato, na Classe PessoaCadastroComponent.
 * Voltar para pessoa-cadstro.component.ts.
 */
export class Contato {
    codigo: number;
    nome: string;
    email: string;
    telefone: string;

    constructor(codigo?: number, 
        nome?: string, 
        email?: string, 
        telefone?: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}

export class Pessoa {
    codigo: number;
    nome: string;
    endereco = new Endereco();
    ativo: boolean;
    contatos = new Array<Contato>();
}

/**
 * Aula 24.03. Buscando Estados e Cidades
 * 5. Criar as Entidades Estado, Cidade
 * Em Cidade, definir a associacao com Estado, ja inicializando essa associacao com uma nova instancia.
 * 
 * 6. Agora, vamos substituir, em Endereco, cidade do tipo string para cidade do tipo Cidade e vamos remover o atributo 
 * estado, porque Cidade ja contem a associacao com a Entidade Estado.
 * 
 * 7. Voltar para pessoa.service.ts.
 */
export class Estado {
    codigo: number;
    nome: string;
}

export class Cidade {
    codigo: number;
    nome: string;
    estado = new Estado();
}

export class Endereco {
    logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cep: string;
	cidade = new Cidade();
}

export class Categoria {
    codigo: number;
}

/**
 * Aula 23.20. Fazendo Download do Anexo
 * 
 * 3. Criar o atributo anexo, do tipo string.
 * 
 * 4. Criar o atributo urlAnexo, do tipo string.
 * 
 * 5. Essas informacoes, ou seja, esses dois atributos sao retornados logo depois que a gente faz o Upload de um Arquivo.
 * Outro lugar em que sera necessario alterar, para a definicao do atributo href na tag de link <a> para poder se fazer o
 * Download do anexo, eh em lancamento-cadastro.component.ts.
 * Ver lancamento-cadastro.component.ts.
 */
export class Lancamento {

    codigo: number;
    /** O padrao eh RECEITA */
    tipo = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    /** Criar outra Classe chamada Pessoa para representar Pessoa */
    /** Serah feito um Binding das propriedades em lancamento-cadastro.component.html 
     * Criando uma Classe de Modelo, fica documentado quais sao as propriedades 
     * de um Lancamento. Na hora de fazer o Binding, facilita.
    */
    pessoa = new Pessoa();
    categoria = new Categoria();
    anexo: string;
    urlAnexo: string;
}