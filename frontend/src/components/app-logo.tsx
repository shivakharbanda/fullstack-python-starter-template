import { appConfig } from "@/config/app"
import { Cpu } from "lucide-react"

export function AppLogo() {
    return (
        <div className='flex items-center gap-2'>
            <Cpu className='size-6 text-primary' />
            <span className="font-semibold text-nowrap">{appConfig.name}</span>
        </div>
    )
}
