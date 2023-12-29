import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Roam Around',
  description: 'Generate your Itinerary',
}

export default function RootLayout({ children }) {
  return (
<html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="wrapper">
          {children}
        </div>
        <footer className="footer">
          <p>Made with ❤️ by <a href="">Sumit & Prabal</a></p>
        </footer>
      </body>
    </html>
  )
}
