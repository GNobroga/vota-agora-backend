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


🟡 **```POST```** ::  Criar estado

```
/api/v1/states
```

```json
{
    "name": "Tocantins",
    "abbreviation": "TO"
}
```

🔵 **```PUT```** :: Atualizar estado

```
/api/v1/states/{id}
```

```json
{
    "name": "Tocantins",
    "abbreviation": "TO"
}
```

🔴 **```DELETE```** :: Deletar estado

```
/api/v1/states/{id}
```

🟢 **```GET```** :: Obter quantidade de estados registrados

```
/api/v1/states/count
```

---

### Cidades

🟢 **```GET```** :: Obter todas as cidades

```
/api/v1/cities
```

- **```pageNumber```:** numéro da página (começa em zero)
- **```pageSize```:** quantidade de itens por página

🟡 **```POST```** ::  Criar cidade

```
/api/v1/cities
```

```json
{
    "name": "Cachoeiro de Itapemirim",
    "stateId": 8
}
```

🔵 **```PUT```** :: Atualizar cidade

```
/api/v1/cities/{id}
```

```json
{
    "name": "Cachoeiro de Itapemirim",
    "stateId": 8
}
```

🔴 **```DELETE```** :: Deletar cidade

```
/api/v1/cities/{id}
```

🟢 **```GET```** :: Obter cidades por estado

```
/api/v1/cities/state/{id}
```

- **```pageNumber```:** numéro da página (começa em zero)
- **```pageSize```:** quantidade de itens por página

🟢 **```GET```** :: Obter cidades por nome

```
/api/v1/cities/find-by-name/{name}
```

- **```pageNumber```:** numéro da página (começa em zero)
- **```pageSize```:** quantidade de itens por página
- O nome a ser pesquisado deve conter 3 ou mais caracteres

🟢 **```GET```** :: Obter quantidade de cidades registradas

```
/api/v1/cities/count
```

---


## Tecnologias

- Web3
- Blockchain
- Smart Contract
- NestJS
- MongoDB
- Docker
- Autenticação JWT