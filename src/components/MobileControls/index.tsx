import React, { FC } from 'react'
import { CONTROLS } from '~constants'
import { EKeys } from '~types'
import { Styled } from './styled'

type TControlsProps = {
  onClick: (key: EKeys) => void
}

export const MobileControls: FC<TControlsProps> = ({ onClick }) => (
    <Styled.Controls>
      {Object.entries(CONTROLS).map(([ key, value ]) => (
        <Styled.Button key={key} onClick={() => onClick(EKeys[key as keyof typeof EKeys])}>{value}</Styled.Button>
      ))}
    </Styled.Controls>
)
