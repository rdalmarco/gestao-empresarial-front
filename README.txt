1 - Baixar repositório.
2 - Navegar até a pasta raiz.
3 - Buildar a imagem docker build -t gestao-empresarial-front .
4 - Rodar  docker run -p 3001:3000 -e NEXT_PUBLIC_API_URL=http://localhost:3000 gestao-empresarial-front npm run dev