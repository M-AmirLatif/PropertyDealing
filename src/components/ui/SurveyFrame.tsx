import { useState, type ReactNode, type CSSProperties } from 'react';

export type SurveyMarkColor = 'brass' | 'brass-dark' | 'muted';

interface SurveyFrameProps {
  children: ReactNode;
  caption?: string;
  aspectRatio?: string;
  markColor?: SurveyMarkColor;
  className?: string;
  style?: CSSProperties;
}

export function SurveyFrame({
  children,
  caption,
  aspectRatio = '16/10',
  markColor = 'brass',
  className = '',
  style,
}: SurveyFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Resolved corner mark color
  const strokeColor = {
    brass: 'var(--brass-500)',
    'brass-dark': 'var(--brass-500)',
    muted: 'var(--line-strong)',
  }[markColor];

  // Hover displacement: default is 0, on hover marks tighten inward by 4px
  const shift = isHovered ? 4 : 0;

  return (
    <div
      className={`survey-frame ${className}`.trim()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '10px', // Ensures 8px marks stay well within bounding box (never causing overflow)
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      }}
    >
      {/* Outer framing wrapper containing corner survey brackets */}
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Top-Left Bracket */}
        <svg
          className="survey-frame-bracket survey-frame-bracket-tl"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-7px',
            left: '-7px',
            transform: `translate(${shift}px, ${shift}px)`,
            transition: 'transform var(--duration-normal) var(--ease-out)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <path d="M14 1.5H1.5V14" stroke={strokeColor} strokeWidth="1.5" />
        </svg>

        {/* Top-Right Bracket */}
        <svg
          className="survey-frame-bracket survey-frame-bracket-tr"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-7px',
            right: '-7px',
            transform: `translate(-${shift}px, ${shift}px)`,
            transition: 'transform var(--duration-normal) var(--ease-out)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <path d="M0 1.5H12.5V14" stroke={strokeColor} strokeWidth="1.5" />
        </svg>

        {/* Bottom-Left Bracket */}
        <svg
          className="survey-frame-bracket survey-frame-bracket-bl"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-7px',
            left: '-7px',
            transform: `translate(${shift}px, -${shift}px)`,
            transition: 'transform var(--duration-normal) var(--ease-out)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <path d="M14 12.5H1.5V0" stroke={strokeColor} strokeWidth="1.5" />
        </svg>

        {/* Bottom-Right Bracket */}
        <svg
          className="survey-frame-bracket survey-frame-bracket-br"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-7px',
            right: '-7px',
            transform: `translate(-${shift}px, -${shift}px)`,
            transition: 'transform var(--duration-normal) var(--ease-out)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <path d="M0 12.5H12.5V0" stroke={strokeColor} strokeWidth="1.5" />
        </svg>

        {/* Inner Content Slot / Image Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio,
            overflow: 'hidden',
            backgroundColor: 'var(--ivory-200)',
            border: '1px solid var(--border)',
          }}
        >
          {children}
        </div>
      </div>

      {/* Monospaced Survey Caption Slot */}
      {caption && (
        <div
          className="survey-frame-caption"
          style={{
            marginTop: 'var(--space-2)',
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-label)',
            letterSpacing: 'var(--tracking-mono)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            lineHeight: 1.35,
            paddingInline: '2px',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
}
