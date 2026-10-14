import TextField from '@/components/forms/TextField';
import ChipToggle from '@/components/forms/ChipToggle';
import { useForm } from '@/hooks/useForm';
import { getLang } from '@/i18n';
import { subscribeNewsletter } from '@/services/newsletterService';
import { isBlank, isEmail } from '@/utils/validators';
import { FONT_MONO } from '@/styles/tokens';

// Suscripción al newsletter, debajo del blog. Misma familia que el formulario de contacto (texto a la izquierda,
// tarjeta crema con el formulario a la derecha, mismos campos, chips y botón), pero en negativo: fondo azul noche
// con texto claro, para que no se confunda con "Conversemos". Isla.
const CREAM = '#F9F6EE';
const BLUE = '#00249C';
const GOLD = '#DCD291';

// Temas para elegir qué novedades recibir (opcional). `id` = lo que se envía al backend.
export const NEWSLETTER_TOPICS = [
  { id: 'ia', label: 'IA y automatización' },
  { id: 'whatsapp', label: 'WhatsApp y mensajería' },
  { id: 'telefonia', label: 'Telefonía y contact center' },
  { id: 'producto', label: 'Novedades de producto' },
  { id: 'eventos', label: 'Eventos y webinars' },
];
const BENEFITS = ['Los nuevos artículos del blog', 'Lanzamientos y novedades de producto', 'Webinars y eventos'];

const INITIAL = { email: '', name: '', topics: [], consent: '' };

function validate(v) {
  const errors = {};
  if (isBlank(v.email)) errors.email = 'Ingresá tu email.';
  else if (!isEmail(v.email)) errors.email = 'Revisá el formato del email.';
  if (!v.consent) errors.consent = 'Necesitamos tu aceptación para enviarte el newsletter.';
  return errors;
}

// Misma tarjeta que el formulario de contacto (components/contact/ContactForm.jsx).
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: 'clamp(24px,3vw,40px)',
  borderRadius: '28px',
  background: 'rgba(249,246,238,.96)',
  color: BLUE,
  boxShadow: '0 50px 120px -40px rgba(0,0,0,.6)',
};

