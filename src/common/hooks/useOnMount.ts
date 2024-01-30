import { useEffect } from 'react'

export const useOnMount = (callback: Parameters<typeof useEffect>[0]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, [])
}
