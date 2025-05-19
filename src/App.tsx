import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { theme } from './css/theme'
import AppRoutes from './routes'
import GlobalStyle from './css/GlobalStyle'
import { AppProvider } from './context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppRoutes />
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
