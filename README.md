# Vota Agora - (Em construção)

Link para o frontend <a href="https://github.com/4L1C3-R4BB1T/vota-agora-frontend">Frontend</a>

![](docs/usecases.jpg)


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
        "id": 1,
        "fullName": "Gabriel",
        "document": "17364509720",
        "accountAddress": "0x6F81D1c8f35d02b299cb8d79b55fE51880D24D84",
        "privateKey": "0x295c5ee5d7ab2493ac34f6f99dbf930501fa3fe1d7a2f70f7ba5f71fadb6396e",
        "rewardTokenAddress": "0x151339846E9C95dD85dE1Fb12df8De5578A2Ae50"
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
    "id": 1,
    "fullName": "Gabriel",
    "document": "17364509720",
    "accountAddress": "0x6F81D1c8f35d02b299cb8d79b55fE51880D24D84",
    "privateKey": "0x295c5ee5d7ab2493ac34f6f99dbf930501fa3fe1d7a2f70f7ba5f71fadb6396e",
    "rewardTokenAddress": "0x151339846E9C95dD85dE1Fb12df8De5578A2Ae50"
}
```

- **privateKey** - Permite o usuário importa sua conta. (Exemplo: no Metamask)
- **tokenAddress** - Permite o usuário importa o Reward Token. (Exemplo: no Metamask)
- O **Usuário** ao criar a conta ganhará **1000 Ether**.


### Consulta Pública

🟢 **```GET```** :: Obter todas as consultas

- **```page```:** numéro da página (começa em zero)
- **```size```:** quantidade de itens por página


```json
[
  {
    "id": 1,
    "title": "Title3",
    "ownerName": "Gabriel",
    "description": "Descirption",
    "endDate": "2024-09-30T15:42:00.000Z",
    "initialDate": "2024-09-30T13:47:00.000Z",
    "imageUrl": null,
    "category": "Alimentícia",
    "status": "open",
    "owner": true
  },
   {
    "id": 2,
    "title": "Title3",
    "ownerName": "Miguel",
    "description": "Descirption",
    "endDate": "2024-09-30T15:42:00.000Z",
    "initialDate": "2024-09-30T13:47:00.000Z",
    "imageUrl": null,
    "category": "Alimentícia",
    "status": "open",
    "voted": false
  },
   {
    "id": 3,
    "title": "Title3",
    "ownerName": "Lívia",
    "description": "Descirption",
    "endDate": "2024-09-30T15:42:00.000Z",
    "initialDate": "2024-09-30T13:47:00.000Z",
    "imageUrl": null,
    "category": "Alimentícia",
    "status": "open",
    "voted": true
  }
]
```

- Na listagem, caso o usuário logado seja o dono irá exibir o campo **owner** como **true**.
- Caso o usuário logado não seja o dono, vai exibir normalmente o campo **voted**.

🟡 **```POST```** ::  Permite criar uma Consulta Pública

```
/api/v1/public-consultation
```

```json
{
  "title": "Title3",
  "description": "Descirption",
  "initialDate": "2024-09-30T10:40:00",
  "endDate": "2024-09-30T12:42:00",
  "category": "Alimentícia"
}
```

- O usuário logado terá sua identificação associada a consulta automaticamente.
- A data inicial não pode ser menor que a data de hoje.
- A data inicial não pode ser maior que a data final.
- A Consulta Pública terá o status **open** ao ser criada.
- Quando o **endDate** for menor que a a data atual automaticamente a consulta mudará seu status para **closed**. 

## Tecnologias

- Web3
- Blockchain
- Smart Contract
- NestJS
- MongoDB
- Docker
- Autenticação JWT
