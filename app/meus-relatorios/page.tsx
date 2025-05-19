"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageCircle, ThumbsUp, AlertTriangle, CheckCircle, Clock, X, ArrowLeft } from "lucide-react"

// Mock data for reports
const mockReports = [
  {
    id: "1",
    title: "Calçada danificada",
    category: "broken-sidewalk",
    location: "Av. Paulista, 1000",
    date: "2025-05-10T14:30:00",
    status: "resolved",
    description: "Calçada com buracos e desnivelada, dificultando a passagem de pedestres e cadeirantes.",
    photos: ["/calcada.webp?height=100&width=100"],
    comments: [
      { id: "c1", author: "Prefeitura", text: "Equipe enviada para avaliação.", date: "2025-05-11T09:15:00" },
      { id: "c2", author: "Prefeitura", text: "Reparo concluído.", date: "2025-05-15T16:45:00" },
    ],
    rating: 4,
    upvotes: 12,
  },
  {
    id: "2",
    title: "Falta de árvores",
    category: "missing-tree",
    location: "Rua Augusta, 500",
    date: "2025-05-18T10:20:00",
    status: "in-progress",
    description: "Área sem nenhuma árvore, causando desconforto térmico nos dias quentes.",
    photos: ["/arvore.webp?height=100&width=100"],
    comments: [
      { id: "c3", author: "Prefeitura", text: "Solicitação recebida e em análise.", date: "2025-05-19T11:30:00" },
    ],
    rating: null,
    upvotes: 8,
  },
  {
    id: "3",
    title: "Ilha de calor",
    category: "heat-island",
    location: "Praça da República",
    date: "2025-05-20T16:45:00",
    status: "pending",
    description: "Área com temperatura muito acima da média da cidade, sem sombra ou vegetação.",
    photos: ["/heat-island.webp?height=100&width=100"],
    comments: [],
    rating: null,
    upvotes: 5,
  },
]

// Status mapping
const statusMap = {
  pending: { label: "Pendente", color: "bg-yellow-500", icon: Clock },
  "in-progress": { label: "Em Andamento", color: "bg-blue-500", icon: AlertTriangle },
  resolved: { label: "Resolvido", color: "bg-green-500", icon: CheckCircle },
  rejected: { label: "Rejeitado", color: "bg-red-500", icon: X },
}

// Category mapping
const categoryMap = {
  "missing-ramp": "Rampa de acessibilidade ausente",
  obstruction: "Obstrução na calçada",
  "uneven-surface": "Superfície irregular",
  "broken-sidewalk": "Calçada quebrada",
  "missing-tree": "Área sem árvores",
  "heat-island": "Ilha de calor",
  flooding: "Área de alagamento",
  other: "Outro problema",
}

export default function MeusRelatorios() {
  const [activeReport, setActiveReport] = useState<string | null>(null)
  const [newComment, setNewComment] = useState("")
  const [reports, setReports] = useState(mockReports)

  const handleAddComment = (reportId: string) => {
    if (!newComment.trim()) return

    setReports(
      reports.map((report) => {
        if (report.id === reportId) {
          return {
            ...report,
            comments: [
              ...report.comments,
              {
                id: `c${Date.now()}`,
                author: "Você",
                text: newComment,
                date: new Date().toISOString(),
              },
            ],
          }
        }
        return report
      }),
    )

    setNewComment("")
  }

  const handleRateReport = (reportId: string, rating: number) => {
    setReports(
      reports.map((report) => {
        if (report.id === reportId) {
          return { ...report, rating }
        }
        return report
      }),
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Function to render status icon
  const renderStatusIcon = (status: string) => {
    const IconComponent = statusMap[status].icon
    return <IconComponent className="h-4 w-4 mr-1" />
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Simple header with back button */}
      <header className="bg-white border-b-4 border-black shadow-neobrutalism">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Button
              variant="neobrutalism"
              size="icon"
              className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-xl font-bold">Pare Verde</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meus Relatórios</h1>
          <Link href="/">
            <Button
              variant="neobrutalism"
              className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism text-white"
            >
              Novo Relatório
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 border-4 border-black shadow-neobrutalism">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Todos
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              Pendentes
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Em Andamento
            </TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Resolvidos
            </TabsTrigger>
          </TabsList>

          {["all", "pending", "in-progress", "resolved"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {reports
                .filter((report) => tab === "all" || report.status === tab)
                .map((report) => (
                  <Card key={report.id} className="border-4 border-black shadow-neobrutalism overflow-hidden">
                    <CardHeader className="bg-gray-100 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{report.title}</CardTitle>
                          <p className="text-sm text-gray-600">{report.location}</p>
                        </div>
                        <Badge
                          className={`${statusMap[report.status].color} border-2 border-black text-white px-3 py-1 flex items-center`}
                        >
                          {renderStatusIcon(report.status)}
                          {statusMap[report.status].label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">Categoria:</span>
                            <span>{categoryMap[report.category]}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">Data:</span>
                            <span>{formatDate(report.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">Apoios:</span>
                            <span className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" /> {report.upvotes}
                            </span>
                          </div>

                          {report.photos.length > 0 && (
                            <div className="mt-2">
                              <p className="font-bold mb-1">Fotos:</p>
                              <div className="flex flex-wrap gap-2">
                                {report.photos.map((photo, index) => (
                                  <img
                                    key={index}
                                    src={photo || "/placeholder.svg"}
                                    alt={`Foto ${index + 1}`}
                                    className="w-16 h-16 object-cover border-2 border-black"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:w-3/4">
                          <p className="font-bold mb-1">Descrição:</p>
                          <p className="text-gray-700 mb-4">{report.description}</p>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-bold">Atualizações:</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveReport(activeReport === report.id ? null : report.id)}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {report.comments.length} comentários
                              </Button>
                            </div>

                            {activeReport === report.id && (
                              <div className="border-4 border-black p-3 rounded-md mt-2 bg-gray-50">
                                {report.comments.length > 0 ? (
                                  <div className="space-y-3 mb-3">
                                    {report.comments.map((comment) => (
                                      <div key={comment.id} className="border-b border-gray-200 pb-2">
                                        <div className="flex justify-between items-center">
                                          <span className="font-bold">{comment.author}</span>
                                          <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                                        </div>
                                        <p>{comment.text}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 mb-3">Nenhum comentário ainda.</p>
                                )}

                                <div className="flex flex-col gap-2">
                                  <Textarea
                                    placeholder="Adicione um comentário ou atualização..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="border-2 border-black"
                                  />
                                  <Button
                                    variant="neobrutalism"
                                    className="bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white self-end"
                                    onClick={() => handleAddComment(report.id)}
                                  >
                                    Enviar Comentário
                                  </Button>
                                </div>
                              </div>
                            )}

                            {report.status === "resolved" && (
                              <div className="mt-4">
                                <p className="font-bold mb-2">Avalie a resolução:</p>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Button
                                      key={star}
                                      variant="ghost"
                                      size="icon"
                                      className={`h-8 w-8 ${
                                        report.rating && report.rating >= star ? "text-yellow-500" : "text-gray-300"
                                      }`}
                                      onClick={() => handleRateReport(report.id, star)}
                                    >
                                      <Star className="h-6 w-6 fill-current" />
                                    </Button>
                                  ))}
                                  {report.rating && (
                                    <span className="ml-2 text-sm self-center">
                                      Você avaliou com {report.rating} estrelas
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {reports.filter((report) => tab === "all" || report.status === tab).length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Nenhum relatório encontrado nesta categoria.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
