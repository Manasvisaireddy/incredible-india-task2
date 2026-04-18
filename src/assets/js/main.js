/* ═══════════════════════════════════════════════════════════════
   Incredible India — Task 2  (Nunjucks + Vite)
   main.js  →  bundled by Vite from src/assets/js/main.js
═══════════════════════════════════════════════════════════════ */

/* ── 1. Region Filter ────────────────────────────────────────── */
import 'bootstrap'
const filterPills  = document.querySelectorAll('.filter-pill')
const stateColumns = document.querySelectorAll('.state-card-col')

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    // Update active pill
    filterPills.forEach(p => p.classList.remove('active'))
    pill.classList.add('active')

    const filter = pill.dataset.filter

    stateColumns.forEach(col => {
      const match = filter === 'all' || col.dataset.region === filter
      col.classList.toggle('hidden', !match)
    })
  })
})

/* ── 2. Package Modal — populate state name ──────────────────── */
const packageModal   = document.getElementById('packageModal')
const modalStateName = document.getElementById('modalStateName')
const modalStateBody = document.getElementById('modalStateNameBody')

if (packageModal) {
  packageModal.addEventListener('show.bs.modal', event => {
    const triggerCard = event.relatedTarget
    const stateName   = triggerCard?.dataset?.state || 'this state'

    if (modalStateName) modalStateName.textContent = stateName
    if (modalStateBody) modalStateBody.textContent  = stateName
  })
}

/* ── 3. Navbar — active link highlight on scroll ─────────────── */
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.ii-navbar .nav-link')

const onScroll = () => {
  const scrollY = window.scrollY + 90
  sections.forEach(section => {
    if (
      scrollY >= section.offsetTop &&
      scrollY < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href')?.includes(`#${section.id}`)) {
          link.classList.add('active')
        }
      })
    }
  })
}

window.addEventListener('scroll', onScroll, { passive: true })

/* ── 4. Booking form — min date guard ────────────────────────── */
const startDate = document.getElementById('startDate')
const endDate   = document.getElementById('endDate')

if (startDate && endDate) {
  const today = new Date().toISOString().split('T')[0]
  startDate.min = today
  endDate.min   = today

  startDate.addEventListener('change', () => {
    endDate.min = startDate.value
    if (endDate.value && endDate.value < startDate.value) {
      endDate.value = startDate.value
    }
  })
}

/* ── 5. Smooth-scroll polyfill for anchor links ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})
