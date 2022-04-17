import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";

export const withSnackbar = WrappedComponent => {
    return props => {

        const [open, setOpen] = useState(false);
        const [message, setMessage] = useState("");
        const [duration, setDuration] = useState(2000);
        const [severity, setSeverity] = useState("success");

        const showMessage = (message, severity = "success", duration = 2000) => {
            setMessage(message);
            setSeverity(severity);
            setDuration(duration);
            setOpen(true);

            //error, warning, info, success
        };

        const handleClose = (event, reason) => {
            if (reason === "clickaway") {
                return;
            }
            setOpen(false);
        };

        return (
            <>
                <WrappedComponent {...props} snackbarShowMessage={showMessage} />
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    autoHideDuration={duration}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Slide}
                >
                    <Alert variant="filled" onClose={handleClose} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </>
        );
    };
};
