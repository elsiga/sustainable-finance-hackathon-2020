import React, { useEffect } from 'react'

const AdSense = ({
  client,
  slot,
  style = { display: 'block' },
  className = '',
  layout = '',
  layoutKey = '',
  format = 'auto',
  responsive = 'true',
}) => {
  useEffect(() => {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({})
  })

  return (
    <ins
      className={`${className} adsbygoogle`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  )
}

export default AdSense
