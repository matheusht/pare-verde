"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { AtSign, Send } from "lucide-react"
import type { Department } from "@/types/department"
import type { Communication } from "@/types/communication"

interface CommunicationPanelProps {
  communications: Communication[]
  departments: Department[]
}

export function CommunicationPanel({ communications, departments }: CommunicationPanelProps) {
  const [activeTeam, setActiveTeam] = useState(departments[0]?.id || "")
  const [message, setMessage] = useState("")
  const [mentionDropdownOpen, setMentionDropdownOpen] = useState(false)
  const [localComms, setLocalComms] = useState<Communication[]>(communications)

  // Get comments for the active team
  const teamComms = localComms.filter((comm) => comm.departmentId === activeTeam)

  // Format date for display
  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString("pt-BR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Handle message input
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    // Check if the last character is @ to open mention dropdown
    if (e.target.value.slice(-1) === "@") {
      setMentionDropdownOpen(true)
    } else {
      setMentionDropdownOpen(false)
    }
  }

  // Handle message submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Create a new communication
      const newComm: Communication = {
        id: `comm-${Date.now()}`,
        departmentId: activeTeam,
        author: "Matheus Teadoro (Coordinator)",
        timestamp: new Date().toISOString(),
        content: message,
      }

      // Add to local state
      setLocalComms([...localComms, newComm])
      setMessage("")
    }
  }

  return (
    <Card className="border-4 border-black shadow-neobrutalism overflow-hidden">
      <CardHeader className="border-b-4 border-black bg-blue-100">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <CardTitle className="text-xl">Team Communication</CardTitle>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Send Notification
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={departments[0]?.id || ""} onValueChange={setActiveTeam}>
          <TabsList className="w-full justify-start rounded-none border-b-4 border-black">
            {departments.map((dept) => (
              <TabsTrigger
                key={dept.id}
                value={dept.id}
                className="data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                {dept.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {departments.map((dept) => (
            <TabsContent key={dept.id} value={dept.id} className="p-4 max-h-[400px] overflow-y-auto">
              <div className="mb-4 space-y-4">
                {teamComms.length > 0 ? (
                  teamComms.map((comm) => (
                    <div
                      key={comm.id}
                      className="rounded-md border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8 border-2 border-black">
                          <div className="flex h-full w-full items-center justify-center bg-blue-200 text-xs font-bold">
                            {comm.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{comm.author}</div>
                            <div className="text-xs text-gray-500">{formatDate(comm.timestamp)}</div>
                          </div>
                          <div className="mt-1 text-sm">{comm.content}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border-2 border-black bg-gray-50 p-8 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <Textarea
                  value={message}
                  onChange={handleMessageChange}
                  placeholder={`Message ${dept.name}... (use @ to mention)`}
                  className="min-h-[100px] resize-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />

                {mentionDropdownOpen && (
                  <div className="absolute left-8 top-16 z-10 w-64 rounded-md border-2 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="mb-2 text-xs font-semibold">Mention someone:</div>
                    {["Eduardo Macacudo", "Azeitor", "Gordo", "Craque do Volley"].map((name) => (
                      <div
                        key={name}
                        className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
                        onClick={() => {
                          setMessage(message.slice(0, -1) + `@${name.split(" ")[0]} `)
                          setMentionDropdownOpen(false)
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <AtSign className="h-4 w-4" />
                          <span>{name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-2 flex justify-between">
                  <div className="text-xs text-gray-500">Use @name to mention someone</div>
                  <Button
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
