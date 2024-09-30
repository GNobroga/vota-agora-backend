# Vota Agora - (Em construção)

Link para o frontend <a href="https://github.com/4L1C3-R4BB1T/vota-agora-frontend">Frontend</a>

## Objetivo da Aplicação:

O objetivo desta aplicação é desenvolver um sistema que utilize a blockchain para garantir a integridade e a consistência de uma votação em uma consulta pública realizada por um usuário. Consultas públicas são entidades que representam ideias que serão debatidas por um determinado indivíduo.

O fluxo da aplicação funcionará da seguinte forma: ao se cadastrar, o usuário receberá 1000 **ETH** (pois existe um custo associado a cada votação que ele realizará). Ao participar de uma votação, o usuário receberá 10 **GLT**, um token criado pela nossa aplicação que representará algum tipo de recompensa.


## 🔗 API Endpoints

### Autenticação

🟡 **```POST```** :: Permite o usuário se autenticar.

```
/api/v1/auth
```

```json
{
   "document": "YOUR_DOCUMENT", // CPF
   "password": "YOUR_PASSWORD"
}
```

```json
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmY5M2Q1MWJkNDBmMDgzZTljOTlhY2QiLCJkb2N1bWVudCI6IjE3MzY0NTA5NzIwIiwid2FsbGV0QWRkcmVzcyI6IjB4MEFGNjY3Y0VjMDlEQzU2OEJkM0Y1YkI2YzY3MjBGNDc5NjZiOWY1NyIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3Mjc2MTA1ODQsImV4cCI6MTcyNzY5Njk4NH0.4tP7zwtlZb6P9Dg_CXIOf21Zz97YM_Na-pv_hrXQYHY"
    }
```

- O token deverá ser colocado no cabeçalho **Authorization** da requisição com o prefixo **Bearer [Token]**

### Usuários

🟢 **```GET```** :: Permite obter os usuários 

```
/api/v1/users
```


- **```page```:** numéro da página (começa em zero)
- **```size```:** quantidade de itens por página
- Apenas usuários com **ROLE_ADMIN** podem ter acesso.


```json
[
    {
        "id": "66f93d51bd40f083e9c99acd",
        "fullName": "Gabriel C",
        "document": "17364509720",
        "accountAddress": "0x0AF667cEc09DC568Bd3F5bB6c6720F47966b9f57",
        "rewardToken": "1000"
    }
]
```

- **RewardToken** é a quantidade tokens que o usuário adquiriu votando nas consultas públicas. 



🟡 **```POST```** ::  Permite criar um usuário

```
/api/v1/users
```

```json
    {
        "fullName": "Gabriel Cardoso",
        "document": "YOUR_DOCUMENT",
        "password": "YOUR_PASSWORD",
        "confirmationPassword": "YOUR_PASSWORD",
    }
```

- Caso o **Document** já exista, não será possível utilizar.


```json
    {
        "id": "66f93d51bd40f083e9c99acd",
        "fullName": "Gabriel C",
        "document": "YOUR_DOCUMENT",
        "tokenAddress": "0x9416175c512b71bfA3FeEB050D99C201528636d1",
        "privateKey": "0xd9bf176496eabe7f367b7662294645a2946e13fa4e5efc77c18fe637011103ab"
    }
```

- **privateKey** - Permite o usuário importa sua conta. (Exemplo: no Metamask)
- **tokenAddress** - Permite o usuário importa o Reward Token. (Exemplo: no Metamask)
- O **Usuário** ao criar a conta ganhará **1000 Ether**.


### Consulta Pública

🟢 **```GET```** :: Obter todas as consultas



- **```page```:** numéro da página (começa em zero)
- **```size```:** quantidade de itens por página


## Tecnologias

- Web3
- Blockchain
- Smart Contract
- NestJS
- MongoDB
- Docker
- Autenticação JWT
