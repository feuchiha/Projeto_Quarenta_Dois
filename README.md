# Projeto_Quarenta_Dois

Projeto 42 dos alunos Alvaro Zago, Anderson Paterno e Felipe Valim da faculdade Senai de Joinville/SC.

Criamos este projeto com o intuito de demonstrar:
1. Em quais regiões do Brasil tivemos mais casos de mortes por asma.
2. Demonstramos por gênero a relação de mortes e dias de permanência em hospitais.
3. E dividimos por idade, desde bebês até idosos quais são os maiores índices destes óbitos.

Algumas informações sobre o projeto e como usá-lo.

O projeto foi desenvolvido:
1. Um bot para ler arquivos em CSV e realizar a normalização dos dados que continham dentro, realizando a padronização dos dados, assim poderíamos ler essas informações em um banco de dados relacional e assim relacionar as informações que temos.
2. Um segundo bot que lia todos as informações contidas nos arquivos CSV, importava essas informações para tables de um banco Microsoft SQL Server.
3. Uma aplicação web, desenvolvida em angular, contento:
  a. Dash, contendo gráficos que foram feitos utilizando os dados importados para o banco SQL juntamente com a API do Google Chart para gerar os gráficos.
  b. Painel de controle de usuário. Cada usuário que quiser utilizar a aplicação tem de criar uma conta da aplicação, utilizamos o banco MongoDB para gerir os usuários. Temos uma tela para controle do próprio usuário, onde ele pode alterar suas informações, e temos a tela de controle de usuários, para os usuário administradores poderem gerir os usuários que utilizam a aplicação, como alterar senha, mudar nível de usuário, desativar ou ativar um usuário.
  c. Importação e Logs de datasets, como acabamos importando os datasets manualmente, não terminamos a aplicação de importação e logs de datasets, mas o correto seria importar datasets diretamente pelo navegador.
  d. Sobre, uma tela apenas explicando um pouco sobre os desenvolvedores.
4. O backend, onde tratamos as requisições de usuários, do gráficos foi feita no repositório: 
https://github.com/Paterninho/myapp.git
5. As bases abertas que utilizamos estão na pasta DataSets do projeto.

Para utilizar nosso projeto, por favor siga estas indicações:
1. Importe o repositório.
2. Tenha instalado o nodejs e o npm.
3. Instale um banco de dados relacional, utilizamos no nosso projeto o MySQL.
4. Importe as bases que estão na pasta DataSets para o banco relacional.
5. Abra o terminal, navegue até a pasta onde clonou o repositório e execute o comando npm install, ele irá baixar todas as dependências que são necessárias para que o projeto execute.
6. Importe o repositório do backend (https://github.com/Paterninho/myapp.git).
7. Execute o passo 3 na pasta onde importou o repositório do backend.
8. Execute o comado npm start no terminal na pasta do repositório do backend, ele irá criar a conexão com o banco não relaciona MongoDB.
9. Execute o comando ng serve no terminal na pasta do repositório Projeto_Quarenta_Dois, irá iniciar a aplicação web.
10. Em um navegador digite http://localhost:4200 e acesse, irá acessar a aplicação.
11. Crie um usuário inicialmente para utilizar a aplicação.
12. Visualize os gráficos gerados e informações que eles contém.

Caso queira colaborar com a nossa ideia ficamos muito felizes.
