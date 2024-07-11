import React, { useState, useRef, useCallback, useEffect }  from 'react'
import { TextField, Typography, createTheme, ThemeProvider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API } from './API';

export function Games() {
  const [games, setGames] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    const url = "https://api.twitch.tv/helix/games/top";

    API(url).then(json => {
      let dataArray = json.data;
      dataArray.map(game => {
        let imageUrl = game.box_art_url.replace("{width}", "285").replace("{height}", "380");
        game.box_art_url = imageUrl;
        return game;
      });
      setGames(dataArray);
    });
  }, []);

  const handleSearch = useCallback(async () => {
    const search = searchRef.current.value;
    if(!search) return;

    const url = "https://api.twitch.tv/helix/search/categories?query="+search;

    API(url).then(json => {
      let dataArray = json.data;
      dataArray.map(game => {
        let imageUrl = game.box_art_url.replace("-52x72", "-285x380");
        game.box_art_url = imageUrl;
        return game;
      });
      setGames(dataArray);
    });
  }, [])

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Ubuntu',
        'sans-serif'
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="search">
        <div className="search-container">
          <div className="neon">
            GAMES
          </div>
          <div className="flux">
            SEARCH
          </div>
          <TextField
            id="standard-basic"
            type="search"
            color="warning"
            inputRef={searchRef}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      <div className="games">
        <ul className="games-container">
          {games.map(game => (
          <li key={game.id}>
            <div className="content">
              <div className="content-image" >
                <img src={game.box_art_url} alt="Caratula"/>
              </div>
              <div className="content-title">
                <Typography variant="h5">
                  {game.name}
                </Typography>
              </div>
            </div>
          </li>))}
        </ul>
        <div className="created">Creado con <FavoriteIcon/> por <a href="https://www.linkedin.com/in/kevin-mu%C3%B1oz-rengifo-4178501b0/">Kevin Muñoz Rengifo</a></div>
      </div>
    </ThemeProvider>
  )
}
