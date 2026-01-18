import React, {useCallback} from 'react';
import {Snackbar, Alert} from '@mui/material';
import {useAppSelector} from "../app/hooks.ts";
import {useDispatch} from "react-redux";
import {clearError} from "../features/codes-slice.ts";

const SnackbarError: React.FC = () => {
    const error = useAppSelector(state => state.codes.error);
    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return (
        <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: '100%'}}
            >
                Ошибка!
            </Alert>
        </Snackbar>
    );
};

export default SnackbarError;