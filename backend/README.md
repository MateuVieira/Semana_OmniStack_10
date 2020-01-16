

# Como iniciar (Backend):
 - Configure a conexão com o mongo Atlas no arquivo src/index.js
 - Rode o comando: yarn dev

# Backend Dependencies
 - express - Gerenciamento de rotas e backend
 - nodemon - Auto restart do server (dev dependency)
 - mongoose - Conexão com o banco de dado mongoDB Atlas
 - axios - Requisição ajax em APIs

# Utilizando as rotas ( Usando Insomnia para realizar testes)
 - POST - Cadastrar Dev: http://localhost:3333/devs
   - Json (body): github_username, techs, latitude, longitude
   
 ![alt text](https://github.com/MateuVieira/Semana_OmniStack_10/blob/master/Images/Insomnia/Cadastro_Dev-Store_Dev.PNG)
   
  - GET - Listar Devs: http://localhost:3333/devs
  
 ![alt text](https://github.com/MateuVieira/Semana_OmniStack_10/blob/master/Images/Insomnia/Index_Devs.PNG)
  
  - GET - Buscar Devs: http://localhost:3333/devs
    - Query (no-body): latitude, longitude, techs
    
 ![alt text](https://github.com/MateuVieira/Semana_OmniStack_10/blob/master/Images/Insomnia/Buscar_Devs-Search_Devs.PNG)
    
  - PUT - Alterar Dev: http://localhost:3333/devs/"github_username"
    - Json (body): Opcionais - techs, name, bio, avatar_url, latitude e longitude
    
 ![alt text](https://github.com/MateuVieira/Semana_OmniStack_10/blob/master/Images/Insomnia/Upadate_Dev.PNG)
    
  - DELETE - Deletar Dev: http://localhost:3333/devs/"github_username"
  
 ![alt text](https://github.com/MateuVieira/Semana_OmniStack_10/blob/master/Images/Insomnia/Delete_Dev.PNG)
