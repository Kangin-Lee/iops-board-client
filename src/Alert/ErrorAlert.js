import Swal from 'sweetalert2'

  export const showFailAlert = (message) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  };