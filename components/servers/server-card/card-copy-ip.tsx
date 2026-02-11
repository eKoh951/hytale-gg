'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CardCopyIp({
  ip,
  port,
  copyLabel,
  copiedLabel,
}: {
  ip: string
  port: number | null
  copyLabel: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)
  const address = port && port !== 24454 ? `${ip}:${port}` : ip

  async function handleCopy() {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 gap-1 text-xs"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="size-3" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="size-3" />
          {copyLabel}
        </>
      )}
    </Button>
  )
}
