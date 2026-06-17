'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

const KORE_COLORS = {
  navy: { hex: '#0A1628', name: 'Navy (Primary)', description: 'Deep, sophisticated foundation' },
  orange: {
    hex: '#E8622A',
    name: 'Burnt Orange (Accent)',
    description: 'Energetic, warm accent',
  },
  cream: { hex: '#FAF7F2', name: 'Cream (Background)', description: 'Warm, inviting neutral' },
  gray1: { hex: '#E8E8E8', name: 'Light Gray', description: 'Subtle dividers' },
  gray2: { hex: '#999999', name: 'Medium Gray', description: 'Secondary text' },
}

const TYPOGRAPHY = [
  {
    level: 'h1',
    label: 'Heading 1',
    className: 'font-serif text-5xl font-bold tracking-tight',
    text: 'Kore Coffee',
  },
  {
    level: 'h2',
    label: 'Heading 2',
    className: 'font-serif text-4xl font-bold tracking-tight',
    text: 'Premium Seoul Blend',
  },
  {
    level: 'h3',
    label: 'Heading 3',
    className: 'font-serif text-3xl font-semibold',
    text: 'Artisan Roasted',
  },
  {
    level: 'body',
    label: 'Body Text',
    className: 'font-sans text-base leading-relaxed',
    text: 'Experience the perfect fusion of Korean heritage and Manhattan sophistication in every cup.',
  },
  {
    level: 'caption',
    label: 'Caption',
    className: 'font-sans text-sm text-gray-600 uppercase tracking-wide',
    text: 'Established 2024',
  },
]

function ColorSwatch({
  hex,
  name,
  description,
}: {
  hex: string
  name: string
  description: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-32 w-full rounded-lg border border-border shadow-sm transition-transform hover:scale-105"
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-md p-2 hover:bg-muted transition-colors"
          title={hex}
        >
          {copied ? (
            <Check className="h-4 w-4 text-accent" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <code className="block rounded bg-muted px-3 py-2 font-mono text-xs text-foreground">
        {hex}
      </code>
    </div>
  )
}

function SampleButton() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-serif text-2xl font-semibold text-foreground">Button Styles</h3>

      {/* Primary Button */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Primary Button</p>
        <button className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:scale-105 active:scale-95">
          Explore Our Blends
        </button>
      </div>

      {/* Secondary Button */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Secondary (Accent) Button</p>
        <button className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-md transition-all hover:shadow-lg hover:scale-105 active:scale-95">
          Order Now
        </button>
      </div>

      {/* Outlined Button */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Outlined Button</p>
        <button className="w-full rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95">
          Learn More
        </button>
      </div>
    </div>
  )
}

function SampleCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-lg transition-all hover:shadow-xl">
      <div className="mb-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
        Premium Blend
      </div>
      <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">Seoul Sunrise</h3>
      <p className="mb-6 text-foreground/80 leading-relaxed">
        A delicate balance of bright Ethiopian notes with the smooth finish of Korean
        roasting traditions. Perfect for morning contemplation.
      </p>
      <div className="flex items-center justify-between">
        <span className="font-serif text-3xl font-bold text-accent">$16.00</span>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-background p-8 md:p-12">
      {/* Header */}
      <div className="mb-16 space-y-4">
        <h1 className="font-serif text-6xl font-bold text-foreground">Kore Coffee</h1>
        <p className="text-xl text-foreground/70">Design System Foundation</p>
        <p className="max-w-2xl text-base text-muted-foreground">
          Premium minimal luxury aesthetic. Seoul meets Manhattan in every carefully considered
          detail. Built on Playfair Display and Inter typography with a curated color palette of
          navy, burnt orange, and cream.
        </p>
      </div>

      {/* CSS Custom Properties */}
      <div className="mb-16 space-y-4">
        <h2 className="font-serif text-4xl font-bold text-foreground">CSS Custom Properties</h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <pre className="overflow-x-auto font-mono text-sm text-foreground">
            <code>{`/* Color System */
--color-brand-navy: #0a1628;
--color-brand-orange: #e8622a;
--color-brand-cream: #faf7f2;

/* Semantic Colors */
--background: #faf7f2;
--foreground: #0a1628;
--primary: #0a1628;
--primary-foreground: #faf7f2;
--accent: #e8622a;
--accent-foreground: #ffffff;
--card: #ffffff;
--border: #e0e0e0;
--muted: #e8e8e8;
--muted-foreground: #666666;

/* Typography */
--font-serif: 'Playfair Display';
--font-sans: 'Inter'`}</code>
          </pre>
        </div>
      </div>

      {/* Color Swatches */}
      <section className="mb-16 space-y-8">
        <div>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-2">Color Palette</h2>
          <p className="text-muted-foreground mb-8">
            Click hex codes to copy. Exactly 5 colors for premium cohesion.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(KORE_COLORS).map(([key, color]) => (
            <ColorSwatch
              key={key}
              hex={color.hex}
              name={color.name}
              description={color.description}
            />
          ))}
        </div>
      </section>

      {/* Typography Scale */}
      <section className="mb-16 space-y-8">
        <div>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-2">
            Typography Scale
          </h2>
          <p className="text-muted-foreground mb-8">
            Two complementary font families: Playfair Display for displays, Inter for body.
          </p>
        </div>
        <div className="space-y-10">
          {TYPOGRAPHY.map((item) => (
            <div key={item.level} className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-semibold text-accent">{item.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{item.className}</span>
              </div>
              <p className={`text-foreground ${item.className}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="mb-16 space-y-8">
        <div>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-2">
            Component Examples
          </h2>
          <p className="text-muted-foreground mb-8">
            Reusable elements built with the design system.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Buttons */}
          <SampleButton />

          {/* Card */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-2xl font-semibold text-foreground">Card Component</h3>
            <SampleCard />
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="space-y-8 rounded-2xl border border-border bg-card p-12">
        <div>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-2">Design Principles</h2>
          <p className="text-muted-foreground mb-8">
            Everything in Kore&apos;s visual system follows these core values.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-foreground">Premium Minimal</h3>
            <p className="text-foreground/70 leading-relaxed">
              Restrained color palette, generous whitespace, deliberate typography. Less is
              intentionally more.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-foreground">Cultural Fusion</h3>
            <p className="text-foreground/70 leading-relaxed">
              Seoul sophistication meets Manhattan edge. Navy and cream evoke traditional
              ceramics; burnt orange brings urban energy.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-foreground">Accessible Elegance</h3>
            <p className="text-foreground/70 leading-relaxed">
              High contrast ratios, semantic typography hierarchy, and interactive feedback ensure
              beauty and usability coexist.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-foreground">Craftsmanship Details</h3>
            <p className="text-foreground/70 leading-relaxed">
              Subtle shadows, rounded corners, and thoughtful spacing create a tactile, premium
              experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
