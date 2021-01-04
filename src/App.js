import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, makeStyles, TextField } from '@material-ui/core'

export default function App() {
  const classes = useStyles()
  const [player, setPlayer] = useState(null)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [forroAudio, setForroAudio] = useState(null)
  const [sambaAudio, setSambaAudio] = useState(null)

  const stopAudio = () => {
    if (player) player.pause()
  }

  const playForroAudio = () => {
    stopAudio()

    player.src = forroAudio
    player.playbackRate = playbackRate
    player.play()
  }

  const playSambaAudio = () => {
    stopAudio()

    player.src = sambaAudio
    player.playbackRate = playbackRate
    player.play()
  }

  const incPlaybackRate = () => {
    setPlaybackRate(Math.min(playbackRate + 0.01, 2))
  }

  const decPlaybackRate = () => {
    setPlaybackRate(Math.max(playbackRate - 0.01, 0.1))
  }

  useEffect(() => {
    setPlayer(new Audio())

    fetch('/audios/forro.mp3')
      .then(response => response.blob())
      .then(blob => setForroAudio(URL.createObjectURL(blob)))

    fetch('/audios/samba.mp3')
      .then(response => response.blob())
      .then(blob => setSambaAudio(URL.createObjectURL(blob)))

    return function cleanup() {
      if (player) player.pause()
      setPlayer(null)
      setForroAudio(null)
      setSambaAudio(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box minHeight="100vh" maxWidth="720px" margin="auto" padding={5}>
      <h1 className={classes.title}>Kabula Beats</h1>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box className={classes.playButtonContainer}>
            <Button variant="contained" className="forro" onClick={() => playForroAudio()}>
              Forró
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.playButtonContainer}>
            <Button variant="contained" className="samba" onClick={() => playSambaAudio()}>
              Samba
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" className={classes.speedButton} onClick={() => decPlaybackRate()}>-</Button>
        <span className={classes.playbackRate}>
          {Number(playbackRate).toFixed(2)}
        </span>
        <Button variant="contained" className={classes.speedButton} onClick={() => incPlaybackRate()}>+</Button>
      </Box>

      <Box textAlign="center" mt={3}>
        <Button variant="contained" className={classes.stopButton} onClick={() => stopAudio()}>Parar</Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  title: {
    fontSize: 48,
    margin: 0,
    marginBottom: 24,
    textAlign: 'center'
  },
  playButtonContainer: {
    position: 'relative',
    paddingBottom: '100%',
    '& .MuiButton-root': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      fontSize: 48,
      '&.forro': {
        backgroundColor: 'blue',
        color: 'white',
      },
      '&.samba': {
        backgroundColor: 'green',
        color: 'white',
      }
    }
  },
  playbackRate: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 48,
    width: 200,
    height: 96,
  },
  speedButton: {
    fontSize: 48,
  },
  stopButton: {
    fontSize: 48,
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'red',
    }
  }
})