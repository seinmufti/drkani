import { About } from './components/About'
import { AboutMe } from './components/AboutMe'
import { Certificates } from './components/Certificates'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Results } from './components/Results'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <AboutMe />
        <Results />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
