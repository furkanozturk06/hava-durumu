# 1. Node image kullan
FROM node:20-alpine

# 2. Çalışma klasörü
WORKDIR /app

# 3. Package.json kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Kodları kopyala
COPY . .

# 6. Geliştirme sunucusu çalıştır
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"]
