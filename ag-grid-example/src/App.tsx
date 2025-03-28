import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import CasesGrid from './components/CasesGrid'
import { getCases } from './services/caseService'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
});

function App() {
  const cases = getCases();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Case Management System
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <CasesGrid cases={cases} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
