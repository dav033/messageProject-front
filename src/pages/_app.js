import '../styles/globals.scss'

import Dashboard from '../components/dashboard/dashboard'
import SocketProvider from '../context/socketReceiver/socketProvider'
function MyApp ({ Component, pageProps }) {
  return (
    <SocketProvider>
      <div className="cont">
        <Dashboard />
        <Component {...pageProps} />
      </div>
    </SocketProvider>
  )
}

export default MyApp
