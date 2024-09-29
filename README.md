# Vota Agora - (Em construção)

## 🔗 API Endpoints

### Auth

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

- 

### Users

🟢 **```GET```** :: Permite obter os usuários 

```
/api/v1/users
```

- **```page```:** numéro da página (começa em zero)
- **```size```:** quantidade de itens por página
- Apenas usuários com **ROLE_ADMIN** podem ter acesso.


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

- Caso o **Document** já esteja em uso, não será possível utilizar.


```json
    {
        "id": "66f93d51bd40f083e9c99acd",
        "fullName": "Gabriel C",
        "document": "YOUR_DOCUMENT",
        "tokenAddress": "0x9416175c512b71bfA3FeEB050D99C201528636d1",
        "privateKey": "0xd9bf176496eabe7f367b7662294645a2946e13fa4e5efc77c18fe637011103ab"
    }
```

- **privateKey** - Permite o usuário importa a chave no Metamask
- **tokenAddress** - Permite o usuário importa o Reward Token no Metamask
- O **Usuário** ao criar a conta ganhará **1000 Ether**.



## Tecnologias

- Web3
- Blockchain
- Smart Contract
- NestJS
- MongoDB
- Docker
- Autenticação JWT