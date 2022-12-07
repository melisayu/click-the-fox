import React, { FunctionComponent, ImgHTMLAttributes } from 'react'

interface Resource<Payload> {
  read: () => Payload
}

type status = 'pending' | 'success' | 'error'

function createResource<Payload> (
  asyncFn: () => Promise<Payload>
): Resource<Payload> {
  let status: status = 'pending'
  let result: any
  // Store the result.
  const promise = asyncFn().then(
    (r: Payload) => {
      status = 'success'
      result = r
    },
    (e: Error) => {
      status = 'error'
      result = e
    }
  )
  return {
    // Check status value.
    read (): Payload {
      switch (status) {
        // Throw a promise to let suspense know that the component is not ready.
        case 'pending':
          throw promise
        case 'error':
          throw result
        case 'success':
          return result
      }
    }
  }
}

const cache = new Map<string, any>()

function loadImage (source: string): Resource<string> {
  // Getting resource from the cache and return immediately
  let resource = cache.get(source)
  if (resource !== undefined) return resource

  // Create a new resource in case there is no cached resource yet.
  resource = createResource<string>(
    async () =>
      await new Promise((resolve, reject) => {
        const img = new window.Image()
        img.src = source
        img.onload = () => resolve(source)
        img.onerror = () => reject(new Error(`Failed to load image ${source}`))
      })
  )
  // Save the new resource in the cache and return it
  cache.set(source, resource)
  return resource
}

const PreloadedImage: FunctionComponent<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  if (props.src !== undefined && props.src !== '') {
    loadImage(props.src).read()
  }

  return (
    <img alt={props.alt} src={props.src} id={props.id} />
  )
}

export default PreloadedImage
