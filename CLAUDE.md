# AGENTS.md

## Project Overview
This project is a **frontend-first Car Rental platform** built with:

- Next.js (App Router)
- TypeScript
- CSS Modules
- React Hooks
- Zustand
- Axios
- react-icons
- framer-motion
- react-hook-form
- react-hot-toast
- react-datepicker
- leaflet
- react-leaflet
- @types/leaflet

The current phase is **frontend and UI only**.

Do not implement:
- backend
- database
- authentication
- payment gateway
- API routes
- server actions for business logic
- admin backend

Use:
- local mock data
- frontend state
- simulated async helpers where needed

The codebase must be easy to connect to a real backend later.

---

## Main Goal
Build a polished, scalable, bilingual car rental frontend with:

- Arabic and English support
- RTL and LTR support
- Dark mode and Light mode
- Responsive UI
- Distance-based pricing UI
- Smooth booking flow
- Reusable components
- Clean architecture

---

## Product Scope
Users should be able to:

- browse cars
- filter and sort available cars
- select a car
- choose pickup and destination
- view estimated distance
- view dynamically updated total price
- complete booking flow in the UI only
- submit forms with simulated success states

No real booking persistence is required in this phase.

---

## Pricing Logic
Each car includes `pricePerKm`.

Always calculate:

`totalPrice = distanceInKm * pricePerKm`

Critical rule:
- price must update instantly whenever selected car changes
- price must update instantly whenever pickup changes
- price must update instantly whenever destination changes
- never leave stale values in UI
- derived booking values must remain synchronized

Keep calculation logic centralized and easy to replace later with a real API/backend.

---

## Architecture Rules
Use **Next.js App Router** with scalable structure.

Prefer:
- Server Components by default
- Client Components only when interactivity is required

Use Client Components for:
- Zustand-connected UI
- map components
- forms
- language switcher
- theme toggle
- filtering/sorting interactions
- animated UI interactions

Keep components modular and reusable.

Suggested structure:

```txt
src/
  app/
    [locale]/
      page.tsx
      cars/page.tsx
      booking/page.tsx
      checkout/page.tsx
      add-car/page.tsx
      about/page.tsx
      contact/page.tsx
      layout.tsx
  components/
    layout/
    ui/
    booking/
    cars/
    forms/
    map/
  store/
    bookingStore.ts
  lib/
    utils.ts
    i18n.ts
    theme.ts
    mockDistance.ts
    mockLocations.ts
  data/
    cars.ts
  messages/
    en.json
    ar.json
  types/
    index.ts
  styles/
    globals.css
```

---

## UI Priorities
Prioritize in this order:

1. UI quality
2. UX clarity
3. Responsive behavior
4. Clean component structure
5. Reusability
6. Accessibility
7. Performance
8. Easy backend integration later

Do not over-engineer data flows at this stage.

---

## Design Guidelines
The app should feel:

- modern
- clean
- premium
- automotive-oriented
- mobile-first
- uncluttered

Rules:
- maximum 4 main colors
- strong visual hierarchy
- clear CTA buttons
- subtle shadows
- consistent spacing
- elegant cards and sections
- polished dark/light themes
- no excessive gradients
- no flashy UI
- no heavy animations

---

## Internationalization
Support:

- English (`en`)
- Arabic (`ar`)

Requirements:
- use locale-based routing in App Router
- provide translation files
- add language switcher in navbar
- support RTL in Arabic
- support LTR in English
- adapt layout, spacing, icons, and alignment properly
- keep both language versions polished, natural, and production-ready

---

## Theme Rules
Support both:

- Light Mode
- Dark Mode

Requirements:
- theme toggle in navbar
- use shared theme tokens
- ensure contrast is good in both themes
- all sections/components must work visually in both modes
- avoid broken borders, unreadable text, or weak dark styling

---

## Pages Required
Build these pages:

- Home
- Cars
- Booking
- Checkout
- Add Your Car
- About
- Contact

