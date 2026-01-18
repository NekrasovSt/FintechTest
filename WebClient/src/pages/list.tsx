import {type FC, useEffect} from 'react';
import {DataGrid, type GridColDef} from '@mui/x-data-grid';
import {Box, Typography, Container, Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchCodes} from '../features/codes-api.ts';
import WithLoading from '../components/with-loading.tsx';
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const columns: GridColDef[] = [
    {field: 'code', headerName: 'Код', flex: 3},
    {field: 'value', headerName: 'Значение', flex: 5},
];

const List: FC = () => {
    const dispatch = useAppDispatch();
    const {codes, isLoading, isLoaded} = useAppSelector(state => state.codes);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(fetchCodes());
        }
    }, [dispatch]);

    const paginationModel = {page: 0, pageSize: 5};
    return (
        <Container maxWidth="lg" style={{padding: '20px'}}>
            <Box>
                <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Список кодов
                    </Typography>
                    <Button component={Link}
                            color="info"
                            to="/home"><HomeIcon/></Button>
                </Box>
                <WithLoading loading={isLoading}>
                    <Box style={{height: 600, width: '100%'}}>
                        <DataGrid
                            rows={codes}
                            columns={columns}
                            initialState={{pagination: {paginationModel}}}
                            pageSizeOptions={[5, 10]}
                            sx={{border: 0}}
                        />
                    </Box>
                </WithLoading>
            </Box>
        </Container>
    );
};

export default List;