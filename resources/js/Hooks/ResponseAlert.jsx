import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Sweet = withReactContent(Swal);
const ResponseAlert = () => {
    const showResponse = useCallback((type, title, message) => {
        Sweet.fire({
            position: "center",
            icon: type,
            title: title,
            text: message,
            showConfirmButton: false,
            timer: 1500,
        });
    });
    const ResponseMethode = (
        type,
        title,
        message,
        confirm,
        cancell,
        confirmTitle = "Submit"
    ) => {
        Swal.fire({
            icon: type,
            title: title,
            text: message,
            showCancelButton: true,
            confirmButtonColor: "#14B8A6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmTitle,
        }).then((result) => {
            if (result.isConfirmed) {
                confirm();
            } else {
                cancell();
            }
        });
    };
    return {
        showResponse,
        ResponseMethode,
    };
};

export default ResponseAlert;
