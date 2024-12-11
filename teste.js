const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Importa o middleware CORS

const app = express();
const port = 3000;

// Configura o CORS
app.use(cors({
  origin: 'https://gavioesporchapa13.com.br', // Permite requisições desse domínio
  credentials: true               // Permite o envio de cookies no CORS
}));

// Middleware para lidar com cookies
app.use(cookieParser());

// Rota para definir um cookie com valor aleatório
app.get('/set-cookie', (req, res) => {
  const randomValue = Math.random().toString(36).substring(2, 15); // Valor aleatório
  res.cookie('randomCookie', randomValue, {
    maxAge: 3600000, // Expira em 1 hora
    httpOnly: true,  // Não acessível pelo JavaScript do cliente
    secure: true,   // Apenas HTTPS (mude para `true` em produção)
    sameSite: 'Lax'  // Evita envio em contextos de terceiros
  });
  res.send(`Cookie "randomCookie" com valor "${randomValue}" foi configurado!`);
});

// Rota para exibir o cookie armazenado
app.get('/get-cookie', (req, res) => {
  const cookieValue = req.cookies.randomCookie || 'Nenhum cookie encontrado';
  res.send(`Valor do cookie: ${cookieValue}`);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
