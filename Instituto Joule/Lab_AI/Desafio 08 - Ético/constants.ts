import { Scenario, ScenarioId } from './types';
import { Users, Video, Car, Scale, ShieldAlert, Cpu } from 'lucide-react';

export const SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.HIRING,
    title: "O Viés do Algoritmo",
    category: "Viés Algorítmico & Justiça",
    description: "Você é o CTO de uma grande empresa de tecnologia. Seu novo sistema de IA para triagem de currículos está descartando candidatas mulheres qualificadas a uma taxa 40% maior que homens, pois foi treinado em dados históricos da empresa (majoritariamente masculinos).",
    context: "O sistema aumentou a eficiência do RH em 200%, economizando milhões. Desligá-lo atrasará contratações críticas. Corrigir o dataset levará meses.",
    options: [
      {
        id: 'patch',
        label: "Ajuste Técnico Rápido",
        shortDescription: "Aplicar um peso artificial para favorecer currículos femininos sem alterar o dataset base.",
        risk: "Pode ser visto como 'discriminação positiva' forçada e não resolve a raiz do problema."
      },
      {
        id: 'shutdown',
        label: "Suspensão Imediata",
        shortDescription: "Desligar a IA e voltar para triagem manual até que um novo modelo seja treinado do zero.",
        risk: "Queda drástica na produtividade e perda de talentos pela demora no processo."
      },
      {
        id: 'transparency',
        label: "Manter com Supervisão",
        shortDescription: "Manter a IA rodando, mas exigir revisão humana obrigatória para todos os candidatos rejeitados.",
        risk: "Mantém o viés na primeira etapa e sobrecarrega os revisores humanos, reduzindo a economia."
      }
    ]
  },
  {
    id: ScenarioId.DEEPFAKE,
    title: "A Eleição Deepfake",
    category: "Desinformação & Democracia",
    description: "Você lidera a equipe de ética de uma grande rede social. Faltam 48 horas para uma eleição presidencial acirrada. Um vídeo hyper-realista (Deepfake) do candidato líder cometendo um crime grave viraliza na sua plataforma.",
    context: "A equipe técnica confirma com 95% de certeza que é falso. Porém, o vídeo já tem milhões de views. Remover pode ser visto como censura política; manter pode alterar o resultado da eleição.",
    options: [
      {
        id: 'remove',
        label: "Remoção Total",
        shortDescription: "Apagar o vídeo de todos os servidores e banir quem repostar.",
        risk: "Acusações de partidarismo e censura, possível 'Efeito Streisand' (tentar esconder atrai mais atenção)."
      },
      {
        id: 'label',
        label: "Rotulagem Agressiva",
        shortDescription: "Manter o vídeo, mas colocar um aviso inamovível de 'Mídia Manipulada' cobrindo parte do conteúdo.",
        risk: "Muitos usuários ignoram avisos ou acreditam que a plataforma está mentindo."
      },
      {
        id: 'algorithm',
        label: "Supressão Algorítmica",
        shortDescription: "Não remover, mas reduzir o alcance a zero. O vídeo existe, mas não aparece em feeds.",
        risk: "Falta de transparência ('Shadowbanning') e desconfiança pública sobre como a plataforma decide o que é visto."
      }
    ]
  },
  {
    id: ScenarioId.AUTONOMOUS,
    title: "O Dilema do Túnel",
    category: "Segurança & Utilitarismo",
    description: "Você programa a ética de um carro autônomo Nível 5. O carro entra em um túnel e detecta uma falha crítica nos freios. À frente, um ônibus escolar tombou bloqueando a pista. À direita, um precipício. À esquerda, uma parede de concreto.",
    context: "O carro deve tomar uma decisão em milissegundos. Não há tempo para parar.",
    options: [
      {
        id: 'protect_passenger',
        label: "Priorizar o Passageiro",
        shortDescription: "Jogar o carro contra a parede de concreto. O passageiro do carro (seu cliente) tem alta chance de sobrevivência, mas o carro pode ricochetear e ferir levemente outros.",
        risk: "Vender segurança priorizando o comprador levanta questões éticas sobre valor da vida baseada em poder de compra."
      },
      {
        id: 'utilitarian',
        label: "Minimizar Vidas Perdidas",
        shortDescription: "Calcular a trajetória com menor número total de fatalidades prováveis, mesmo que signifique sacrificar o passageiro (jogando no precipício).",
        risk: "Quem compraria um carro programado para matá-lo em prol do 'bem maior'?"
      },
      {
        id: 'uncertainty',
        label: "Manter a Trajetória",
        shortDescription: "Não programar desvio ativo. Tentar frear ao máximo e bater no obstáculo (ônibus), transferindo a 'culpa' para a falha física, não a decisão do código.",
        risk: "Pode resultar no maior número de vítimas (crianças no ônibus + passageiro), mas evita a 'escolha de matar'."
      }
    ]
  }
];

export const ICONS = {
  [ScenarioId.HIRING]: Users,
  [ScenarioId.DEEPFAKE]: Video,
  [ScenarioId.AUTONOMOUS]: Car
};
