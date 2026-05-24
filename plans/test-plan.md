# Plano de Ação e Testes: Fluxo Principal (Fichas Técnicas e Comparativo)

## Objetivo
Simplificar a interface removendo filtros de categorias (Motor, Off-road, etc.), exibir fichas técnicas completas, adicionar funcionalidade para integrar veículos ao comparativo diretamente da ficha, e corrigir os problemas de leitura da variável `brands` na tela de comparativo.

---

## 1. Alterações de Implementação

### 1.1. Tela Inicial e Formulário de Busca (`app/(tabs)/index.tsx` & `SearchForm.tsx`)
- **Remoção de Filtros:** Remover a lista de `ATTRIBUTE_CHIPS` e o estado `selectedAttributes`.
- **Refatoração do Componente:** Modificar o componente `SearchForm` para não exibir os *chips* de atributos.
- **Validação:** Atualizar a lógica `isSearchDisabled` para permitir a busca apenas com Marca, Modelo e Versão selecionados, removendo a dependência de selecionar atributos.

### 1.2. Tela de Ficha Técnica (`app/screens/specs/[id].tsx`)
- **Exibição Completa:** Remover o sistema de abas de categorias (`activeTab`). Exibir todas as categorias e atributos sequencialmente em seções da tela.
- **Adicionar ao Comparativo:** Inserir um botão de destaque ("Adicionar no Comparativo") que utiliza a função `addToComparison` do `VehicleContext`.
- **Feedback:** Ao adicionar, o aplicativo pode redirecionar para a aba de Comparativo ou apresentará um *toast*/alerta de sucesso.

### 1.3. Correção do Comparativo e Bugs de `brands` (`app/(tabs)/compare.tsx`)
- **Prevenção de Quebras:** Corrigir os trechos que acessam propriedades hardcoded de `matrix.vehicles[1].brand` sem verificar a existência do segundo veículo (que causava os problemas relatados de variável `brands`).
- **Tratamento de Array:** Garantir acesso seguro via opcional chaining (`matrix.vehicles[1]?.brand`).
- **Layout Adaptativo:** Melhorar o retorno de UI caso o usuário chegue ao comparativo apenas com 1 veículo, impedindo que o código tente cruzar dados e exibir a "Conclusão Comparativa" para veículos não selecionados.

---

## 2. Plano de Testes do Fluxo Principal

O teste do fluxo principal garante que o usuário consiga gerar fichas e compará-las sem impedimentos ou *crashes*.

### Cenário 1: Seleção e Geração da Ficha Técnica Completa
**Passo a Passo:**
1. Na tela inicial, verificar que os botões/chips de categorias (Motor, Off-road, etc.) não estão visíveis.
2. Selecionar **Marca**, **Modelo** e **Versão**.
3. O botão de busca (Gerar Ficha) deve habilitar-se de imediato.
4. Clicar em Buscar.
**Resultado Esperado:** A tela de Ficha Técnica (`[id].tsx`) carrega com sucesso, apresentando a lista completa de especificações sem divisão por abas.

### Cenário 2: Adição de Veículos ao Comparativo
**Passo a Passo:**
1. Ao visualizar a ficha técnica de um veículo, localizar o botão "Adicionar no comparativo".
2. Clicar no botão.
3. Retornar à tela de busca (Buscar novamente) e selecionar outro modelo diferente.
4. Visualizar a nova ficha técnica e clicar em "Adicionar no comparativo".
5. Navegar até a aba "Comparativo" no menu inferior.
**Resultado Esperado:** O veículo é incluído no contexto com sucesso. A aba de Comparativo exibe ambos os veículos emparelhados sem erros.

### Cenário 3: Validação da Tela de Comparativo (Correção da variável `brands`)
**Passo a Passo:**
1. Com apenas **1 veículo** no comparativo, entrar na aba "Comparativo".
2. Com **2 veículos** no comparativo, verificar a seção "Conclusão Comparativa".
**Resultado Esperado:**
- Com 1 veículo: A aplicação não deve "quebrar" ou lançar erros de "undefined" em `brands`. Deve exibir a coluna do primeiro veículo e convidar a adicionar o segundo.
- Com 2 veículos: O comparativo deve renderizar o radar, tabela e os textos de marca/modelo lado a lado perfeitamente.

### Cenário 4: Limpeza do Comparativo
**Passo a Passo:**
1. Na tela de comparativo com 2 veículos, clicar no botão "Limpar".
**Resultado Esperado:** A lista deve se esvaziar retornando ao estado zero ("Nenhum veículo para comparar") de forma limpa.