import ProductChip from '@/components/common/ProductChip';
import SmartLink from '@/components/common/SmartLink';
import CoverImage from '@/components/common/CoverImage';
import CaseLogo from '@/components/common/CaseLogo';
import { FONT_MONO } from '@/styles/tokens';

/** Tarjeta de caso de éxito. `c` viene de toCaseView() (data/cases.js). */
export default function CaseCard({ c }) {
  return (
    <SmartLink
      className="hv-lift-6 hv-bd-gold hv-c-cream"
      href={c.href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(8,14,44,.8)',
        border: '1px solid rgba(178,220,255,.14)',
        transition: 'transform .45s cubic-bezier(.2,.8,.2,1),border-color .45s',
      }}
    >
      <div style={{ position: 'relative', height: '230px', overflow: 'hidden', background: '#0b1233' }}>
        <CoverImage
          sizes="(max-width: 768px) 100vw, 400px"
          placeholder={c.photoPh}
          src={c.photo}
          position={c.photoPosition}
          style={{ position: 'absolute', inset: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(135deg,rgba(0,36,156,.55),rgba(4,8,28,.15) 60%)',
            mixBlendMode: 'multiply',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(180deg,rgba(4,8,28,.65),transparent 45%)',
          }}
        ></div>
        <div style={{ position: 'absolute', left: '22px', top: '18px', pointerEvents: 'none' }}>
          <CaseLogo item={c} fallbackSize="24px" maxWidth="180px" />
        </div>
        <span
          style={{
            position: 'absolute',
            right: '18px',
            top: '20px',
            pointerEvents: 'none',
            fontFamily: FONT_MONO,
            fontSize: '10.5px',
            letterSpacing: '.14em',
            padding: '6px 10px',
            borderRadius: '999px',
            background: 'rgba(4,8,28,.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#DCD291',
          }}
        >
          {c.ind} · {c.country}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '24px', flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px',
            paddingLeft: '14px',
            borderLeft: '2px solid #DCD291',
          }}
        >
          <span style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>{c.kpi}</span>
          <span style={{ fontSize: '13px', color: '#DADAE4' }}>{c.kpiL}</span>
        </div>
        <span style={{ fontSize: '15px', lineHeight: 1.55, color: '#DADAE4' }}>{c.summary}</span>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {c.prods.map((p) => (
              <ProductChip key={p.name} {...p} />
            ))}
          </div>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              color: '#DCD291',
              whiteSpace: 'nowrap',
            }}
          >
            Ver caso →
          </span>
        </div>
      </div>
    </SmartLink>
  );
}
