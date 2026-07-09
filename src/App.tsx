import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ProjectPage from './components/ProjectPage'
import PrintivoPage from './components/PrintivoPage'
import { PROJECTS } from './data/projects'

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#/, ''))

  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash.replace(/^#/, ''))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

function App() {
  const route = useHashRoute()

  if (route === 'printivo') return <PrintivoPage />

  const project = PROJECTS.find((p) => p.slug === route)
  if (project) return <ProjectPage project={project} />
  return <Hero />
}

export default App
