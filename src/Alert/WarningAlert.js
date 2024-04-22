import Swal from "sweetalert2";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-22
 * 용도 : 경고, 주의 Alert
 * </pre>
 */

export const showWarningAlert = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
