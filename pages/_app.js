import { useEffect } from "react";
import "@/styles/globals.css";
import { AuthenticationProvider } from "@/context/AuthenticationContext";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if(jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  })
  return (
    // This is for to access all the pages that authenticated
    <AuthenticationProvider> 
      <Component {...pageProps} />
    </AuthenticationProvider>  
  )
}
