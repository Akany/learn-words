import {post} from './fetch'

export function store(word) {
  return post('api/word', {body: word})
}