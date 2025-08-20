import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Dialogs({
    open,
    handleClose,
    title,
    children,
    ...props
}) {
    const dialogRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target)) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    return (
        <Dialog
            {...props}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent ref={dialogRef}>
                <DialogContentText id="alert-dialog-slide-description">
                    {children}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
