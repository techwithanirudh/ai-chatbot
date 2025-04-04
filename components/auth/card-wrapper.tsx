"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

import { BackButton } from "@/components/auth/back-button"
import { Social } from "@/components/auth/social"
import { MagicLinkForm } from "./magic-form"
import { Button } from "@/components/ui/button"

interface CardWrapperProps {
  children: React.ReactNode
  backButtonLabel: string
  backButtonLinkLabel: string
  backButtonHref: string
  showMagicLink?: boolean
  showSocial?: boolean
  showCredentials?: boolean
  className?: string
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonLinkLabel,
  backButtonHref,
  showSocial,
  showMagicLink,
  showCredentials,
  className,
}: CardWrapperProps) => {
  const [authMode, setAuthMode] = useState<"magic" | "credentials">("magic")
  const toggleAuthMode = () => {
    setAuthMode(authMode === "magic" ? "credentials" : "magic")
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="grid gap-4">
        {showMagicLink && authMode === "magic" && (
          <MagicLinkForm />
        )}

        {showCredentials && authMode === "credentials" && (children)}

        {showCredentials && showMagicLink && (
          <Button
            size="icon"
            className="flex w-full flex-row items-center justify-center gap-2 h-auto hover:no-underline hover:text-muted-foreground"
            variant="link"
            onClick={toggleAuthMode}
          >
            {authMode === "magic" ? "Sign in with password" : "Sign in with magic link"}
          </Button>
        )}
      </div>

      {showSocial && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Social />
        </>
      )}

      <BackButton label={backButtonLabel} linkLabel={backButtonLinkLabel} href={backButtonHref} />
    </div>
  )
}