### Home
Include:
- hero section
- booking widget
- featured cars
- why choose us
- add your car CTA
- trust/value section

### Cars
Include:
- responsive grid
- car cards
- filter bar
- sort dropdown
- loading state
- empty state

### Booking
Include:
- selected car summary
- pickup input
- destination input
- map preview
- distance display
- total price display
- loading state
- invalid location handling
- confirm CTA

### Checkout
Include:
- booking summary
- user form
- validation
- success toast
- no real backend submission

### Add Your Car
Include:
- grouped form UI
- upload UI only
- simulated success
- no backend upload

### About
Include:
- company story
- mission
- how it works
- value proposition

### Contact
Include:
- contact form
- info cards
- map section
- validation and feedback

---

## Reusable Components
Create reusable components for:

- Navbar
- Footer
- ThemeToggle
- LanguageSwitcher
- Hero
- BookingWidget
- CarCard
- FilterBar
- SortDropdown
- PriceSummary
- BookingSummary
- MapInput
- MapPreview
- FormInput
- FormSelect
- DateInput
- EmptyState
- ErrorState
- LoadingSkeleton
- SectionHeader
- CTASection

Do not duplicate UI logic when a shared component is more appropriate.

---

## State Management
Use Zustand for frontend booking state.

Store:
- selectedCar
- pickupLocation
- destinationLocation
- pickupCoordinates
- destinationCoordinates
- distanceInKm
- totalPrice
- bookingStep
- isCalculating
- calculationError

Rules:
- use granular selectors
- minimize unnecessary re-renders
- centralize derived state logic
- keep state predictable
- maintain consistent booking flow across pages

---

## Forms
Use react-hook-form for:
- checkout form
- add car form
- contact form

Requirements:
- proper labels
- inline validation messages
- accessible field states
- keyboard-friendly flow
- clean spacing
- professional error/success UX

---

## Maps
Use:
- leaflet
- react-leaflet

Rules:
- all map components must be client-only
- avoid SSR issues in Next.js App Router
- use frontend-only mock abstractions for now if needed
- show realistic UI states
- support markers and route preview when possible
- handle loading, no results, and invalid states gracefully

Do not build a real production backend map service in this phase.

---

## Motion
Use framer-motion only for subtle UI motion:
- card hover
- page entrance
- button feedback
- small menu transitions
- soft section reveal

Avoid:
- heavy parallax
- distracting motion
- slow animations
- unnecessary transitions

Motion should improve polish, not distract from usability.

---

## Accessibility
Always follow:
- semantic HTML
- visible focus states
- keyboard navigation
- proper labels
- accessible buttons
- strong color contrast
- RTL/LTR semantic correctness
- mobile-friendly tap targets

---

## Performance
Optimize for:
- reusable components
- minimal unnecessary client components
- efficient Zustand subscriptions
- optimized filtering/sorting
- lazy loading map-heavy parts when helpful
- good perceived performance with loading skeletons/states

---

## Code Style
Requirements:
- use TypeScript types/interfaces
- avoid duplicated logic
- keep components focused
- use meaningful naming
- keep files organized
- write production-style code, not demo shortcuts
- keep business logic centralized
- make future backend integration straightforward

---

## Mocking Rules
During this phase:
- use local mock data for cars
- use simulated async helpers for distance/location logic if needed
- simulate booking success
- simulate add-car success
- simulate contact form success

Do not introduce fake backend complexity.

---

## What Not To Do
Do not:
- add backend code
- add authentication
- add database setup
- add payment flow
- add admin dashboard unless explicitly requested
- add unnecessary libraries
- overcomplicate architecture
- break RTL
- break theme consistency
- mix business logic across many unrelated components

---

## Definition of Done
A task is considered done when:
- UI is polished
- component structure is clean
- responsive behavior works
- Arabic and English both work correctly
- RTL and LTR both work correctly
- dark and light themes both work correctly
- booking flow feels complete in the frontend
- total price updates correctly in the UI
- forms validate properly
- mock interactions feel realistic
- code is ready for backend integration later