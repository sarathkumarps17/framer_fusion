import { useToast } from "@/components/ui/use-toast";

interface AlertInterface {
    variant?: "success" | "destructive" | 'default',
    description: string,
    title?: string,
    timeDelay?: number

}
const useAlert = (props: AlertInterface) => {
    const { timeDelay, ...restProps } = props
    const { toast } = useToast()
    const setAlert = () => {
        const alertToast = toast(restProps)
        setTimeout(() => alertToast.dismiss(), timeDelay ? timeDelay : 5000)
    }
    return setAlert
}

export default useAlert