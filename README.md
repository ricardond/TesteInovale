
# Teste Técnico - Desenvolvimento Web com Three.js





## Autores

- [@ricardond](https://www.github.com/ricardond)


## Como rodar a aplicação

- Quando baixar o projeto em formato zip, descompacte e terá uma pasta chamada “TesteInovale”. Para abrir e testar o projeto é importante que tenha uma IDE como o VS Code. Então clique e abra o projeto com o VS Code.
  
![abrirComVSCode](https://github.com/user-attachments/assets/15d0c424-e3f7-4994-843e-dc2f46d1814f)

- Com o projeto aberto, use o atalho Ctlr + ‘ (aspas simples)  para abrir o terminal do visual code ou clique nos três pontinhos na barra de ferramentas> Terminal > novo terminal.
  
![image](https://github.com/user-attachments/assets/1a329ca5-335b-4ecf-bbd6-06a74b589c2c)

- O primeiro comando será para rodar o servidor Json server, como instalei a biblioteca Three js por meio do npm do Node, o comando será: **npm run server**. Clique segurando Ctrl o link http://localhost:3000/settings
  
![image](https://github.com/user-attachments/assets/c87e76c5-8223-466f-abbf-1abdc8b671e5)

- Quando clicar no link e abrir no navegador, a página irá retornar os valores que estão no banco de dados feito com Json Server.
  
![image](https://github.com/user-attachments/assets/09d9f9ab-1965-40a4-85f3-d3adb0482e68)

- O segundo comando será o **npm run dev** para rodar nossa aplicação, se tudo deu certo irá aparecer o nosso localhost onde terá acesso a aplicação, então clique segurando Ctrl ou copie e cole no navegador:
  
![image](https://github.com/user-attachments/assets/a6201201-50cb-4e32-b561-033f5f7e61aa)

- Quando abrir o localhost, será direcionado para a aplicação com o objeto e a as ferramentas de configurações como na imagem a seguir:
  
![image](https://github.com/user-attachments/assets/e86e04f4-16df-4321-894b-3bf0da98c3c0)

## Estrutura do Projeto

![image](https://github.com/user-attachments/assets/f5454c21-ecc7-46e4-a71b-aac5070f05dc)

**Diretórios principais:**
- node_modules/: Pasta gerenciada pelo npm que contém todas as dependências do projeto instaladas a partir do package.json.
- public/: Essa pasta contém arquivos estáticos, como imagens, fontes e estilos. No meu caso, há um styles.css, que define a aparência da aplicação.
- src/: Diretório onde está o código-fonte principal do meu projeto, incluindo os arquivos JavaScript e o banco de dados JSON.[

**Arquivos Importantes**
- config.js (em src/): Contém funções para salvar e carregar configurações do JSON Server. Ele gerencia a persistência de dados da interface.
- db.json (em src/): Simula um banco de dados local para armazenar as configurações do usuário usando o JSON Server.
- main.js (em src/): Arquivo principal que inicializa a cena Three.js, configura o cubo 3D, controla eventos do usuário e integra-se ao config.js.
- index.html: Página HTML principal que renderiza o conteúdo e importa os scripts necessários.
- package.json: Arquivo de configuração do projeto que define dependências (three.js, vite, etc.) e scripts (dev, build, etc.).
- package-lock.json: Arquivo gerado automaticamente pelo npm, garantindo versões específicas das dependências instaladas.

## Comunicação frontend-backend
**Enviar Dados para o Backend (Salvar Configurações):**
Quando o usuário altera configurações (cor, posição, luz etc.), o frontend envia uma requisição **PUT** para atualizar os dados no **db.json** através do **config.js**.

**Fluxo:**
O usuário interage com os controles (ex: muda a posição do cubo).
O main.js chama saveSettings(), que envia os novos dados para o JSON Server.
O JSON Server atualiza o db.json com as novas configurações.

Código no config.js (Salvando Configurações):
```bash
  export async function saveSettings(newSettings) {
    try {
        // 1️⃣ Obter as configurações atuais antes de sobrescrever
        const response = await fetch(API_URL);
        const currentSettings = await response.json();

        // 2️⃣ Mesclar as novas configurações com as antigas
        const updatedSettings = { ...currentSettings, ...newSettings };

        // 3️⃣ Salvar os dados atualizados
        await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSettings)
        });

        console.log('Configurações salvas:', updatedSettings);
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
    }
}
```
**Buscar Dados do Backend (Carregar Configurações Salvas)**
Quando a página é carregada, o frontend envia uma requisição GET para buscar as configurações salvas no backend.

**Fluxo:**
- O **main.js** chama **loadSettings()**, que faz uma requisição para o JSON Server.
- O backend (**db.json**) responde com os valores salvos.
- O **main.js** aplica essas configurações na cena (**Three.js**).

Código no **config.js** (Carregando Configurações):
```bash
  export async function loadSettings() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        return {};
    }
}
```

## Possíveis melhorias futuras
Adicionar um Botão "Resetar Configurações"
📌 **Problema:**
- Se o usuário quiser restaurar as configurações iniciais, precisa alterar tudo manualmente.
🛠 **Solução:**
- Criar um botão que redefine os valores no db.json para um estado inicial.
Melhorar a Interface do Usuário
📌 **Problema:**
- A interface é baseada apenas em inputs básicos, o que pode ser pouco intuitivo.

🛠 **Solução:**
- Melhorar responsividade e design com CSS moderno.
- Permitir Múltiplos Objetos 3D

📌 **Problema:**
- Atualmente, só um cubo pode ser manipulado.

**🛠 Solução:**
- Criar um sistema onde o usuário pode adicionar e editar diferentes objetos.






