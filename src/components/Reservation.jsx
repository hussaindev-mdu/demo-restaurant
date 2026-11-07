import { useEffect, useRef, useState } from 'react'
import { CalendarCheck, CheckCircle2, Info } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import { TIME_SLOTS, formatTime } from '../data/content.js'

const EMPTY = { name: '', phone: '', date: '', time: '', guests: '', requests: '' }
const MAX_REQUEST = 300

const pad = (n) => String(n).padStart(2, '0')
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

function validate(v) {
  const errors = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).'

  const digits = v.phone.replace(/[\s\-()]/g, '').replace(/^(\+?91|0)/, '')
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Enter a valid 10-digit Indian mobile number.'

  const today = toISO(new Date())
  if (!v.date) errors.date = 'Please choose a date.'
  else if (v.date < today) errors.date = 'Please choose today or a future date.'

  if (!v.time) errors.time = 'Please choose a time.'
  if (!v.guests) errors.guests = 'Please select the number of guests.'
  if (v.requests.length > MAX_REQUEST) errors.requests = `Please keep this under ${MAX_REQUEST} characters.`
  return errors
}

function Field({ id, label, error, hint, required = true, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
        {label}
        {required ? <span className="text-spice" aria-hidden="true"> *</span> : <span className="font-normal text-charcoal-500"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-charcoal-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-spice">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Reservation({ prefill }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const formRef = useRef(null)
  const successRef = useRef(null)
  const todayISO = toISO(new Date())
  const maxISO = toISO(new Date(Date.now() + 1000 * 60 * 60 * 24 * 90))

  // Pre-fill special requests when a visitor clicks "Enquire" on an offer
  useEffect(() => {
    if (prefill?.text) {
      setValues((v) => ({ ...v, requests: prefill.text }))
      setSubmitted(null)
    }
  }, [prefill])

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const set = (key) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const a11y = (id) => ({
    id,
    'aria-invalid': errors[id] ? 'true' : undefined,
    'aria-describedby': errors[id] ? `${id}-error` : `${id}-hint`,
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector(`#${first}`)?.focus()
      return
    }
    // DEMO ONLY: nothing is sent anywhere and no booking is created.
    setSubmitted({ ...values })
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(null)
  }

  return (
    <section id="reservation" aria-labelledby="reservation-title" className="section-y bg-cream-100">
      <div className="container-x grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading
            id="reservation-title"
            align="left"
            eyebrow="Reservations"
            title="Reserve your table"
            intro="Tell us when you’d like to dine and we’ll be delighted to host you. This is a demo enquiry form."
          />
          <Reveal delay={120} className="mt-8 flex gap-3 rounded-2xl border border-gold-500/40 bg-gold-400/10 p-5 text-sm leading-relaxed text-charcoal-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
            <p>
              <strong className="font-semibold">Demo only.</strong> Submitting this form validates your details and
              shows a confirmation on screen. Nothing is sent or stored and no real booking is made.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-3">
          <div className="rounded-[2rem] bg-white p-6 shadow-lift sm:p-10">
            {submitted ? (
              <div ref={successRef} tabIndex={-1} role="status" className="text-center outline-none">
                <CheckCircle2 className="mx-auto h-14 w-14 text-gold-500" strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mt-5 text-3xl font-semibold">Thank you, {submitted.name.trim().split(' ')[0]}</h3>
                <p className="mx-auto mt-3 max-w-md text-charcoal-600">
                  Your enquiry has been validated. <strong>This is a demo: no reservation has been made</strong> and
                  no message was sent to the restaurant.
                </p>
                <dl className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 rounded-2xl bg-cream-100 p-5 text-left text-sm">
                  <dt className="text-charcoal-500">Date</dt>
                  <dd className="font-medium">{new Date(`${submitted.date}T00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</dd>
                  <dt className="text-charcoal-500">Time</dt>
                  <dd className="font-medium">{formatTime(submitted.time)}</dd>
                  <dt className="text-charcoal-500">Guests</dt>
                  <dd className="font-medium">{submitted.guests}</dd>
                  <dt className="text-charcoal-500">Phone</dt>
                  <dd className="font-medium">{submitted.phone}</dd>
                </dl>
                <Button variant="dark" onClick={reset} className="mt-8">
                  Make another enquiry
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Reservation enquiry form" className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Field id="name" label="Full name" error={errors.name}>
                    <input {...a11y('name')} className="field" type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={set('name')} />
                  </Field>
                </div>
                <div className="sm:col-span-1">
                  <Field id="phone" label="Phone number" error={errors.phone} hint="10-digit mobile, e.g. 98765 43210">
                    <input {...a11y('phone')} className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={values.phone} onChange={set('phone')} />
                  </Field>
                </div>
                <Field id="date" label="Date" error={errors.date}>
                  <input {...a11y('date')} className="field" type="date" min={todayISO} max={maxISO} value={values.date} onChange={set('date')} />
                </Field>
                <Field id="time" label="Time" error={errors.time}>
                  <select {...a11y('time')} className="field" value={values.time} onChange={set('time')}>
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{formatTime(t)}</option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field id="guests" label="Number of guests" error={errors.guests}>
                    <select {...a11y('guests')} className="field" value={values.guests} onChange={set('guests')}>
                      <option value="">Select guests</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="requests" label="Special requests" required={false} error={errors.requests} hint={`${values.requests.length}/${MAX_REQUEST} · Allergies, celebrations, seating preferences…`}>
                    <textarea {...a11y('requests')} className="field resize-y" rows={4} placeholder="Anything we should know?" value={values.requests} onChange={set('requests')} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" variant="gold" className="w-full sm:w-auto">
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Send Enquiry
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
