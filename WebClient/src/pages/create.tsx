import {type FC, useCallback} from 'react';
import WithLoading from "../components/with-loading.tsx";
import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
    IconButton, Tooltip
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import {Delete as DeleteIcon} from '@mui/icons-material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SaveIcon from '@mui/icons-material/Save';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {
    addCode,
    clearCodes,
    deleteCode,
    generateRandomCodes,
    updateCode,
    updateValue
} from "../features/codes-slice.ts";
import {saveCodes} from "../features/codes-api.ts";
import {useNavigate} from 'react-router-dom';

const Create: FC = () => {
    const {newCodes, newCode, isLoading} = useAppSelector(state => state.codes);
    const canAdd = useAppSelector(state => !!state.codes.newCode.value);
    const canSubmit = useAppSelector(state => state.codes.newCodes.length > 0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCode(+e.target.value));
    }, [dispatch]);

    const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateValue(e.target.value));
    }, [dispatch]);

    const handleAdd = useCallback(() => {
        dispatch(addCode());
    }, [dispatch]);

    const handleDelete = useCallback((index: number) => {
        dispatch(deleteCode(index));
    }, [dispatch]);

    const handleGenerate = useCallback(() => {
        dispatch(generateRandomCodes());
    }, [dispatch]);

    const handleClear = useCallback(() => {
        dispatch(clearCodes());
    }, [dispatch]);

    const handleSubmit = useCallback(async () => {
        dispatch(saveCodes(() => navigate('/list')));
    }, [dispatch]);


    return (
        <Container maxWidth="lg" style={{padding: '20px'}}>

            <WithLoading loading={isLoading}>
                <Box sx={{flex: 1, overflow: 'none'}}>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" component="h1" gutterBottom>
                            Создание кодов
                        </Typography>
                        <Button component={Link}
                                color="info"
                                to="/home"><HomeIcon/></Button>
                    </Box>

                    <Paper style={{padding: '20px', marginBottom: '20px'}}>
                        <Box display="flex" gap={2} mb={2}>
                            <TextField
                                type="number"
                                label="Код"
                                value={newCode.code}
                                onChange={handleCodeChange}
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Значение"
                                value={newCode.value}
                                onChange={handleValueChange}
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                            <Tooltip title="Добавить">
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleAdd}
                                    disabled={!canAdd}
                                >
                                    <AddIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Рандом">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleGenerate}
                                >
                                    <AllInclusiveIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Очистить">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleClear}
                                >
                                    <DeleteIcon/>
                                </Button>
                            </Tooltip>
                        </Box>
                        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="textSecondary">
                                Нажмите "Добавить", чтобы добавить пару код/значение в список
                            </Typography>
                            <Tooltip title="Сохранить">
                                <Button
                                    variant="contained"
                                    color="success"
                                    disabled={!canSubmit}
                                    onClick={handleSubmit}
                                >
                                    <SaveIcon/>
                                </Button>
                            </Tooltip>
                        </Box>
                    </Paper>

                    {newCodes.length > 0 && <Paper style={{marginBottom: '20px', overflow: 'auto', height: '75vh'}}>
                        <List>
                            {newCodes.map((item, index) => (
                                <ListItem key={index} divider secondaryAction={
                                    <IconButton edge="end" aria-label="delete" color="error"
                                                onClick={() => handleDelete(index)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }>
                                    <ListItemText
                                        primary={`Код: ${item.code}`}
                                        secondary={`Значение: ${item.value}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>}
                </Box>
            </WithLoading>
        </Container>
    );
};

export default Create;