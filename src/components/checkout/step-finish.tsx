import { useCheckoutStore } from "@/stores/checkout-store"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { generateMessage } from "@/lib/generate-message"

export const CheckoutStepFinish = () => {

    const { name } = useCheckoutStore(state => state)

    const message = generateMessage()
    
    const linkZap = `https://wa.me//${process.env.NEXT_PUBLIC_ZAP}?text=${encodeURI(message)}`

    return (
        <div className="text-center flex flex-col gap-5">
            <p>Perfeito <strong className="capitalize">{name}</strong>!</p>
            <p>Envie seu pedido ao nosso Whatsapp para concluir. Nosso atendente irá te guiar sobre o andamento do pedido.</p>
            <Button>
                <Link target="_blank" href={linkZap}>Enviar para o Whatsapp</Link>
            </Button>
        </div>
    )
}