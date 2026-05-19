# Raptor Intelligence 🦖🛡️

O **Raptor Intelligence** é uma aplicação mobile desenvolvida para consultores de vendas da Ford, projetada para transformar a experiência de atendimento ao cliente. Através de dados técnicos precisos, comparativos visuais e inteligência artificial para detecção de perfis, o app capacita o vendedor a entregar argumentos de venda personalizados e embasados.

---

## 🚀 Funcionalidades Principais

### 🔍 Busca e Ficha Técnica Dinâmica
*   Consulta rápida de modelos Ford e concorrentes.
*   Filtros por atributos de interesse (Motor, Off-road, Segurança, Tecnologia).
*   Geração de documentos PDF para compartilhamento instantâneo com o cliente.

### 📊 Comparativo Avançado
*   Matriz comparativa lado a lado com destaque visual para especificações vencedoras.
*   Gráfico de Radar para análise de performance em múltiplos eixos.
*   Veredito comparativo gerado automaticamente para apoiar a decisão do cliente.

### 🧠 Inteligência de Vendas
*   Detecção automática do perfil do cliente com base no comportamento de busca.
*   Sugestão de argumentos de venda estratégicos baseados em sinais detectados pela IA.

### 👤 Gestão do Consultor
*   Acesso seguro e histórico de buscas recentes.
*   Gestão de perfil do vendedor (nome, foto, concessionária).

---

## 🛠️ Tecnologias Utilizadas

*   **Framework:** [Expo](https://expo.dev/) (React Native)
*   **Linguagem:** TypeScript
*   **Navegação:** Expo Router
*   **Estilização:** Context API para Tematização (Dark/Light mode pronto)
*   **Recursos Nativos:**
    *   `expo-print` & `expo-sharing` (Geração e envio de PDF)
    *   `react-native-safe-area-context` (Adaptabilidade de tela)
    *   `expo-async-storage` (Persistência de dados locais)

---

## 📂 Estrutura do Projeto

```bash
├── app/               # Rotas e telas da aplicação (Expo Router)
├── assets/            # Imagens e ícones
├── components/        # Componentes atômicos, moléculas e organismos
├── constants/         # Definições de cores, tipografia e espaçamento
├── context/           # Contextos Globais (Auth, Theme, Vehicle)
├── hooks/             # Hooks customizados para lógica de negócio
├── services/          # Integração com APIs e serviços de armazenamento
└── types/             # Definições de tipos TypeScript
```

---

## 🏁 Como Começar

### Pré-requisitos
*   Node.js instalado
*   Expo Go instalado no seu dispositivo móvel (ou emulador configurado)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/raptor-mobile.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   npm start
   ```
Escaneie o código QR com o app Expo Go no Android ou a câmera no iOS.

---

## 📝 Documentação Complementar

Para detalhes sobre as Histórias de Usuário e o roadmap de funcionalidades futuras, consulte o arquivo:
📄 [func.md](./func.md)

---

## 👥 Equipe
*   **Projeto Ford Challenge - FIAP 2026**
*   Desenvolvido com foco em excelência e performance técnica.
