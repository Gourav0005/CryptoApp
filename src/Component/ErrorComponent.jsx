import React from 'react'
import  Swal from 'sweetalert2'

const ErrorComponent = () => {
  return (
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  )
}

export default ErrorComponent