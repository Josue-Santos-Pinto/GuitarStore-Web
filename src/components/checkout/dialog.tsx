"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CheckoutStepUser } from "@/components/checkout/step-user"
import { CheckoutStepAddress } from "@/components/checkout/step-address"
import { CheckoutStepFinish } from "@/components/checkout/step-finish"
import { CheckoutSteps } from "@/types/checkout-steps"



type Props = {
    open: boolean,
    onOpenChange: (open:boolean) => void
}
export const CheckoutDialog = ({open, onOpenChange }: Props) => {

    const [step, setStep] = useState<CheckoutSteps>('user')

    let ProgressPct = 0

    switch(step){
        case 'user':
            ProgressPct = 33
            break
        case 'adress':
            ProgressPct = 66
            break
        case "finish":
            ProgressPct = 100
            break
        default:
            ProgressPct = 100
            break 
    }

    return (
       <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {step === 'user' && 'Dados Pessoais'}
                        {step === 'adress' && 'Endereço de Entrega'}
                        {step === 'finish' && 'Envio para o Whatsapp'}
                    </DialogTitle>
                </DialogHeader>
                <Progress value={ProgressPct} />

                <div className="flex flex-col gap-3">
                   {step === 'user' && <CheckoutStepUser setStep={setStep} />}
                   {step === 'adress' && <CheckoutStepAddress setStep={setStep} />}
                   {step === 'finish' && <CheckoutStepFinish />}
                </div>
            </DialogContent>
       </Dialog>
    )
}