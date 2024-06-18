# Usa la imagen oficial de Node.js versión 18 en su variante slim como base
FROM node:18-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia todos los archivos del contexto actual al directorio /app en el contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Elimina node_modules y package-lock.json existentes
RUN rm -rf node_modules package-lock.json

# Instala las dependencias
RUN npm run dev

# Comando para ejecutar la aplicación Node.js
CMD ["node", "index.js"]
