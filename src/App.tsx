import MainLayout from './views/layouts/MainLayout'
import NavBar from './views/components/NavBar'
import HeroSection from './views/components/HeroSection'
import SocialStrip from './views/components/SocialStrip'
import AppPreview from './views/components/AppPreview'
import FeaturesGrid from './views/components/FeaturesGrid'
import HowItWorks from './views/components/HowItWorks'
import LeadCapture from './views/components/LeadCapture'
import Footer from './views/components/Footer'

export default function App() {
  return (
    <MainLayout>
      <NavBar />
      <main>
        <HeroSection />
        <SocialStrip />
        <AppPreview />
        <FeaturesGrid />
        <HowItWorks />
        <LeadCapture />
      </main>
      <Footer />
    </MainLayout>
  )
}
