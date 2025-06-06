import { useState } from "react"

export const useBoolean = (initialValue: boolean = false) => {
    const [value, setValue] = useState(initialValue)

    const onTrue = () => setValue(true)
    const onFalse = () => setValue(false)
    const toggle = () => setValue(!value)

    return { value, onTrue, onFalse, toggle }
}