import React from 'react'
import axios from 'axios'
const access_key="6d0e711d72d74daeb2b0bfd2a5cdfdba";
const geolocation_API= axios.create({
  baseURL:"https://opencagedata.com/api",
 
});
console.log(geolocation_API)
export default function Location(longitude: number, latitude: number) {
  return (
    `geocode/v1/json?key=${access_key}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`
  )
}
