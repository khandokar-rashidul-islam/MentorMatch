import React from 'react'

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="text-sm">
    {items.map((item, i) => (
      <span key={i}>
        {item.href ? <a href={item.href}>{item.label}</a> : item.label}
        {i < items.length - 1 && " / "}
      </span>
    ))}
  </nav>
  )
}

export default Breadcrumbs