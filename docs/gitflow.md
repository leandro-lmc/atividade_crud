# GitFlow - Convenção de Branches do Projeto

## Objetivo
Padronizar o fluxo de trabalho com Git para garantir organização, rastreabilidade e qualidade das entregas.

---

## Branches Principais

### main
- Contém apenas código em produção.
- Toda alteração deve chegar através de Pull Request.
- Protegida contra commits diretos.

### develop
- Branch de integração do desenvolvimento.
- Base para novas funcionalidades.

---

## Branches de Trabalho

### Feature
Criação de novas funcionalidades.

Padrão:

```text
feature/<ticket>-<descricao>
```

Exemplos:

```text
feature/123-login-page
feature/456-user-registration
```

### Bugfix
Correções de bugs durante o desenvolvimento.

Padrão:

```text
bugfix/<ticket>-<descricao>
```

Exemplos:

```text
bugfix/321-fix-null-user
bugfix/654-fix-validation
```

### Release
Preparação para uma nova versão.

Padrão:

```text
release/v<versao>
```

Exemplos:

```text
release/v1.0.0
release/v2.3.0
```

### Hotfix
Correções urgentes em produção.

Padrão:

```text
hotfix/<ticket>-<descricao>
```

Exemplos:

```text
hotfix/777-fix-payment-error
hotfix/888-fix-authentication
```

---

## Convenção de Commits

### Tipos

```text
feat: nova funcionalidade
fix: correção de bug
refactor: refatoração
test: testes
docs: documentação
chore: tarefas administrativas
style: formatação
build: build/dependências
```

Exemplos:

```text
feat: add user authentication
fix: correct validation logic
docs: update api documentation
```

---

## Pull Requests

### Requisitos

- Código compilando sem erros.
- Testes executados com sucesso.
- Revisão por pelo menos um membro da equipe.
- Sem conflitos com a branch de destino.

---

## Fluxo Resumido

```text
develop
  └── feature/*
          └── develop

release/*
  ├── main
  └── develop

hotfix/*
  ├── main
  └── develop
```

---

## Boas Práticas

- Evitar commits muito grandes.
- Fazer rebase ou sincronização frequente.
- Utilizar nomes claros para branches.
- Excluir branches após merge.
- Sempre abrir Pull Request para integração.
