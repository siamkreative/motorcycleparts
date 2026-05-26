import { useState, useEffect, useRef } from 'react'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'
import { ShaderAnimation } from '@/components/ui/shader-animation'

interface PartFields {
  Type: string
  'Brand / Model'?: string
  'Purchased from'?: string
  'Purchase Date'?: string
  Cost?: number
}

interface Part {
  id: string
  fields: PartFields
  checked: boolean
}

const formatCurrency = (value: number) =>
  value.toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })

export default function App() {
  const [records, setRecords] = useState<Part[]>([])
  const [loading, setLoading] = useState(true)
  const [allChecked, setAllChecked] = useState(false)
  const filmstripRef = useRef<HTMLElement>(null)
  const partsRef = useRef<HTMLDivElement>(null)
  const [filmstripInView, setFilmstripInView] = useState(false)
  const [partsInView, setPartsInView] = useState(false)

  const total = records.reduce((sum, r) => sum + (r.fields.Cost || 0), 0)
  const totalText = loading ? '—' : formatCurrency(total)

  useEffect(() => {
    const targets: [React.RefObject<Element | null>, (v: boolean) => void][] = [
      [filmstripRef, setFilmstripInView],
      [partsRef, setPartsInView],
    ]
    const observers = targets.map(([ref, setState]) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setState(true); obs.disconnect() } },
        { threshold: 0.1 }
      )
      if (ref.current) obs.observe(ref.current)
      return obs
    })
    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  useEffect(() => {
    fetch('/.netlify/functions/get-airtable-data')
      .then(r => r.json())
      .then(data => {
        setRecords(data.records.map((r: Omit<Part, 'checked'>) => ({ ...r, checked: false })))
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    GLightbox({ selector: '.glightbox' })
  }, [])

  const toggleAll = (checked: boolean) => {
    setAllChecked(checked)
    setRecords(prev => prev.map(r => ({ ...r, checked })))
  }

  const toggleOne = (id: string) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, checked: !r.checked } : r))
  }

  return (
    <div className="bg-black text-white min-h-screen antialiased">

      {/* Hero */}
      <div className="relative h-screen">
        <ShaderAnimation />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-6">2017 · Thailand</p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white text-center leading-none">
            Yamaha MT-07
          </h1>
          <p className="mt-5 text-base text-white/50 tracking-widest uppercase">
            Aftermarket Customizations
          </p>
        </div>
        <button
          onClick={() => filmstripRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-current to-transparent animate-bounce" />
        </button>
      </div>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 py-3 flex justify-center gap-1">
          <a className="text-white/80 hover:text-white px-3 py-2 text-sm rounded hover:bg-white/5 transition-colors" href="/">Home</a>
          <a className="text-white/40 hover:text-white/70 px-3 py-2 text-sm rounded hover:bg-white/5 transition-colors" href="https://github.com/SiamKreative/motorcycleparts">Github</a>
          <a className="text-white/40 hover:text-white/70 px-3 py-2 text-sm rounded hover:bg-white/5 transition-colors" href="https://twitter.com/siamkreative">Message me</a>
        </div>
      </nav>

      {/* Full-bleed filmstrip */}
      <section
        ref={filmstripRef}
        className={`transition-[opacity,transform] duration-700 ease-out ${filmstripInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="grid grid-cols-3 gap-0.5 bg-white/5">
          <a className="glightbox block overflow-hidden group" href="/images/01.jpg" data-description="Bike trip around Khao Yai, Thailand (August 2019)">
            <picture>
              <source srcSet="/images/01.avif" type="image/avif" />
              <source srcSet="/images/01.webp" type="image/webp" />
              <img className="w-full aspect-[4/5] object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-500 ease-out" src="/images/01.jpg" alt="Bike trip around Khao Yai, Thailand" loading="lazy" />
            </picture>
          </a>
          <a className="glightbox block overflow-hidden group" href="/images/02.jpg" data-description="Me racing at Bira Circuit (Pattaya, Thailand)">
            <picture>
              <source srcSet="/images/02.avif" type="image/avif" />
              <source srcSet="/images/02.webp" type="image/webp" />
              <img className="w-full aspect-[4/5] object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-500 ease-out" src="/images/02.jpg" alt="Racing at Bira Circuit, Pattaya" loading="lazy" />
            </picture>
          </a>
          <a className="glightbox block overflow-hidden group" href="/images/03.jpg" data-description="After the shower (Samut Prakan, Thailand)">
            <picture>
              <source srcSet="/images/03.avif" type="image/avif" />
              <source srcSet="/images/03.webp" type="image/webp" />
              <img className="w-full aspect-[4/5] object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-500 ease-out" src="/images/03.jpg" alt="After the shower, Samut Prakan" loading="lazy" />
            </picture>
          </a>
        </div>
        <p className="text-center text-xs text-white/25 py-4 tracking-wide">
          More on <a className="underline underline-offset-4 hover:text-white/50 transition-colors" href="https://www.instagram.com/siamkreative/">instagram</a>
        </p>
      </section>

      <main className="container mx-auto max-w-5xl px-4 py-20">

        {/* Parts table */}
        <div
          ref={partsRef}
          className={`rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8 transition-[opacity,transform] duration-700 ease-out ${partsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Parts List</h2>
            <p className="text-sm text-white/40">
              Everything added to my MT-07 — total:{' '}
              <span className="text-white font-mono">{totalText}</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-3 pr-4 w-8">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={e => toggleAll(e.target.checked)}
                      className="cursor-pointer accent-white"
                      aria-label="Select all parts"
                    />
                  </th>
                  <th className="pb-3 pr-4 font-medium text-white/40 text-xs uppercase tracking-wider">Name</th>
                  <th className="pb-3 pr-4 font-medium text-white/40 text-xs uppercase tracking-wider">From</th>
                  <th className="pb-3 pr-4 font-medium text-white/40 text-xs uppercase tracking-wider">Date</th>
                  <th className="pb-3 font-medium text-white/40 text-xs uppercase tracking-wider text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-white/20 text-sm">Loading…</td>
                  </tr>
                ) : (
                  records.map(record => (
                    <tr
                      key={record.id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-150"
                    >
                      <td className="py-3 pr-4">
                        <input
                          type="checkbox"
                          checked={record.checked}
                          onChange={() => toggleOne(record.id)}
                          className="cursor-pointer accent-white"
                          aria-label={`Select ${record.fields.Type}`}
                        />
                      </td>
                      <td className="py-3 pr-4 text-white/90">
                        {record.fields.Type}
                        {record.fields['Brand / Model'] && (
                          <span className="hidden lg:inline text-white/30 ml-2 text-xs">
                            {record.fields['Brand / Model']}
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-white/40">{record.fields['Purchased from']}</td>
                      <td className="py-3 pr-4 text-white/40">{record.fields['Purchase Date']}</td>
                      <td className="py-3 text-right font-mono text-white/70">
                        {formatCurrency(record.fields.Cost || 0)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-xs text-white/20 text-center">
            Data from <a className="underline underline-offset-4 hover:text-white/40 transition-colors" href="https://airtable.com/shrxx5mmDuAAjnc7J">Airtable</a>
            {' · '}Built with Vite, Tailwind CSS v4, React, Netlify Functions
          </p>
        </div>

      </main>
    </div>
  )
}
