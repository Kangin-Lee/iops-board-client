import Swal from 'sweetalert2'

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-04
 * 용도 : 게시판 내의 모든 실패 Alert 컴포넌트
 * </pre>
 */

  export const showFailAlert = (message) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  };