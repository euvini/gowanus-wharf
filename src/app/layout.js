import './globals.css'

export const metadata = {
  title: 'Gowanus Wharf',
  description: 'Description here',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
