import { ModeToggle } from './components/ModeToggle'
import DashboardPage from './pages/DashboardPage'

function App () {
  return (
    <>
      <ModeToggle />
      <div className='max-w-screen-xl mx-auto'>
        <DashboardPage />
      </div>
    </>
  )
}

export default App
