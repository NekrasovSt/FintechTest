import React from 'react';
import {Box, CircularProgress} from '@mui/material';

interface WithLoadingProps {
    loading: boolean;
    children: React.ReactNode;
}

const WithLoading: React.FC<WithLoadingProps> = ({loading, children}) => {
    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4}}>
                <CircularProgress/>
            </Box>
        );
    }

    return <>{children}</>;
};

export default WithLoading;