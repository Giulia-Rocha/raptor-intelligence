# Raptor Mobile 🦖 — Ford Challenge

O **Raptor Mobile** é uma solução móvel desenvolvida para o desafio da Ford, focada em transformar a experiência de venda no showroom. O aplicativo capacita consultores de vendas com informações técnicas instantâneas, comparativos de mercado e inteligência competitiva, tudo na palma da mão.

---
# [Video Apresentação](https://drive.google.com/file/d/1eCSflt-YermQjY4nSCSUoE1Dt4EQv3fp/view?usp=sharing)

## 📖 a) Sobre o Projeto

### O Desafio
Escolhemos o desafio de **Digitalização da Jornada de Vendas**. No cenário atual, os consultores muitas vezes precisam se ausentar para consultar manuais ou sistemas de mesa, quebrando o ritmo da negociação. O Raptor Mobile resolve isso trazendo mobilidade e autoridade para o vendedor no pátio da concessionária.

### Por que Mobile?
A mobilidade permite que o vendedor acompanhe o cliente durante todo o trajeto físico — desde a recepção até a inspeção do veículo no pátio — sem nunca perder o acesso aos dados que podem converter uma dúvida em fechamento.

### Funcionalidades Implementadas
- [x] **Autenticação Segura:** Login para consultores de vendas.
- [x] **Busca Inteligente:** Localização rápida de modelos Ford e concorrentes.
- [x] **Ficha Técnica Detalhada:** Visualização de especificações técnicas organizadas por categorias.
- [x] **Comparativo Side-by-Side:** Comparação direta entre dois veículos com indicadores de vitória.
- [x] **Gráfico de Radar:** Visualização gráfica de superioridade em pilares de performance.
- [x] **Cards de Argumentação:** Dicas táticas para contornar objeções de clientes.
- [x] **Histórico de Buscas:** Acesso rápido às últimas consultas realizadas com opção de limpeza.
- [x] **Favoritos:** Possibilidade de marcar veículos para consulta rápida.
- [x] **Perfil e Configurações:** Gestão de preferências do consultor e dados da concessionária.

---

## 👥 b) Integrantes do Grupo

| Nome Completo | RM |
| :--- | :--- |
| Giulia Rocha | 558084 |
| Gabriel Danius | 555747 |
| Caio Rossini | 555084 |
| Carlos Eduardo Ribeiro | 556785 |


---

## 🚀 c) Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo Go** instalado no seu dispositivo móvel (Android ou iOS)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone <link-do-repositorio>
   cd raptor-mobile
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto:**
   ```bash
   npx expo start
   ```

4. **Execute no dispositivo:**
   Abra o app **Expo Go** no seu celular e escaneie o QR Code que aparecerá no terminal.

---

## 📱 d) Demonstração Visual

| Descrição da Tela | Visualização |
| :--- | :--- |
| **Splash Screen**<br>Tela de abertura com a identidade visual do projeto. | ![Splash](./desing-images/Splash%20Screen.png) |
| **Login Screen**<br>Acesso seguro e autenticado para o consultor de vendas. | ![Login](./desing-images/Login%20Screen.png) |
| **Busca / Brand Selection**<br>Interface para seleção rápida de marcas e modelos para iniciar a consulta. | ![Busca](./desing-images/Busca.png) |
| **D em Destaque**<br>Vitrine com os principais diferenciais tecnológicos e lançamentos da Ford. | ![Destaque](./desing-images/D%20em%20Destaque.png) |
| **Ficha Técnica**<br>Informações detalhadas organizadas por categorias e trunfos do veículo. | ![Ficha](./desing-images/Ficha%20Técnica.png) |
| **Comparativo Side-by-Side**<br>Comparação direta entre dois modelos com destaque para o vencedor em cada quesito. | ![Comparativo](./desing-images/Comparativo%20Side-by-Side.png) |
| **Gráfico de Radar**<br>Visualização analítica dos pilares de performance (Motor, Conforto, Tecnologia, etc). | ![Radar](./desing-images/Compartilhar.png) |
| **Histórico de Buscas**<br>Registro das últimas consultas para agilizar o atendimento recorrente. | ![Histórico](./desing-images/Histórico%20de%20Buscas.png) |
| **Configurações**<br>Ajustes de preferências do aplicativo e informações do consultor. | ![Configurações](./desing-images/Configurações.png) |
| **Perfil do Cliente**<br>Gestão de informações do consultor e dados da concessionária. | ![Perfil](./desing-images/Perfil%20do%20Cliente.png) |
| **Loading State**<br>Experiência de carregamento fluida utilizando Skeletons para melhor UX. | ![Loading](./desing-images/Loading%20State.png) |
| **Seleção de Marca**<br>Fluxo intuitivo para navegação no catálogo de marcas parceiras e concorrentes. | ![Brand](./desing-images/Brand%20Selection.png) |

---

 ## [Video Demo](https://drive.google.com/file/d/1vDC0GxZa1u_w0UlMN6sTU9v11CjtXf-P/view?usp=drive_link)

## 🛠️ e) Decisões Técnicas

### Stack Escolhida
- **React Native + Expo:** Escolhido pela agilidade de desenvolvimento e facilidade de deploy multiplataforma (iOS/Android) com uma única base de código.
- **TypeScript:** Utilizado para garantir segurança de tipos, reduzindo erros em tempo de execução e melhorando a manutenção.
- **Expo Router:** Implementação de navegação nativa baseada em arquivos, tornando o roteamento mais intuitivo.

### Estrutura e Arquitetura
O projeto segue a metodologia de **Atomic Design**, organizado da seguinte forma:
- `components/atoms`: Componentes básicos e indivisíveis (Badges, Buttons, Dividers).
- `components/molecules`: Combinação de átomos que formam unidades funcionais (VehicleCard, SpecRow, CompareRow).
- `components/organisms`: Componentes complexos que formam seções das páginas (CompareMatrix, RadarChart, SearchForm).

### Integrações
- **API Client (Axios):** Configurado para consumo de dados técnicos de veículos, com suporte a Mocks para desenvolvimento offline.
- **Context API:** Gerenciamento de estado global para Autenticação, Tema e seleção de veículos para comparação.
- **Async Storage:** Persistência local para o histórico de buscas e favoritos do consultor.

---

## 📈 f) Próximos Passos
Com mais tempo de desenvolvimento, o grupo implementaria:
1. **Modo Offline Total:** Sincronização prévia de dados para funcionamento em pátios sem qualquer sinal de internet.
2. **Integração com CRM Ford:** Envio automático de comparativos PDF diretamente para o lead do cliente no sistema da concessionária.
3. **Escaneamento de QR Code:** Identificação instantânea do veículo no showroom através de etiquetas inteligentes nas janelas.
