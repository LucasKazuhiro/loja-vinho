# Sobre o Projeto
O seguinte projeto foi elaborado para a matéria de Programação WEB, e se trata de uma loja online de venda de vinhos onde é possível criar uma conta, alterar dados desse cadastro, se logar (e deslogar), visualizar detalhes dos vinhos, adicionar um item ao carrinho e, por fim, efetuar uma compra.

# Tecnologias
Para desenvolver o front-end foi utiliza o framework Angular (typescript), e para o back-end Sprintboot (java), além de HTML e CSS para estruturar e estilar as páginas.

<table align="center">
    <tr>
        <th></th>
        <th>
            Frontend
        </th>
        <th>
            Backend
        </th>
    </tr>
    <tr>
        <th>
            Linguagens
        </th>
        <td>
            <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
            <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
            <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
        </td>
        <td>
            <img alt="Java" src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <th>
            Frameworks
        </th>
        <td>
            <img alt="Angular" src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white"/>
        </td>
        <td>
            <img alt="Spring" src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"/>
            <img alt="MySQL" src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">
        </td>
    </tr>
    <tr>
        <th>
            IDE / Editor
        </th>
        <td>
            <img alt="Visual Studio Code" src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>
        </td>
        <td>
            <img alt="IntelliJ IDEA" src="https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white"/>
        </td>
    </tr>
</table>


# Contribuidores
<a href="https://github.com/lucaskazuhiro/loja-vinho/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lucaskazuhiro/loja-vinho" />
</a>

# Pré-requisitos
1. Instale o [`Node.js`](https://nodejs.org/en) e certifique-se de que ele inclua o gerenciador de pacotes `npm`.
2. Instale o [`Angular CLI`](https://angular.dev/installation#install-angular-cli) globalmente.
3. Instale o [`Java Development Kit`](https://www.oracle.com/java/technologies/downloads/?er=221886#jdk23-windows) (JDK) ou semelhantes.
4. Instale o [`MySQL`](https://dev.mysql.com/downloads/mysql/). Opcionalmente você pode baixar o [`MySQL Workbench`](https://dev.mysql.com/downloads/workbench/) para gerenciar os bancos de dados via interface gráfica.

# Inicializando o projeto
1. Inicialize o serviço do MySQL (`MySQL80`)
2. Execute o arquivo `LojavinhoSpringbootApplication.java`
3. Importe o arquivo `requestsPostman.json` e na pasta "Vinho" execute todas as requisições `POST`
4. Acesse a pasta `lojavinho-angular`, abra o CMD e execute o seguinte código:
```console
ng serve
```
5. Acesse o `localhost` para abrir o site:
```console
http://localhost:4200/
```
