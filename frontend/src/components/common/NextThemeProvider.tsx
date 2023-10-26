'use client'

import GlobalStyle from '@styles/globalstyle'
import theme from '@styles/theme'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
  let mobile = false

  useEffect(() => {
    function isIos() {
      if (typeof window !== 'undefined') {
        var user = window.navigator.userAgent
        return (
          user.indexOf('iPhone') > -1 ||
          // user.indexOf('Android') > -1 ||
          user.indexOf('iPad') > -1 ||
          user.indexOf('iPod') > -1
        )
      }
      return false
    }
    // 사파리에서 가로모드 설정
    function handleOrientationChange() {
      if (window.orientation === 0 || window.orientation === -180) {
        // 가로 모드에 대한 처리
        mobile = isIos()
        // mobile = true
      }
    }
    window.addEventListener('orientationchange', handleOrientationChange)
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isMobile={false} />
      {mobile && (
        <div
          style={{
            zIndex: '100',
            width: '100%',
            height: '100%',
          }}
        >
          저희 서비스는 가로모드에 최적화되어있습니다
        </div>
      )}
      {children}
    </ThemeProvider>
  )
}

export default NextThemeProvider
