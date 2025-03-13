import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { theme } from './css/theme'
import Router from './Router'
import GlobalStyle from './css/GlobalStyle'

const queryClient = new QueryClient()

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
