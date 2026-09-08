import { About } from './components/About'
import { Certificates } from './components/Certificates'
import { Contact } from './components/Contact'
import { Navbar } from './components/Navbar'
import { Results } from './components/Results'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <Results />
        <Certificates />
        <Contact />
      </main>
    </>
  )
}

export default App
