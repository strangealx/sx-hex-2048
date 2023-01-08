import React, { FC, useState, useEffect } from 'react'
import { Styled } from './styled'

type TNotificationProps = {
  title: string
  message?: string
  buttonText?: string
  disabled?: boolean
  delay?: number
  onContinue?: () => void
}

export const Notification: FC<TNotificationProps> = ({
  title,
  message,
  disabled,
  delay,
  onContinue,
  buttonText = 'Continue'
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Styled.Notification isVisible={isVisible} delay={delay}>
      <Styled.Title>{title}</Styled.Title>
      {message && <Styled.Message>{message}</Styled.Message>}
      {onContinue && (
        <Styled.Button
          disabled={disabled}
          onClick={onContinue}
        >
          {buttonText}
        </Styled.Button>
      )}
    </Styled.Notification>
  )
}
