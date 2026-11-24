import { createSignal, createMemo, For, onMount, onCleanup } from 'solid-js'
import { hand } from './hand'
import {
  WHATSAPP, money, palette, types, shapes, lengths, finishes, arts, colours, priceList, looks,
} from './data'

const FINISH_KEYS = ['glossy', 'matte', 'cateye', 'chrome']
const ART_KEYS = ['none', 'french', 'simple', 'full']
const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Gloss Atelier, I’d like to book a set.')}`

export default function App() {
  // the set the customer is building (index into each option list)
  const [pick, setPick] = createSignal({ t: 0, sh: 0, l: 1, f: 0, a: 0, c: 1 })
  const choose = (key, i) => setPick({ ...pick(), [key]: i })

  const preview = createMemo(() => {
    const p = pick()
    return hand(
      {
        shape: shapes[p.sh].toLowerCase(),
        len: lengths[p.l][0].toLowerCase(),
        fin: FINISH_KEYS[p.f],
        art: ART_KEYS[p.a],
        col: colours[p.c][1],
      },
      'b',
    )
  })

  const price = createMemo(() => {
    const p = pick()
    return types[p.t][1] + lengths[p.l][1] + finishes[p.f][1] + arts[p.a][1]
  })

  const summary = createMemo(() => {
    const p = pick()
    return [types[p.t][0], shapes[p.sh], lengths[p.l][0], finishes[p.f][0], arts[p.a][0], colours[p.c][0]].join(' · ')
  })

  const setText = createMemo(() => `${summary()} (est. ${money(price())})`)

  let heroEl
  const today = new Date().toISOString().split('T')[0]

  onMount(() => {
    // hero hand that keeps changing colour
    const vars = [0, 1, 2, 3, 4].map((i) => `var(--c${i})`)
    heroEl.innerHTML = hand({ shape: 'almond', len: 'long', fin: 'glossy', art: 'none', col: vars }, 'h')
    const svg = heroEl.firstChild
    let k = 0
    const cycle = () => {
      for (let i = 0; i < 5; i++) svg.style.setProperty(`--c${i}`, palette[(k + i * 2) % palette.length])
      k++
    }
    cycle()
    const timer = setInterval(cycle, 2600)

    // fade-in on scroll
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1 },
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))

    onCleanup(() => {
      clearInterval(timer)
      io.disconnect()
    })
  })

  function book(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const lines = [
      'New nail booking',
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `Set: ${setText()}`,
      `Date: ${f.get('date')}`,
      `Time: ${f.get('time')}`,
    ]
    if (f.get('notes')) lines.push(`Notes: ${f.get('notes')}`)
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  // one row of option chips in the builder
  const Chips = (props) => (
    <div class="ch">
      <For each={props.items}>
        {(x, i) => (
          <button class="chip" aria-pressed={String(pick()[props.k] === i())} onClick={() => choose(props.k, i())}>
            {Array.isArray(x) ? x[0] : x}
            {props.priced && x[1] ? <small>+{money(x[1])}</small> : null}
          </button>
        )}
      </For>
    </div>
  )

  return (
    <>
      <nav class="pill">
        <a href="#top" class="brand">Gloss <i>Atelier</i></a>
        <ul>
          <li><a href="#build">Build a set</a></li>
          <li><a href="#prices">Prices</a></li>
          <li><a href="#looks">Looks</a></li>
          <li><a href="#visit">Visit</a></li>
        </ul>
        <a href="#book" class="btn" style={{ padding: '10px 22px' }}>Book</a>
      </nav>

      <main id="top">
        <section class="hero">
          <span class="sp" style={{ top: '22%', left: '46%' }}>✦</span>
          <span class="sp" style={{ top: '62%', left: '52%' }}>✦</span>
          <span class="sp" style={{ top: '16%', right: '8%' }}>✦</span>
          <div class="wrap">
            <div>
              <span class="tag">Nail studio · Lagos</span>
              <h1>Tiny canvases. <em>Big attitude.</em></h1>
              <p class="s">Acrylics, Gel-X, builder gel and custom art, built exactly how you picture them. Design your set online and see the price before you book.</p>
              <div class="cta">
                <a href="#build" class="btn">Build my set</a>
                <a href="#prices" class="btn ghost">See prices</a>
              </div>
              <div class="facts">
                <div><b>5 shapes</b><small>almond to stiletto</small></div>
                <div><b>2 hrs</b><small>average full set</small></div>
                <div><b>Custom</b><small>art on request</small></div>
              </div>
            </div>
            <div class="hh" ref={heroEl} />
          </div>
        </section>

        <section id="build">
          <div class="wrap">
            <div class="c">
              <span class="tag rv">Set builder</span>
              <h2 class="rv">Design your <em style={{ 'font-style': 'normal', color: 'var(--pink)' }}>dream set</em></h2>
              <p class="lede rv">Pick a type, shape, length and colour. The preview and estimate update as you go.</p>
            </div>
            <div class="bd rv">
              <div class="pv">
                <div innerHTML={preview()} />
                <p class="sum">{summary()}</p>
                <div class="est"><small>Estimated price</small><span>{money(price())}</span></div>
              </div>
              <div>
                <div class="op"><b>Set type</b><Chips items={types} k="t" /></div>
                <div class="op"><b>Shape</b><Chips items={shapes} k="sh" /></div>
                <div class="op"><b>Length</b><Chips items={lengths} k="l" priced /></div>
                <div class="op"><b>Finish</b><Chips items={finishes} k="f" priced /></div>
                <div class="op"><b>Art</b><Chips items={arts} k="a" priced /></div>
                <div class="op">
                  <b>Colour</b>
                  <div class="sw">
                    <For each={colours}>
                      {(x, i) => (
                        <button
                          aria-pressed={String(pick().c === i())}
                          title={x[0]}
                          aria-label={x[0]}
                          style={{ background: x[1] }}
                          onClick={() => choose('c', i())}
                        />
                      )}
                    </For>
                  </div>
                </div>
                <a href="#book" class="btn">Book this set</a>
              </div>
            </div>
          </div>
        </section>

        <section id="prices" style={{ background: 'color-mix(in srgb,var(--lilac) 12%,var(--bg))' }}>
          <div class="wrap">
            <div class="c">
              <span class="tag rv">The menu</span>
              <h2 class="rv">Price <em style={{ 'font-style': 'normal', color: 'var(--pink)' }}>list</em></h2>
              <p class="lede rv">Starting prices based on typical Lagos nail studios. Final price depends on length and design.</p>
            </div>
            <div class="pg">
              <For each={priceList}>
                {(card) => (
                  <div class="pc rv">
                    <h3>{card[0]}</h3>
                    <For each={card[1]}>
                      {(r) => <div class="pr"><span>{r[0]}</span><span>{r[1]}</span></div>}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
        </section>

        <section id="looks" class="dk">
          <div class="wrap">
            <div class="c">
              <span class="tag rv">Inspo</span>
              <h2 class="rv">Fresh from the <em style={{ 'font-style': 'normal', color: 'var(--butter)' }}>table</em></h2>
            </div>
            <div class="gg">
              <For each={looks}>
                {(g, i) => (
                  <div class="gt rv" style={{ background: g[6] }}>
                    <div
                      style={{ width: '100%', height: '100%' }}
                      innerHTML={hand({ shape: g[1], len: g[2], fin: g[3], art: g[4], col: g[5] }, 'g' + i())}
                    />
                    <span>{g[0]}</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </section>

        <section>
          <div class="wrap">
            <div class="c">
              <span class="tag rv">Good to know</span>
              <h2 class="rv">Before you <em style={{ 'font-style': 'normal', color: 'var(--pink)' }}>come in</em></h2>
            </div>
            <div class="kn rv">
              <div><h3>Time it right</h3><p>Plain sets take about 1.5 to 2 hours. Custom art and long lengths can take 3 hours, so book accordingly.</p></div>
              <div><h3>Soak-off</h3><p>Coming with an old set? Take-out is a separate service, so add about 20 to 40 minutes.</p></div>
              <div><h3>Deposit</h3><p>A small deposit secures your slot and comes off your total. Please arrive on time, or we may need to shorten the design.</p></div>
            </div>
          </div>
        </section>

        <section id="book" class="bk">
          <div class="wrap">
            <div class="rv">
              <span class="tag">Reserve</span>
              <h2>Book your <em style={{ 'font-style': 'normal', color: 'var(--pink)' }}>slot</em></h2>
              <p class="lede">Your set and details go straight to us on WhatsApp, and we’ll confirm your time.</p>
              <div class="setbox"><b>Your set</b><br /><span>{setText()}</span></div>
            </div>
            <form class="rv" onSubmit={book}>
              <div class="full"><label for="n">Your name</label><input id="n" name="name" type="text" required placeholder="Full name" /></div>
              <div class="full"><label for="p">Phone</label><input id="p" name="phone" type="tel" required placeholder="080…" /></div>
              <div><label for="d">Date</label><input id="d" name="date" type="date" min={today} required /></div>
              <div><label for="t">Time</label><input id="t" name="time" type="time" required /></div>
              <div class="full"><label for="x">Notes or inspo</label><input id="x" name="notes" type="text" placeholder="e.g. old set to take off, inspo photo" /></div>
              <div class="full"><button class="btn" type="submit">Send booking on WhatsApp</button></div>
            </form>
          </div>
        </section>

        <section id="visit">
          <div class="wrap">
            <div class="c">
              <span class="tag rv">Find us</span>
              <h2 class="rv">Visit <em style={{ 'font-style': 'normal', color: 'var(--pink)' }}>Gloss Atelier</em></h2>
            </div>
            <div style={{ 'max-width': '620px', margin: '34px auto 0' }} class="rv">
              <div class="row"><span>Address</span><b>22 Adeola Odeku Street, Victoria Island</b></div>
              <div class="row"><span>Mon – Sat</span><b>9am – 8pm</b></div>
              <div class="row"><span>Sunday</span><b>12pm – 6pm</b></div>
              <div class="row"><span>Phone</span><b>+234 800 000 0000</b></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div class="wrap">
          <span>© {new Date().getFullYear()} Gloss Atelier Nail Studio.</span>
          <span>Lagos, Nigeria · @glossatelier</span>
        </div>
      </footer>

      <a class="cc" href={waLink} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <i /><span>Concierge</span>
      </a>
    </>
  )
}
