import { useCallback, useState } from 'react'

type CopiedValue = string

type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>("")

    const copy: CopyFn = useCallback(async text => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported')
            return false
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            return true
        } catch (error) {
            console.warn('Copy failed', error)
            setCopiedText("")
            return false
        }
    }, [])

    return [copiedText, copy]
}