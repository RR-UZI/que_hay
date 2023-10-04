import React, { useState,useEffect,createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating  }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Restaurantes, Hoteles & Atracciones a tu alrededor</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Tipo</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurante</MenuItem>
                    <MenuItem value="hotels">Hoteles</MenuItem>
                    <MenuItem value="attractions">Atracciones</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="rating">Rating</InputLabel>
                <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="3">Arriba de 3.0 estrellas</MenuItem>
                    <MenuItem value={4}>Arriba de 4.0 estrellas</MenuItem>
                    <MenuItem value={4.5}>Arriba de 4.5 estrellas</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails 
                            place={place}
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]} 
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}

        </div>
    );
}

export default List;