# 🧠 Orquestrador Multimodal — Análise de Imagem + Áudio

![Typing SVG](https://readme-typing-svg.herokuapp.com/?color=0ea5e9\&size=35\&center=true\&vCenter=true\&width=1000\&lines=Inteligência+Artificial+Multimodal;Imagem+%2B+Áudio+em+um+só+fluxo;Projeto+LabAI+—+Instituto+Joule)

---

## 📘 Descrição

O **Orquestrador Multimodal** é uma aplicação web que permite **enviar uma imagem e um áudio simultaneamente**, e recebe como retorno uma **análise orquestrada** feita por IA — combinando visão computacional com interpretação de fala/som.

O sistema realiza:

* 📷 **interpretação do conteúdo visual** (objetos, contexto, cenário);
* 🎧 **análise do áudio enviado** (fala, tom, possíveis significados);
* 🔗 **união das duas análises** para gerar um resultado coerente e detalhado;
* ✏️ opção de **refinar/editar o resultado usando instruções adicionais**.

O objetivo é explorar **IA multimodal**, interface amigável e comunicação clara de resultados complexos.

---

## ✨ Funcionalidades

✔️ Upload de imagem
✔️ Upload de áudio
✔️ Análise integrada (imagem + som)
✔️ Mensagens de erro amigáveis
✔️ Botão de nova análise
✔️ Recurso de **“Editar/Refinar análise”**
✔️ Interface estilizada com Tailwind
✔️ Logo local funcionando corretamente (import via ESModule)

---

## 🖼️ Sobre a Logo

A logo é carregada localmente a partir de:

```
src/img/logo.png
```

E deve ser importada assim:

```ts
import logo from "./img/logo.png";
```

> Caminhos diretos como `./img/logo.png` dentro de JSX podem falhar no build — por isso usamos import.

---

## ⚙️ Tecnologias Utilizadas

* **React + TypeScript**
* **Vite**
* **TailwindCSS**
* **Lucide Icons**
* **API de IA Multimodal (Gemini)**
* Deploy compatível com **Vercel / GitHub Pages**

---

## 🚀 Como Executar

1️⃣ Clone o repositório:

```bash
git clone https://github.com/Matewanga/CURSOS.git
```

2️⃣ Entre na pasta do projeto:

```bash
cd CURSOS
```

3️⃣ Instale as dependências:

```bash
npm install
```

4️⃣ Crie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

👉 Cole sua chave da API no `.env`:

```
VITE_GEMINI_API_KEY=SUAS_CHAVE_AQUI
```

5️⃣ Execute:

```bash
npm run dev
```

Acesse normalmente no navegador (geralmente):

```
http://localhost:5173
```

---

## 📚 Aprendizados

Durante o desenvolvimento, foram trabalhados:

* integração entre **dados multimodais**;
* tratamento de erros e UX para IA;
* boas práticas com React e estado global;
* organização de assets (ex.: logo local);
* requisições seguras com variáveis de ambiente.

---

## 👩‍💻 Autora

**Rebeca Matewanga Maria Kamalandua**
📍 Desenvolvedora Front-end | Estudante FATEC
✨ Projeto desenvolvido no **Instituto Joule — LabAI**

---

> “IA multimodal não apenas vê ou ouve — ela compreende contextos.”

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0ea5e9&height=120&section=footer"/>
