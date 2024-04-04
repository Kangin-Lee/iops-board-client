import Swal from 'sweetalert2'

export const WriteSuccessAlert = () => Swal.fire({
    position: "center",
    icon: "success",
    title: "글이 정상적으로 등록되었습니다.",
    showConfirmButton: false,
    timer: 1500
  });

  export const showSuccessAlert = (message) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  };