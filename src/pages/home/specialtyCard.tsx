import React from 'react'
import type { IconType } from 'react-icons'
import * as S from './style'

interface SpecialtyCardProps {
  icon: IconType // Tipagem do React Icons
  title: string
  onClick: () => void
}

export const SpecialtyCard: React.FC<SpecialtyCardProps> = ({
  icon: Icon,
  title,
  onClick,
}) => (
  <S.CardButton onClick={onClick}>
    <div className="icon-wrapper">
      <Icon size={24} />
    </div>
    <span className="label">{title}</span>
  </S.CardButton>
)
