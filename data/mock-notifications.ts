import type { Notification } from "@/types/notification"

// Helper function to create timestamps relative to now
const getRelativeTime = (daysAgo: number, hoursAgo = 0, minutesAgo = 0) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  date.setHours(date.getHours() - hoursAgo)
  date.setMinutes(date.getMinutes() - minutesAgo)
  return date.toISOString()
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "report",
    title: "Seu relatório foi resolvido",
    content:
      "Boas notícias! A prefeitura concluiu o reparo da calçada danificada que você reportou na Av. Paulista, 1000. Agradecemos sua contribuição para tornar nossa cidade mais acessível.",
    timestamp: getRelativeTime(0, 2), // 2 hours ago
    read: false,
    actionLink: "/meus-relatorios",
    actionText: "Ver Relatório",
  },
  {
    id: "2",
    type: "event",
    title: "Plantio de Árvores neste Sábado",
    content:
      "Junte-se a nós para o plantio de árvores no Parque Central neste sábado, 24 de maio, das 9h às 12h. Traga sua família e amigos para ajudar a tornar nossa cidade mais verde!",
    timestamp: getRelativeTime(0, 5), // 5 hours ago
    read: false,
    actionLink: "/comunidade",
    actionText: "Participar",
  },
  {
    id: "3",
    type: "alert",
    title: "Alerta de Temperatura Elevada",
    content:
      "Prevê-se que as temperaturas ultrapassem os 35°C nos próximos dias. Recomendamos evitar a exposição prolongada ao sol, manter-se hidratado e procurar áreas com sombra.",
    timestamp: getRelativeTime(1), // 1 day ago
    read: true,
    actionLink: "/recursos",
    actionText: "Dicas de Proteção",
  },
  {
    id: "4",
    type: "report",
    title: "Atualização do seu relatório",
    content:
      "A equipe de manutenção foi designada para avaliar o problema de falta de árvores que você reportou na Rua Augusta, 500. Estimamos que a avaliação seja concluída em até 5 dias úteis.",
    timestamp: getRelativeTime(2), // 2 days ago
    read: true,
    actionLink: "/meus-relatorios",
    actionText: "Ver Relatório",
  },
  {
    id: "5",
    type: "event",
    title: "Workshop de Compostagem",
    content:
      "Aprenda a fazer compostagem doméstica no Workshop que acontecerá no Centro Comunitário no dia 2 de junho, das 14h às 16h. Vagas limitadas, inscreva-se já!",
    timestamp: getRelativeTime(3), // 3 days ago
    read: false,
    actionLink: "/comunidade",
    actionText: "Inscrever-se",
  },
  {
    id: "6",
    type: "alert",
    title: "Obras na Avenida Principal",
    content:
      "Informamos que haverá obras de melhoria na Avenida Principal durante os próximos 15 dias. O trânsito será parcialmente interrompido. Recomendamos utilizar rotas alternativas.",
    timestamp: getRelativeTime(4), // 4 days ago
    read: true,
    actionLink: "/",
    actionText: "Ver no Mapa",
  },
  {
    id: "7",
    type: "report",
    title: "Seu relatório foi recebido",
    content:
      "Recebemos seu relatório sobre a ilha de calor na Praça da República. Sua contribuição é muito importante para melhorarmos a qualidade ambiental da nossa cidade.",
    timestamp: getRelativeTime(5), // 5 days ago
    read: true,
    actionLink: "/meus-relatorios",
    actionText: "Ver Relatório",
  },
  {
    id: "8",
    type: "event",
    title: "Mapeamento de Calçadas Acessíveis",
    content:
      "Participe do mapeamento colaborativo de calçadas acessíveis no Centro da Cidade no dia 10 de junho, das 10h às 13h. Ajude a identificar pontos críticos de acessibilidade.",
    timestamp: getRelativeTime(6), // 6 days ago
    read: true,
    actionLink: "/comunidade",
    actionText: "Participar",
  },
]
