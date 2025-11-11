# 🧠 Desafio 06 — Reconhecimento de Objetos (Visão Computacional)

![Typing SVG](https://readme-typing-svg.herokuapp.com/?color=a78bfa&size=35&center=true&vCenter=true&width=1000&lines=Reconhecimento+de+Objetos+com+IA;Desafio+06+—+Instituto+Joule+%F0%9F%A4%96)

---

## 📘 Descrição

O **Desafio 06** consiste em desenvolver uma aplicação web que **analisa imagens** através de técnicas de visão computacional e **reconhece os objetos presentes**, gerando **uma descrição detalhada para cada objeto** detectado.

A aplicação permite que o usuário envie uma imagem e receba:
- Uma **lista dos objetos detectados** (por exemplo: "copo", "cadeira", "pessoa");
- Uma **descrição curta** para cada objeto (por exemplo: "copo de vidro sobre a mesa, parcialmente cheio");
- **Bounding boxes** ou destaque visual sobre a imagem (opcional, dependendo da implementação);
- Informações adicionais como confiança da detecção e posição aproximada.

O objetivo é explorar **integração front-end + modelos de visão (API de IA)**, entregar uma interface intuitiva e tornar resultados complexos fáceis de entender.

---

## ✨ Funcionalidades Principais

* Upload de imagens (arrastar & soltar ou selecionar arquivo);
* Detecção automática de objetos na imagem;
* Descrição textual por objeto (resumo do que o objeto é e seu contexto);
* Visualização das caixas delimitadoras (bounding boxes) e etiquetas;
* Histórico de imagens analisadas (opcional);
* Exportar resultado como JSON ou copiar a descrição.

---

## ⚙️ Tecnologias Utilizadas

* **React.js (TypeScript)** — interface reativa e componentes
* **Vite** — ferramenta de build e dev server
* **TailwindCSS** — estilização utilitária e responsiva
* **APIs de Visão/IA** — modelos de object detection & captioning (ex.: Google Vision / Azure Computer Vision / modelos open-source via servidor)
* **Host:** Vercel / GitHub Pages (frontend) — ou deploy full-stack em plataformas compatíveis

> **Observação:** dependendo da opção de API escolhida, pode haver limites gratuitos, marca-d'água ou necessidade de chave de API.

---


## 🚀 Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/Matewanga/CURSOS.git
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Inicie o projeto:

   ```bash
   npm run dev
   ```
4. Acesse o link exibido no terminal (geralmente `http://localhost:5173`).
---

## 💡 Aprendizados

Durante o desenvolvimento deste projeto você aprofunda-se em:

* Integração entre front-end e serviços de visão computacional;
* Pré-processamento de imagens para melhorar detecções (resize, normalização);
* Interpretação dos scores de confiança dos modelos;
* UX para apresentar resultados complexos de maneira acessível;
* Boas práticas de deploy e configuração de chaves de API com variáveis de ambiente.

---

## 👩‍💻 Autora

**Rebeca Matewanga Maria Kamalandua**
📍 Desenvolvedora Front-end | Estudante da FATEC
✨ *Projeto desenvolvido no Instituto Joule – LabAI*

---

> “A visão computacional aproxima máquinas dos sentidos humanos — e abre portas para novas formas de compreender o mundo.”
> — *Equipe LabAI*

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=a78bfa&height=120&section=footer"/>

