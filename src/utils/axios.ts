import base from 'axios'

export const axios = base.create({
  headers: {'Content-Type': 'application/json'}
})
