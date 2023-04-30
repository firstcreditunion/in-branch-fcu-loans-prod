import React from 'react'

export function nfd_NormaliseString(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
