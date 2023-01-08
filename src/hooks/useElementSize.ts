import { useState, useEffect, useCallback } from 'react'

export const useElementSize = () => {
  const [sizes, setSizes] = useState({ width: 0, height: 0 })
  const [node, setNode] = useState<HTMLElement | null>(null)
  const ref = useCallback((instance: HTMLElement | null) => {
    setNode(instance)
  }, [])

  useEffect(() => {
    if (!node) {
      return
    }

    const handleResize = () => {
      const { width, height } = node.getBoundingClientRect()
      
      setSizes({ width, height })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
    }, [node]);

    return { ref, sizes }
}
