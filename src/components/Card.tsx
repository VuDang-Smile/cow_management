import { ReactNode } from 'react'

type Props = {
  title?: string
  rightSlot?: ReactNode
  children: ReactNode
  className?: string
}

export default function Card({ title, rightSlot, children, className }: Props) {
  return (
    <div className={`card ${className ?? ''}`.trim()}>
      {(title || rightSlot) && (
        <div className="row" style={{ marginBottom: 8 }}>
          {title && <div className="section-title">{title}</div>}
          {rightSlot && <div className="right">{rightSlot}</div>}
        </div>
      )}
      {children}
    </div>
  )}


