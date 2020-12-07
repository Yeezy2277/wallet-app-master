import React from 'react'

function useLoading() {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)

  return { loading, setLoading, error, setError }
}

export { useLoading }
