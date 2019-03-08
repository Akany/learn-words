import {post} from '@/services/fetch';

export function login(credentials) {
  return post('/api/auth', {
    body: credentials
  })
}

export function restoreSession(credentials) {
  return post('/api/auth/restore', {body: credentials})
}