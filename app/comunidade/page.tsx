"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Book,
  Calendar,
  Trophy,
  ChevronRight,
  Star,
  Award,
  ThumbsUp,
  Users,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

export default function CommunityHub() {
  const isMobile = useMobile()
  const [activeSection, setActiveSection] = useState("impact")
  const sectionRefs = {
    impact: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    volunteer: useRef<HTMLDivElement>(null),
    gamification: useRef<HTMLDivElement>(null),
  }

  // Handle scroll to section
  const scrollToSection = (section: string) => {
    setActiveSection(section)
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: "smooth" })
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Check which section is currently in view
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop
          const offsetBottom = offsetTop + ref.current.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b-4 border-black shadow-neobrutalism sticky top-0 z-30">
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

      {/* Page Title */}
      <div className="bg-yellow-400 border-b-4 border-black py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Comunidade</h1>
          <p className="text-lg mt-2">Conectando pessoas para transformar nossa cidade</p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="sticky top-16 bg-white border-b-4 border-black z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 gap-2">
            <Button
              variant="neobrutalism"
              className={`${
                activeSection === "impact" ? "bg-green-500 text-white" : "bg-white"
              } border-4 border-black shadow-neobrutalism whitespace-nowrap`}
              onClick={() => scrollToSection("impact")}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Impacto Comunitário
            </Button>
            <Button
              variant="neobrutalism"
              className={`${
                activeSection === "education" ? "bg-blue-500 text-white" : "bg-white"
              } border-4 border-black shadow-neobrutalism whitespace-nowrap`}
              onClick={() => scrollToSection("education")}
            >
              <Book className="h-5 w-5 mr-2" />
              Recursos Educativos
            </Button>
            <Button
              variant="neobrutalism"
              className={`${
                activeSection === "volunteer" ? "bg-purple-500 text-white" : "bg-white"
              } border-4 border-black shadow-neobrutalism whitespace-nowrap`}
              onClick={() => scrollToSection("volunteer")}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Voluntariado
            </Button>
            <Button
              variant="neobrutalism"
              className={`${
                activeSection === "gamification" ? "bg-orange-500 text-white" : "bg-white"
              } border-4 border-black shadow-neobrutalism whitespace-nowrap`}
              onClick={() => scrollToSection("gamification")}
            >
              <Trophy className="h-5 w-5 mr-2" />
              Reconhecimento
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Community Impact Section */}
        <section ref={sectionRefs.impact} className="mb-16 scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-2 rounded-full border-4 border-black shadow-neobrutalism">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Impacto Comunitário</h2>
          </div>

          {/* Milestone Banner */}
          <div className="bg-yellow-300 border-4 border-black shadow-neobrutalism p-4 mb-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Award className="h-12 w-12 mr-4" />
              <div>
                <h3 className="text-xl font-bold">Marco Alcançado!</h3>
                <p className="text-lg">500 problemas de acessibilidade resolvidos!</p>
              </div>
            </div>
            <Button
              variant="neobrutalism"
              className="bg-black text-white hover:bg-gray-800 border-4 border-black shadow-neobrutalism"
            >
              Ver Detalhes
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>

          {/* Total Resolved Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-4 border-black shadow-neobrutalism">
              <CardHeader className="bg-green-100 border-b-4 border-black">
                <CardTitle>Relatórios Resolvidos</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold mb-4">1,248</div>
                  <div className="w-full mb-2">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progresso da Cidade</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-4 border-2 border-black" indicatorClassName="bg-green-500" />
                  </div>
                  <div className="grid grid-cols-3 w-full mt-4 gap-2 text-center">
                    <div className="border-4 border-black p-2">
                      <div className="text-xl font-bold">523</div>
                      <div className="text-xs">Acessibilidade</div>
                    </div>
                    <div className="border-4 border-black p-2">
                      <div className="text-xl font-bold">412</div>
                      <div className="text-xs">Áreas Verdes</div>
                    </div>
                    <div className="border-4 border-black p-2">
                      <div className="text-xl font-bold">313</div>
                      <div className="text-xs">Infraestrutura</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map of Improvements */}
            <Card className="border-4 border-black shadow-neobrutalism">
              <CardHeader className="bg-green-100 border-b-4 border-black">
                <CardTitle>Mapa de Melhorias por Bairro</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="aspect-square bg-gray-200 border-4 border-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Mapa da Cidade</p>
                  </div>
                  {/* Neighborhood markers would go here */}
                  <div className="absolute top-1/4 left-1/3 bg-green-500 rounded-full h-6 w-6 border-2 border-black flex items-center justify-center text-xs text-white font-bold">
                    42
                  </div>
                  <div className="absolute top-1/2 left-1/2 bg-green-500 rounded-full h-8 w-8 border-2 border-black flex items-center justify-center text-xs text-white font-bold">
                    78
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 bg-green-500 rounded-full h-5 w-5 border-2 border-black flex items-center justify-center text-xs text-white font-bold">
                    31
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Before/After Gallery */}
          <Card className="border-4 border-black shadow-neobrutalism mb-8">
            <CardHeader className="bg-green-100 border-b-4 border-black">
              <CardTitle>Antes e Depois</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="border-4 border-black">
                    <div className="grid grid-cols-2 h-48">
                      <div className="bg-gray-300 border-r-4 border-black flex items-center justify-center">
                        <p className="text-gray-600">Antes</p>
                      </div>
                      <div className="bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-600">Depois</p>
                      </div>
                    </div>
                    <div className="p-3 border-t-4 border-black bg-white">
                      <h4 className="font-bold">Calçada Reformada</h4>
                      <p className="text-sm">Av. Paulista, 1000</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  variant="neobrutalism"
                  className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism text-white"
                >
                  Ver Mais Transformações
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Educational Resources Section */}
        <section ref={sectionRefs.education} className="mb-16 scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500 p-2 rounded-full border-4 border-black shadow-neobrutalism">
              <Book className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Recursos Educativos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Como Reportar Problemas",
                icon: FileText,
                color: "bg-blue-100",
                description: "Aprenda a identificar e reportar problemas urbanos de forma eficaz.",
              },
              {
                title: "Guia de Espaços Verdes",
                icon: MapPin,
                color: "bg-green-100",
                description: "Diretrizes para criação e manutenção de áreas verdes urbanas.",
              },
              {
                title: "Ilhas de Calor Explicadas",
                icon: ThumbsUp,
                color: "bg-red-100",
                description: "Entenda o que são ilhas de calor e como podemos combatê-las.",
              },
              {
                title: "Acessibilidade Urbana",
                icon: Users,
                color: "bg-purple-100",
                description: "Princípios básicos para uma cidade mais acessível a todos.",
              },
              {
                title: "Mobilidade Sustentável",
                icon: Calendar,
                color: "bg-yellow-100",
                description: "Alternativas de transporte para reduzir emissões e melhorar a qualidade de vida.",
              },
              {
                title: "Gestão de Resíduos",
                icon: Award,
                color: "bg-orange-100",
                description: "Como separar corretamente seus resíduos e reduzir o impacto ambiental.",
              },
            ].map((resource, index) => (
              <Card key={index} className="border-4 border-black shadow-neobrutalism overflow-hidden">
                <CardHeader className={`${resource.color} border-b-4 border-black`}>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full border-4 border-black">
                      <resource.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">{resource.description}</p>
                  <Button
                    variant="neobrutalism"
                    className="w-full bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
                  >
                    Ler Artigo
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Volunteer Opportunities Section */}
        <section ref={sectionRefs.volunteer} className="mb-16 scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500 p-2 rounded-full border-4 border-black shadow-neobrutalism">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Oportunidades de Voluntariado</h2>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 border-4 border-black shadow-neobrutalism">
                <TabsTrigger value="all" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  Todos
                </TabsTrigger>
                <TabsTrigger
                  value="planting"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Plantio
                </TabsTrigger>
                <TabsTrigger value="cleanup" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Limpeza
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                >
                  Educação
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {[
                  {
                    title: "Plantio de Árvores no Parque Central",
                    date: "24/05/2025",
                    time: "09:00 - 12:00",
                    location: "Parque Central",
                    tags: ["Plantio", "Áreas Verdes"],
                    spots: 12,
                  },
                  {
                    title: "Limpeza da Praia Municipal",
                    date: "30/05/2025",
                    time: "08:00 - 11:00",
                    location: "Praia Municipal",
                    tags: ["Limpeza", "Resíduos"],
                    spots: 25,
                  },
                  {
                    title: "Workshop de Compostagem",
                    date: "02/06/2025",
                    time: "14:00 - 16:00",
                    location: "Centro Comunitário",
                    tags: ["Educação", "Resíduos"],
                    spots: 15,
                  },
                  {
                    title: "Mapeamento de Calçadas Acessíveis",
                    date: "10/06/2025",
                    time: "10:00 - 13:00",
                    location: "Centro da Cidade",
                    tags: ["Acessibilidade", "Mapeamento"],
                    spots: 8,
                  },
                ].map((event, index) => (
                  <Card key={index} className="border-4 border-black shadow-neobrutalism">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                      <div className="md:col-span-3 p-6">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div>
                            <p className="text-sm font-bold">Data:</p>
                            <p>{event.date}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold">Horário:</p>
                            <p>{event.time}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold">Local:</p>
                            <p>{event.location}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold">Vagas:</p>
                            <p>{event.spots} disponíveis</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              className="bg-purple-100 text-purple-800 border-2 border-black hover:bg-purple-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="bg-purple-100 border-t-4 md:border-t-0 md:border-l-4 border-black flex flex-col items-center justify-center p-4">
                        <Button
                          variant="neobrutalism"
                          className="bg-purple-500 hover:bg-purple-600 border-4 border-black shadow-neobrutalism text-white w-full"
                        >
                          Participar
                        </Button>
                        <p className="text-sm mt-2 text-center">Inscrições até {event.date}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Other tabs would have similar content filtered by category */}
              <TabsContent value="planting" className="space-y-4">
                <div className="text-center py-10">
                  <p className="text-gray-500">Filtrando eventos de plantio...</p>
                </div>
              </TabsContent>
              <TabsContent value="cleanup" className="space-y-4">
                <div className="text-center py-10">
                  <p className="text-gray-500">Filtrando eventos de limpeza...</p>
                </div>
              </TabsContent>
              <TabsContent value="education" className="space-y-4">
                <div className="text-center py-10">
                  <p className="text-gray-500">Filtrando eventos educativos...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Gamification & Recognition Section */}
        <section ref={sectionRefs.gamification} className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 p-2 rounded-full border-4 border-black shadow-neobrutalism">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Reconhecimento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Stats */}
            <Card className="border-4 border-black shadow-neobrutalism md:col-span-1">
              <CardHeader className="bg-orange-100 border-b-4 border-black">
                <CardTitle>Suas Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-black mb-2 flex items-center justify-center">
                    <Users className="h-12 w-12" />
                  </div>
                  <h3 className="font-bold text-xl">Matheus</h3>
                  <p className="text-sm text-gray-600">Nível 3: Cidadão Ativo</p>
                </div>

                <div className="space-y-4">
                  <div className="border-4 border-black p-3">
                    <div className="flex justify-between">
                      <span>Relatórios Enviados</span>
                      <span className="font-bold">12</span>
                    </div>
                  </div>
                  <div className="border-4 border-black p-3">
                    <div className="flex justify-between">
                      <span>Problemas Resolvidos</span>
                      <span className="font-bold">8</span>
                    </div>
                  </div>
                  <div className="border-4 border-black p-3">
                    <div className="flex justify-between">
                      <span>Pontos Ganhos</span>
                      <span className="font-bold">345</span>
                    </div>
                  </div>
                  <div className="border-4 border-black p-3">
                    <div className="flex justify-between">
                      <span>Eventos Participados</span>
                      <span className="font-bold">2</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold mb-2">Conquistas</h4>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((badge) => (
                      <div
                        key={badge}
                        className="w-12 h-12 bg-yellow-100 rounded-full border-4 border-black flex items-center justify-center"
                        title={`Conquista ${badge}`}
                      >
                        <Star className="h-6 w-6 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border-4 border-black shadow-neobrutalism md:col-span-2">
              <CardHeader className="bg-orange-100 border-b-4 border-black">
                <CardTitle>Ranking por Bairro</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-4 text-center">Mais Relatórios</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Centro", count: 156, color: "bg-yellow-500" },
                        { name: "Jardim Imperial", count: 124, color: "bg-gray-300" },
                        { name: "Vila Nova", count: 98, color: "bg-orange-300" },
                        { name: "Bela Vista", count: 87, color: "bg-gray-300" },
                        { name: "Lar Parana", count: 76, color: "bg-gray-300" },
                      ].map((neighborhood, index) => (
                        <div key={index} className="border-4 border-black p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 ${neighborhood.color} rounded-full border-2 border-black flex items-center justify-center mr-2 font-bold`}
                            >
                              {index + 1}
                            </div>
                            <span>{neighborhood.name}</span>
                          </div>
                          <span className="font-bold">{neighborhood.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4 text-center">Mais Resoluções</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Jardim Imperial", count: 112, color: "bg-yellow-500" },
                        { name: "Centro", count: 98, color: "bg-gray-300" },
                        { name: "Bela Vista", count: 76, color: "bg-orange-300" },
                        { name: "Vila Nova", count: 65, color: "bg-gray-300" },
                        { name: "Lar Parana", count: 54, color: "bg-gray-300" },
                      ].map((neighborhood, index) => (
                        <div key={index} className="border-4 border-black p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 ${neighborhood.color} rounded-full border-2 border-black flex items-center justify-center mr-2 font-bold`}
                            >
                              {index + 1}
                            </div>
                            <span>{neighborhood.name}</span>
                          </div>
                          <span className="font-bold">{neighborhood.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold mb-4 text-center">Top Contribuidores</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((user) => (
                      <div
                        key={user}
                        className="w-16 h-16 bg-orange-100 rounded-full border-4 border-black flex items-center justify-center"
                        title={`Usuário ${user}`}
                      >
                        <span className="font-bold text-lg">U{user}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