export default function NewsletterSection() {
  const form = useForm({
    initialValues: INITIAL,
    validate,
    onSubmit: (v) =>
      subscribeNewsletter({
        email: v.email.trim(),
        name: v.name.trim(),
        topics: v.topics,
        lang: getLang(),
        source: window.location.pathname,
      }),
  });
  const { values, errors, isSubmitting } = form;
  const complete = Object.keys(validate(values)).length === 0;
  const blocked = isSubmitting || !complete;

  return (
    <section
      id="newsletter"
      className="bg-night"
      style={{
        position: 'relative',
        color: CREAM,
        padding: 'clamp(96px,12vw,160px) var(--page-x)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: '56px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <span
            data-reveal="1"
            style={{ fontFamily: FONT_MONO, fontSize: '12px', letterSpacing: '.24em', color: GOLD }}
          >
            NEWSLETTER
          </span>
          <h2
            data-reveal="2"
            style={{
              margin: 0,
              fontSize: 'clamp(44px,4.4vw,64px)',
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: '-.045em',
              textWrap: 'balance',
            }}
          >
            Enterate de todas las novedades<span style={{ color: GOLD }}>.</span>
          </h2>
          <p
            data-reveal="3"
            style={{
              margin: 0,
              fontSize: '18px',
              lineHeight: 1.55,
              maxWidth: '440px',
              color: '#DADAE4',
              textWrap: 'pretty',
            }}
          >
            Recibí en tu correo lo nuevo de Simpletech y las tendencias de experiencia del cliente. Sin spam: podés
            darte de baja cuando quieras.
          </p>
          <ul
            data-reveal="3"
            style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {BENEFITS.map((b) => (
              <li key={b} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '16px' }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: GOLD,
                    color: BLUE,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '13px',
                    fontWeight: 800,
                    flex: 'none',
                  }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="2">
          {form.isSuccess ? (
            <div
              role="status"
              style={{ ...cardStyle, padding: '48px clamp(24px,3vw,40px)', alignItems: 'flex-start', gap: '16px' }}
            >
              <span
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: BLUE,
                  color: GOLD,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '22px',
                }}
              >
                ✓
              </span>
              <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-.02em' }}>¡Ya estás suscripto!</span>
              <span style={{ fontSize: '16px', color: '#636262', lineHeight: 1.5 }}>
                Te vamos a escribir con las próximas novedades.
              </span>
              <button
                type="button"
                onClick={form.reset}
                style={{
                  font: '500 14px Inter,sans-serif',
                  padding: '12px 18px',
                  borderRadius: '999px',
                  border: '1px solid #DADAE4',
                  background: 'transparent',
                  color: BLUE,
                  cursor: 'pointer',
                }}
              >
                Suscribir otro email
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={form.handleSubmit} style={cardStyle}>
              <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-.02em' }}>Suscribite</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <TextField
                  label="EMAIL"
                  type="email"
                  placeholder="nombre@empresa.com"
                  autoComplete="email"
                  required
                  inputProps={form.field('email')}
                  error={errors.email}
                />
                <TextField
                  label="NOMBRE (OPCIONAL)"
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                  inputProps={form.field('name')}
                />
              </div>
              <div
                role="group"
                aria-labelledby="nl-topics"
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <span
                  id="nl-topics"
                  style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.12em', color: '#636262' }}
                >
                  TEMAS QUE TE INTERESAN (OPCIONAL)
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {NEWSLETTER_TOPICS.map((t) => (
                    <ChipToggle
                      key={t.id}
                      selected={values.topics.includes(t.id)}
                      onToggle={() => form.toggleInList('topics', t.id)}
                    >
                      {t.label}
                    </ChipToggle>
                  ))}
                </div>
              </div>
              <label
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                  fontSize: '14px',
                  lineHeight: 1.45,
                  color: '#636262',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(values.consent)}
                  onChange={(e) => form.setValue('consent', e.target.checked ? 'yes' : '')}
                  style={{
                    width: '18px',
                    height: '18px',
                    marginTop: '1px',
                    accentColor: BLUE,
                    flex: 'none',
                    cursor: 'pointer',
                  }}
                />
                <span>
                  Acepto recibir el newsletter de Simpletech y sé que puedo darme de baja en cualquier momento.
                  <span aria-hidden="true"> *</span>
                </span>
              </label>
              {form.submitError && (
                <div
                  role="alert"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: 'rgba(234,84,85,.1)',
                    color: '#c62f30',
                    fontSize: '14px',
                    lineHeight: 1.4,
                  }}
                >
                  {form.submitError}
                </div>
              )}
              {/* Mismo botón que el formulario de contacto */}
              <button
                type="submit"
                disabled={blocked}
                aria-describedby={complete ? undefined : 'nl-required-hint'}
                className={blocked ? undefined : 'hv-bg-ink'}
                style={{
                  font: '600 16px Inter,sans-serif',
                  padding: '18px',
                  borderRadius: '999px',
                  border: 'none',
                  background: BLUE,
                  color: '#fff',
                  cursor: isSubmitting ? 'wait' : complete ? 'pointer' : 'not-allowed',
                  opacity: isSubmitting ? 0.7 : complete ? 1 : 0.4,
                  transition: 'all .3s',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                {isSubmitting ? 'Suscribiendo…' : 'Suscribirme'} <span style={{ fontFamily: FONT_MONO }}>→</span>
              </button>
              {!complete && (
                <span id="nl-required-hint" style={{ fontSize: '13px', color: '#636262', textAlign: 'center' }}>
                  Completá tu email y aceptá recibir el newsletter.
                </span>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
