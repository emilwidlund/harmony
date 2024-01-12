import { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Harmony - A different kind of color picker',
  description: 'A color harmony picker for React',
}

export default function Page() {
  return <ClientPage /> 
}