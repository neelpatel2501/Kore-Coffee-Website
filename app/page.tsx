import Hero from '@/components/Hero'
import AssemblySection from '@/components/AssemblySection'
import SignatureDrinksSection from '@/components/SignatureDrinksSection'
import SignatureCrofflesSection from '@/components/SignatureCrofflesSection'
import MenuSection from '@/components/MenuSection'
import GallerySection from '@/components/GallerySection'
import VisitUsSection from '@/components/VisitUsSection'

export default function Page() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Hero />
      <AssemblySection />
      <SignatureDrinksSection />
      <SignatureCrofflesSection />
      <MenuSection />
      <GallerySection />
      <VisitUsSection />
    </main>
  )
}
