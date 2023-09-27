# Use uma imagem de node.js como base
FROM node:18

# Crie o diretório de trabalho dentro do container
WORKDIR usr/client/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta em que a aplicação React será executada
EXPOSE 3000

# Inicialize a aplicação React
CMD ["npm", "start"]