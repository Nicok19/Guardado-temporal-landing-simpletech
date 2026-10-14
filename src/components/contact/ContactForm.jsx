import TextField from '@/components/forms/TextField';
import ChipToggle from '@/components/forms/ChipToggle';
import { useForm } from '@/hooks/useForm';
import { useAsync } from '@/hooks/useAsync';
import { getContactInterests, submitContactRequest } from '@/services/contactService';
import { CONTACT_INTERESTS } from '@/data/contact';
import { FONT_MONO } from '@/styles/tokens';
import { CONTACT_INITIAL_VALUES, toContactRequest, validateContact } from './contactForm.schema';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: 'clamp(24px,3vw,40px)',
  borderRadius: '28px',
  background: 'rgba(249,246,238,.94)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  boxShadow: '0 50px 120px -40px rgba(0,20,90,.55)',
};

function SuccessMessage({ onReset }) {
  return (
    <div
      role="status"
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '40px 0', alignItems: 'flex-start' }}
    >
      <span
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#00249C',
          color: '#DCD291',
          display: 'grid',
          placeItems: 'center',
          fontSize: '22px',
        }}
      >
        ✓
      </span>
      <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-.02em' }}>Recibimos tu mensaje.</span>
      <span style={{ fontSize: '16px', color: '#636262', lineHeight: 1.5 }}>
        Un especialista te va a contactar a la brevedad.
      </span>
      <button
        type="button"
        onClick={onReset}
        style={{
          font: '500 14px Inter,sans-serif',
          padding: '12px 18px',
          borderRadius: '999px',
          border: '1px solid #DADAE4',
          background: 'transparent',
          color: '#00249C',
          cursor: 'pointer',
        }}
      >
        Enviar otro
      </button>
    </div>
  );
}

export default function ContactForm() {
  // Opciones de "Me interesa": vienen del backend; mientras cargan (o si falla) se usa el fallback local.
  const { data: interests } = useAsync(({ signal }) => getContactInterests({ signal }), [], {
    initialData: CONTACT_INTERESTS,
  });

  const form = useForm({
    initialValues: CONTACT_INITIAL_VALUES,
    validate: validateContact,
    onSubmit: (values) => submitContactRequest(toContactRequest(values, window.location.pathname)),
  });
  const { errors, isSubmitting } = form;

  return (
    <form data-reveal="2" noValidate onSubmit={form.handleSubmit} style={formStyle}>
      {form.isSuccess ? (
        <SuccessMessage onReset={form.reset} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-.02em' }}>Conversemos</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px' }}>
            <TextField
              label="NOMBRE"
              placeholder="Tu nombre"
              autoComplete="name"
              required
              inputProps={form.field('name')}
              error={errors.name}
            />
            <TextField
              label="EMPRESA"
              placeholder="Empresa"
              autoComplete="organization"
              inputProps={form.field('company')}
              error={errors.company}
            />
          </div>
          <TextField
            label="EMAIL"
            type="email"
            placeholder="nombre@empresa.com"
            autoComplete="email"
            required
            inputProps={form.field('email')}
            error={errors.email}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '11px', letterSpacing: '.12em', color: '#636262' }}>
              ME INTERESA
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {interests.map((opt) => (
                <ChipToggle
                  key={opt.id}
                  selected={form.values.interests.includes(opt.id)}
                  onToggle={() => form.toggleInList('interests', opt.id)}
                >
                  {opt.label}
                </ChipToggle>
              ))}
            </div>
          </div>
          <TextField
            label="MENSAJE"
            multiline
            rows={3}
            placeholder="¿Qué te gustaría resolver?"
            inputProps={form.field('message')}
            error={errors.message}
          />
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
          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? undefined : 'hv-bg-ink'}
            style={{
              font: '600 16px Inter,sans-serif',
              padding: '18px',
              borderRadius: '999px',
              border: 'none',
              background: '#00249C',
              color: '#fff',
              cursor: isSubmitting ? 'wait' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all .3s',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            {isSubmitting ? 'Enviando…' : 'Enviar mensaje'} <span style={{ fontFamily: FONT_MONO }}>→</span>
          </button>
        </div>
      )}
    </form>
  );
}
