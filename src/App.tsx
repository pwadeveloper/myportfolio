import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ProjectPage from './components/ProjectPage'
import PrintivoPage from './components/PrintivoPage'
import HandCursor from './components/HandCursor'
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

  const project = PROJECTS.find((p) => p.slug === route)
  const page =
    route === 'printivo' ? (
      <PrintivoPage />
    ) : project ? (
      <ProjectPage project={project} />
    ) : (
      <Hero />
    )

  // HandCursor lives outside the routed page so hand control is available
  // everywhere and keeps running across navigations.
  return (
    <>
      {page}
      <HandCursor />
    </>
  )
}

export default App
