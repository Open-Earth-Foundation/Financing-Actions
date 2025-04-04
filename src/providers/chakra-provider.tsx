import { ChakraProvider as BaseChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'

interface ChakraProviderProps {
  children: React.ReactNode
}

export function ChakraProvider({ children }: ChakraProviderProps) {
  return (
    <BaseChakraProvider value={theme}>
      {children}
    </BaseChakraProvider>
  )
}