"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StepOne } from "@/components/reporting-steps/step-one"
import { StepTwo } from "@/components/reporting-steps/step-two"
import { StepThree } from "@/components/reporting-steps/step-three"

interface ReportingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialLocation?: { lat: number; lng: number }
}

export function ReportingModal({ open, onOpenChange, initialLocation }: ReportingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    category: "",
    location: initialLocation || { lat: -23.5505, lng: -46.6333 }, // São Paulo as default
    photos: [] as File[],
    voiceNote: null as File | null,
    obstacleTags: [] as string[],
    otherObstacle: "",
    severity: 3,
    description: "",
    notifyMe: false,
    email: "",
  })

  // Update location when initialLocation changes or when modal opens
  useEffect(() => {
    if (initialLocation && open) {
      console.log("Updating location in modal:", initialLocation)
      setFormData((prev) => ({
        ...prev,
        location: initialLocation,
      }))
    }
  }, [initialLocation, open])

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Here you would send the data to your API
    onOpenChange(false)
    setCurrentStep(1)
    // Reset form data or show success message
  }

  // Reset to step 1 when modal is closed
  useEffect(() => {
    if (!open) {
      setCurrentStep(1)
    }
  }, [open])

  const stepTitles = ["O que e onde?", "Mostre-nos", "Conte mais e envie"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-4 border-black shadow-neobrutalism bg-white p-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-green-500 p-6 border-b-4 border-black">
          <DialogTitle className="text-2xl font-bold text-black">Reportar Problema</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Step indicators */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-black font-bold text-xl
                    ${
                      currentStep === step
                        ? "bg-yellow-400 text-black"
                        : currentStep > step
                          ? "bg-green-500 text-black"
                          : "bg-gray-200 text-black"
                    }`}
                >
                  {currentStep > step ? "✓" : step}
                </div>
                <span className="mt-2 text-sm font-medium">{stepTitles[step - 1]}</span>
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="mb-8">
            {currentStep === 1 && <StepOne formData={formData} updateFormData={updateFormData} />}
            {currentStep === 2 && <StepTwo formData={formData} updateFormData={updateFormData} />}
            {currentStep === 3 && <StepThree formData={formData} updateFormData={updateFormData} />}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="neobrutalism"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="bg-gray-200 hover:bg-gray-300 border-4 border-black shadow-neobrutalism text-black"
            >
              Voltar
            </Button>

            {currentStep < 3 ? (
              <Button
                variant="neobrutalism"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
              >
                Próximo
              </Button>
            ) : (
              <Button
                variant="neobrutalism"
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism text-white"
              >
                Enviar Relatório
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
