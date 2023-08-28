import { useToast } from "@/components/ui/use-toast";
export enum Variant {
    success = "success",
    danger = "destructive",
    default = 'default'
}
interface AlertInterface {
    variant: Variant,
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